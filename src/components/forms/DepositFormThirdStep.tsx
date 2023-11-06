import styled from "@emotion/styled"
import Subheading from "./Subheading"
import { useAppSelector, useAppDispatch } from '../../app/store/hooks'
import { clearDepositForm } from "@/app/store/depositFormState"
import { approveTokenSpending } from "@/app/utils/tokenSpendings"
import { useEthersContext } from "@/app/hooks/useEthers"
import { toast } from "react-toastify";

const RootStyled = styled.div`
  width: 100%;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid #E68C36;
`

const HeadingStyled = styled.h1`
  font-size: 4rem;
  font-weight: 300;

  & b {
    font-weight: 500;
  }
`

const ButtonStyled = styled.button`
  cursor: pointer;
  font: inherit;
  margin-top: 28px;
  font-size: 1.5rem;
  outline: none;
  border: none;
  border-radius: 15px;
  background: linear-gradient(270deg, #FFAA47 4.47%, #926015 100%);
  text-transform: uppercase;
  display: flex;
  place-items: center;
  padding: 12px 48px;
`

function DepositFormFirstStep({onNext} : {onNext: () => void}) {
  const dispatch = useAppDispatch()
  const depositForm = useAppSelector(state => state.depositForm)
  const accountAddress = useAppSelector(state => state.account.address)
  const { tokenContract, stackingContract, ethers } = useEthersContext()

  const handleDeposit = async () => {
    const amountBigInt = BigInt(ethers.parseEther(depositForm.amount!.toString()))
    
    const isApproved = await approveTokenSpending({
      tokenContract: tokenContract,
      spenderContract: stackingContract,
      account: accountAddress!,
      amount: amountBigInt,
    }).catch((err) => {
      toast.error(err)
    });
    if (isApproved) {
      // TODO: check if new deposit appeared
      await stackingContract!.deposit(depositForm.selectedPlanIndex, amountBigInt)

      dispatch(clearDepositForm())
      onNext()
    }
  }

  return (
    <RootStyled>
      <HeadingStyled>Step 3:</HeadingStyled>
      <Subheading>Confirmation</Subheading>
      <Subheading>{depositForm.amount}</Subheading>
      <Subheading>{depositForm.amountToWithdraw}</Subheading>
      <Subheading>{depositForm.selectedPlan?.days}</Subheading>
      <Subheading>{depositForm.unstakeDate}</Subheading>
      <ButtonStyled onClick={handleDeposit}>Stake</ButtonStyled>
    </RootStyled>
  )
}

export default DepositFormFirstStep
