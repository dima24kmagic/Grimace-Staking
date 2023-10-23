import { useState } from "react";
import { toast } from "react-toastify";
import { useMetaMask } from "metamask-react";
import { useWeb3Context } from "@/app/hooks/useWeb3";
import useBidsHistory, { IBid } from "@/app/hooks/useAuction/useBidsHistory";
import { useProgressLoader } from "@/components/ProgressLoader/ProgressLoader";
import { formatBidAmountToDecimals } from "@/components/NFTDetails/NFTDetails";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForTransactionReceipt({ web3, transactionHash }) {
  while (true) {
    try {
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);
      if (receipt !== null) {
        // You can perform additional actions here after the transaction is mined
        break;
      }
      await wait(300); // Poll every 300 ms
    } catch (error) {
      console.error("Error waiting for transaction:", error);
      break;
    }
  }
}

const getApprovedAmount = async ({
  tokenContract,
  account,
  nftContractAddress,
}) => {
  const approvedAmount = await tokenContract.methods
    .allowance(account, nftContractAddress)
    .call();
  return { approvedAmount: BigInt(approvedAmount) };
};

// every second get approved amount
const waitForNewAllowanceUpdate = ({
  previousAllowance,
  tokenContract,
  account,
  nftContractAddress,
}) => {
  return new Promise(async (res, rej) => {
    const checkInterval = 1000;
    while (true) {
      try {
        const approvedAmount = await getApprovedAmount({
          tokenContract,
          account,
          nftContractAddress,
        });
        if (approvedAmount.toString() !== previousAllowance.toString()) {
          res(approvedAmount);
          break;
        }
        await wait(checkInterval);
      } catch (e) {
        rej(e);
        break;
      }
    }
  });
};

export const getAuctionDetails = async ({ nftContract, nftID }) => {
  const auctionDetails = await nftContract?.methods
    ?.getAuctionDetails(nftID - 1)
    ?.call();

  const {
    0: blockchainNftID,
    1: initialPrice,
    2: bidStep,
    3: endTime,
    4: highestBidder,
    5: highestBid,
  } = auctionDetails;

  return {
    blockchainNftID,
    initialPrice,
    bidStep,
    timeLeftForAuction: new Date(Number(endTime) * 1000),
    endTime,
    highestBidder,
    highestBid,
  };
};

