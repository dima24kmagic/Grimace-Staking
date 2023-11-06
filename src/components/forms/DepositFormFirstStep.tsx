import styled from "@emotion/styled"
import Subheading from "./Subheading"
import { useAppSelector, useAppDispatch } from '../../app/store/hooks'
import Balance from "../Balance"
import { setAmount } from "@/app/store/depositFormState"

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
  const amount = useAppSelector(state => state.depositForm.amount)
  const dispatch = useAppDispatch()

  return (
    <RootStyled>
      <HeadingStyled>Step 1:</HeadingStyled>
      <Subheading>Enter amount</Subheading>
      <input
        value={amount ?? ''}
        onChange={(event) => {
          dispatch(setAmount(parseFloat(event.target.value)));
        }}
      ></input>
      <Balance onClick={(balance) => dispatch(setAmount(balance))}/>
      <ButtonStyled onClick={onNext}>Step 2</ButtonStyled>
    </RootStyled>
  )
}

export default DepositFormFirstStep
