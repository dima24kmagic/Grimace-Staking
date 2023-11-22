import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { Deposit } from "../store/accountState"
import { setDeposits } from "../store/accountState"
import { approveTokenSpending } from "../utils/tokenSpendings"
import { clearDepositForm } from "../store/depositFormState"
import { getUserNegativeDividends } from "../utils/depositHelper"
import { useEthersContext } from "./useEthers"
import formatUnstakeDate from "@/utils/formatUnstakeDate"

const useDeposits = () => {
  const dispatch = useAppDispatch()
  const { stackingContract, ethers, tokenContract } = useEthersContext()
  const accountAddress = useAppSelector(state => state.account.address)
  const deposits = useAppSelector(state => state.account.deposits)
  const depositForm = useAppSelector(state => state.depositForm)

  const updateDeposits = async (address?: string | null) => {
    address = address ?? accountAddress
    const response = await fetch("/api/dashboard?address=" + address)
    const result = await response.json()    
    dispatch(setDeposits(result))
  }

  const handleDeposit = async () => {
    dispatch(clearDepositForm())
    const amountBigInt = BigInt(ethers.parseEther(depositForm.amount!.toString()))

    const isApproved = await approveTokenSpending({
      tokenContract,
      spenderContract: stackingContract,
      account: accountAddress!,
      amount: amountBigInt,
    }).catch((err) => {
      toast.error(err.shortMessage ?? err.message)
    })
    if (isApproved) {
      await stackingContract!.deposit(depositForm.selectedPlanIndex, amountBigInt)
    }
  }

  const handleWithdraw = async (depositId: number) => {
    await stackingContract!.withdraw(depositId)
  }

  return { deposits, updateDeposits, handleDeposit, handleWithdraw }
}

export default useDeposits