const useAuctionPlaceBid = ({ nftID }: { nftID: number }) => {
  const { account } = useMetaMask();
  const { nftContract, tokenContract, nftContractAddress, web3 } =
    useWeb3Context();
  const { handleWaitTransaction } = useProgressLoader();

  const {
    isLoading: isBidsLoading,
    pushBid,
    bidsHistory,
  } = useBidsHistory(nftID - 1);

  const [isPendingBid, setIsPendingBid] = useState(false);

  const placeBid = async (auctionDetails, setAuctionDetails) => {
    try {
      setIsPendingBid(true);
      handleWaitTransaction({
        transaction: {
          preAcceptMessage: "Checking blockchain for most recent bids",
        },
        isProcessing: true,
      });

      const currentAuctionDetails = await getAuctionDetails({
        nftContract,
        nftID,
      });

      if (
        BigInt(currentAuctionDetails.highestBid) !==
        BigInt(auctionDetails.highestBid)
      ) {
        toast.error("Current bid has been changed");
        throw new Error("Current bid has been changed");
      }

      // Convert bidStep to actual value using decimalsMultiplier
      const decimals = await tokenContract.methods.decimals().call();
      const decimalsMultiplier = BigInt(10) ** BigInt(decimals);

      // Check if the user has approved the contract to spend tokens on their behalf
      handleWaitTransaction({
        transaction: {
          preAcceptMessage:
            "Checking if we allowed to use your GRIMACE token with our contract",
        },
        isProcessing: true,
      });
      const { approvedAmount } = await getApprovedAmount({
        tokenContract,
        account,
        nftContractAddress,
      });

      // Check user balance to not place bid if there's not enough tokens
      const bidAmount =
        BigInt(currentAuctionDetails.highestBid) === BigInt(0)
          ? BigInt(auctionDetails.initialPrice)
          : BigInt(currentAuctionDetails.highestBid) +
            BigInt(currentAuctionDetails.bidStep);
      const balance = await tokenContract.methods.balanceOf(account).call();
      if (balance < bidAmount) {
        toast.error(`You don't have enough GRIMACE to place bid`);
        throw new Error(``);
      }

      if (approvedAmount < bidAmount) {
        handleWaitTransaction({
          transaction: {
            preAcceptMessage: `Please approve spending of at least ${formatBidAmountToDecimals(
              bidAmount
            )} GRIMACE tokens to place bid`,
          },
          isProcessing: true,
        });

        const gasEstimate = await tokenContract.methods
          .approve(
            nftContractAddress,
            (bidAmount / decimalsMultiplier).toString()
          )
          .estimateGas({ from: account });
        const gasLimit = Number(gasEstimate) * 2; // You can adjust this multiplier as needed
        const transaction = await tokenContract.methods
          .approve(
            nftContractAddress,
            (bidAmount / decimalsMultiplier).toString()
          )
          .send({ from: account, gas: gasLimit });

        handleWaitTransaction({
          transaction: {
            preAcceptMessage: ``,
            hash: transaction.transactionHash,
            message: `Approving spending of ${formatBidAmountToDecimals(
              bidAmount
            )} GRIMACE to place bid`,
          },
          isProcessing: true,
        });
        await waitForTransactionReceipt({
          transactionHash: transaction.transactionHash,
          web3,
        });

        const newApprovedAmount = await waitForNewAllowanceUpdate({
          tokenContract,
          account,
          nftContractAddress,
          previousAllowance: approvedAmount,
        });

        if (newApprovedAmount < bidAmount) {
          toast.error(
            `You need to approve to spend minimum ${
              bidAmount / decimalsMultiplier
            } tokens`
          );
          throw new Error(
            `You need to approve to spend minimum ${
              bidAmount / decimalsMultiplier
            } tokens`
          );
        }
      }

      // Call placeBid function on the smart contract
      const nftIdResponse = await nftContract.methods
        .getNFTBySequentialId(nftID - 1)
        .call();

      handleWaitTransaction({
        transaction: {
          preAcceptMessage: `Please approve placing a bid of ${formatBidAmountToDecimals(
            bidAmount
          )} GRIMACE`,
        },
        isProcessing: true,
      });
      const response = await nftContract.methods
        .placeBid(nftIdResponse.toString(), bidAmount.toString())
        .send({ from: account });
      handleWaitTransaction({
        transaction: {
          hash: response.transactionHash,
          message: "Placing bid...",
        },
        isProcessing: true,
      });

      if (Number(response?.status) === 1) {
        // Update the bids history with the new bid
        pushBid({
          amount: bidAmount.toString(),
          address: account,
          timestamp: Math.floor(new Date().getTime() / 1000),
          id: Math.random().toString(),
        } as IBid);
        setAuctionDetails({
          ...currentAuctionDetails,
          highestBid: bidAmount.toString(),
          highestBidder: account,
        });
        toast.success("Bid placed successfully");
        setIsPendingBid(false);
        handleWaitTransaction({
          transaction: {},
          isProcessing: false,
        });
      }
    } catch (error) {
      console.error("Failed to place bid:", error);
      if (error?.message?.toString() !== "") {
        toast.error(
          "Failed to place bid, please refresh page or wait" + error.toString()
        );
      }
      setIsPendingBid(false);
      handleWaitTransaction({
        transaction: {},
        isProcessing: false,
      });
    }
  };

  return {
    isPendingBid,
    placeBid,
    isBidsLoading,
    bidsHistory,
  };
};

export default useAuctionPlaceBid;
