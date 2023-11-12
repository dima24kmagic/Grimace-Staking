import styled from "@emotion/styled"
import Subheading from "./Subheading"
import { useAppSelector } from "@/app/store/hooks"
import useDeposits from "@/app/hooks/useDeposits"

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

function DepositFormThirdStep(_: { onNext: () => void }) {
  const depositForm = useAppSelector(state => state.depositForm)
  const { handleDeposit } = useDeposits()

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

export default DepositFormThirdStep
