import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDeposits, setDepositsLoaded } from "../store/accountState";
import { approveTokenSpending } from "../utils/tokenSpendings";
import { clearDepositForm, setStep } from "../store/depositFormState";
import { useEthersContext } from "./useEthers";
import useBalance from "./useBalance";

const useDeposits = () => {
  const dispatch = useAppDispatch();
  const { updateBalance } = useBalance();
  const { stackingContract, ethers, tokenContract } = useEthersContext();
  const accountAddress = useAppSelector((state) => state.account.address);
  const deposits = useAppSelector((state) => state.account.deposits);
  const depositsLoaded = useAppSelector(
    (state) => state.account.depositsLoaded
  );
  const depositForm = useAppSelector((state) => state.depositForm);

  const updateDeposits = async (address?: string | null) => {
    dispatch(setDepositsLoaded(false));
    address = address ?? accountAddress;
    const response = await fetch(`/api/dashboard?address=${address}`);
    const result = await response.json();
    dispatch(setDeposits(result));
    dispatch(setDepositsLoaded(true));
  };

  const handleDeposit = async () => {
    const amountBigInt = BigInt(
      ethers.parseEther(depositForm.amount!.toString())
    );

    try {
      const isApproved = await approveTokenSpending({
        tokenContract,
        spenderContract: stackingContract,
        account: accountAddress!,
        amount: amountBigInt,
      }).catch((err) => {
        toast.error(err.shortMessage ?? err.message);
      });
      if (isApproved) {
        await stackingContract!.deposit(
          depositForm.selectedPlanIndex,
          amountBigInt
        );
        await updateBalance();
      }

      dispatch(clearDepositForm());
    } catch (e) {
      dispatch(setStep(3));
    }
  };

  const handleWithdraw = async (depositId: number) => {
    dispatch(setDeposits([]));
    await stackingContract!.withdraw(depositId);
  };

  return {
    deposits,
    depositsLoaded,
    updateDeposits,
    handleDeposit,
    handleWithdraw,
  };
};

export default useDeposits;
