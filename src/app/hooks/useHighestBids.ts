import { useEffect, useState } from "react";
import { useWeb3Context } from "./useWeb3";

const useHighestBids = ({ nftsValues }: { nftsValues: any[] }) => {
  const { nftContract, tokenContract } = useWeb3Context();
  const [newNfts, setNewNfts] = useState(nftsValues);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHighestBids = async () => {
      const decimals = await tokenContract.methods
        .decimals()
        .call()
        .catch((err) => console.log("ERROR", err)) ?? 18;
      const decimalsMultiplier = BigInt(10) ** BigInt(decimals);
      try {
        const nftsWithHighestBid = await Promise.all(
          nftsValues.map(async (nft) => {
            try {
              const details = await getAuctionDetails({
                nftContract,
                nftID: nft.id,
              });
              return {
                ...nft,
                highestBid: Number(details.highestBid / decimalsMultiplier),
                endTime: details.endTime,
                initialPrice: Number(details.initialPrice / decimalsMultiplier),
              };
            } catch (e) {
              console.error(e);
              return {
                ...nft,
                highestBid: null,
              };
            }
          })
        );
        setNewNfts(nftsWithHighestBid);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (nftContract && nftsValues && nftsValues.length > 0) {
      getHighestBids();
    }
  }, [nftContract]);

  return { newNfts, isLoading };
};

const getAuctionDetails = async ({ nftContract, nftID }) => {
  const auctionDetails = await nftContract.methods
    .getAuctionDetails(nftID - 1)
    .call();
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

export default useHighestBids;
