import styled from "@emotion/styled"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/store/hooks"
import Balance from "../Balance"
import Subheading from "./Subheading"
import { setAmountString } from "@/app/store/depositFormState"

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

function DepositFormFirstStep({ onNext }: { onNext: () => void }) {
  const amountString = useAppSelector(state => state.depositForm.amountString)
  const amount = useAppSelector(state => state.depositForm.amount)
  const dispatch = useAppDispatch()

  return (
    <RootStyled>
      <HeadingStyled>Step 1:</HeadingStyled>
      <Subheading>Enter amount</Subheading>
      <input
        value={amountString ?? ""}
        onChange={(event) => {
          dispatch(setAmountString(event.target.value))
        }}
      >
      </input>
      <Balance onClick={balance => dispatch(setAmountString(balance))} />
      <ButtonStyled
        onClick={amount && amount >= 0.001
          ? onNext
          : () => toast.error("Minimum 0.001 GRIMACE")}
      >
        Step 2
      </ButtonStyled>
    </RootStyled>
  )
}

export default DepositFormFirstStep
