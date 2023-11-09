import { useEthersContext } from "./useEthers"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Deposit, setDeposits } from "../store/accountState"
import { approveTokenSpending } from "../utils/tokenSpendings"
import { toast } from "react-toastify"
import { clearDepositForm } from "../store/depositFormState"
import { getUserNegativeDividends } from '../utils/depositHelper'
import usePlans from "./usePlans"

const useDeposits = () => {
    const dispatch = useAppDispatch()
    const { stackingContract, ethers, tokenContract } = useEthersContext()
    const accountAddress = useAppSelector(state => state.account.address)
    const deposits = useAppSelector(state => state.account.deposits)
    const depositForm = useAppSelector(state => state.depositForm)

    const updateDeposits = async () => {
        if(!stackingContract || !depositForm.plans.length) return

        const depositsCount = await stackingContract.getUserAmountOfDeposits(accountAddress)

        const result = new Array<Deposit>
        for (let index = 0; index < depositsCount; index++) {
            const depInfo = await stackingContract.getUserDepositInfo(accountAddress, index)
            const start = new Date(parseInt(depInfo.start) * 1000)
            const finish = new Date(parseInt(depInfo.finish) * 1000)

            const deposit : Deposit = {
              planIndex: parseInt(depInfo.plan),
              days: depositForm.plans[parseInt(depInfo.plan)].days,
              amount: parseInt(ethers.formatEther(depInfo.amount)),
              start: start.toString(),
              finish: finish.toString(),
              isTaken: depInfo.isTaken,
              amountToWithdraw: 0
            } 
            deposit.amountToWithdraw = deposit.amount 
              - getUserNegativeDividends(deposit.amount, depositForm.plans[deposit.planIndex], finish, start)
            result.push(deposit)
        }

        dispatch(setDeposits(result))
    }

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

    return { deposits, updateDeposits, handleDeposit };
};

export default useDeposits
