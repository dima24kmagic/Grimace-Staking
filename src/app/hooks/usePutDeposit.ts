import { useWeb3Context } from "@/app/hooks/useWeb3";
import { useMetaMask } from "metamask-react";
import { toast } from "react-toastify";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const waitForNewAllowanceUpdate = ({
  previousAllowance,
  tokenContract,
  spenderContract,
  account,
}: {
  tokenContract: any;
  spenderContract: any;
  account: string;
  previousAllowance: bigint;
}): Promise<bigint> => {
  return new Promise(async (res, rej) => {
    const checkInterval = 1000;
    while (true) {
      try {
        const { approvedAmount } = await getApprovedAmount({
          tokenContract,
          account,
          spenderContract,
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

const getApprovedAmount = async ({
  tokenContract,
  spenderContract,
  account,
}: {
  tokenContract: any;
  spenderContract: any;
  account: string;
}) => {
  const approvedAmount = await tokenContract.methods
    .allowance(account, spenderContract)
    .call();
  return { approvedAmount: BigInt(approvedAmount) };
};

const approveTokenSpending = async ({
  tokenContract,
  spenderContract,
  amount,
  account,
}: {
  tokenContract: any;
  spenderContract: any;
  amount: bigint;
  account: string;
}) => {
  const balance = await tokenContract.methods.balanceOf(account).call();

  if (balance < amount) {
    throw new Error("Insufficient funds");
  }
  const { approvedAmount } = await getApprovedAmount({
    tokenContract,
    spenderContract,
    account,
  });

  // Already approved enough
  if (approvedAmount >= amount) {
    return true;
  }

  const gasEstimate = await tokenContract.methods
    .approve(spenderContract, amount.toString())
    .estimateGas({ from: account });
  const gasLimit = Number(gasEstimate) * 2; // You can adjust this multiplier as needed
  await tokenContract.methods
    .approve(spenderContract, amount.toString())
    .send({ from: account, gas: gasLimit });

  const newApprovedAmount = await waitForNewAllowanceUpdate({
    previousAllowance: approvedAmount,
    account,
    spenderContract,
    tokenContract,
  });

  if (newApprovedAmount < amount) {
    throw new Error("Approved funds are not enough😔");
  }

  return true;
};

const usePutDeposit = () => {
  const { account } = useMetaMask();
  const { stackingContract, tokenContract } = useWeb3Context();

  // TODO: set types for plans
  const handleDeposit = async (plan: any, amount: bigint) => {
    if (account) {
      const isApproved = await approveTokenSpending({
        tokenContract,
        spenderContract: stackingContract,
        account,
        amount,
      }).catch((err) => {
        toast.error(err);
      });
      if (isApproved) {
        // TODO: check if new deposit appeared
        await stackingContract?.methods
          .deposit(plan, amount)
          ?.call({ from: account });
      }
    }
  };

  return { handleDeposit };
};
