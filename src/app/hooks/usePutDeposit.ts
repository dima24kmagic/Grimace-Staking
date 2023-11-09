import { useAppSelector, useAppDispatch } from '../../app/store/hooks'
import { clearDepositForm } from "@/app/store/depositFormState"
import { approveTokenSpending } from "@/app/utils/tokenSpendings"
import { useEthersContext } from "@/app/hooks/useEthers"
import { toast } from "react-toastify"

const usePutDeposit = () => {
  const accountAddress = useAppSelector(state => state.account.address)
  const { tokenContract, stackingContract, ethers } = useEthersContext()
  const dispatch = useAppDispatch()
  const depositForm = useAppSelector(state => state.depositForm)

  const handleDeposit = async () => {
    const amountBigInt = BigInt(ethers.parseEther(depositForm.amount!.toString()))
    
    const isApproved = await approveTokenSpending({
      tokenContract: tokenContract,
      spenderContract: stackingContract,
      account: accountAddress!,
      amount: amountBigInt,
    }).catch((err) => {
      toast.error(err.shortMessage ?? err.message)
    });
    if (isApproved) {
      await stackingContract!.deposit(depositForm.selectedPlanIndex, amountBigInt)

      dispatch(clearDepositForm())
    }
  };

  return { handleDeposit };
};

export default usePutDeposit
