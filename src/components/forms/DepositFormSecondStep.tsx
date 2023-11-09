import styled from "@emotion/styled"
import Subheading from "./Subheading"
import { useAppSelector, useAppDispatch } from '../../app/store/hooks'
import { useEffect } from "react"
import { Plan, selectPlan, setPlans } from "@/app/store/depositFormState"
import { useEthersContext } from "@/app/hooks/useEthers"
import useUpdatePlans from "@/app/hooks/useUpdatePlans"

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

function DepositFormSecondStep({onNext} : {onNext: () => void}) {
  const plans = useAppSelector(state => state.depositForm.plans)
  const selectedPlanIndex = useAppSelector(state => state.depositForm.selectedPlanIndex)
  const dispatch = useAppDispatch()
  const {updatePlans} = useUpdatePlans()

  useEffect(() =>{ updatePlans() }, [])

  return (
    <RootStyled>
      <HeadingStyled>Step 2:</HeadingStyled>
      <Subheading>Choose plan</Subheading>

      {plans.map((plan, index) => (
        <div key={index} onClick={() => dispatch(selectPlan(index))}>
          {selectedPlanIndex === index && (<span>selected</span>) }
          <Subheading>{plan.days}</Subheading>
          <Subheading>{plan.percent}</Subheading>
          <Subheading>{plan.ewp}</Subheading>
        </div>
      ))}
      
      <Subheading>EWP - Early Withdrawal Penalty</Subheading>
      <ButtonStyled onClick={onNext}>Step 3</ButtonStyled>
    </RootStyled>
  )
}

export default DepositFormSecondStep