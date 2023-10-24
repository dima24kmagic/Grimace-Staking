import { useWeb3Context } from "@/app/hooks/useWeb3";
import { useMetaMask } from "metamask-react";
import { toast } from "react-toastify";
import { approveTokenSpending } from "@/app/utils/tokenSpendings";

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
