import DepositFormFirstStep from "./DepositFormFirstStep"
import DepositFormSecondStep from "./DepositFormSecondStep"
import DepositFormThirdStep from "./DepositFormThirdStep"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { setStep } from "@/app/store/depositFormState"

function RenderStep({ step, onNext }: { step: number; onNext: () => void }) {
  switch (step) {
    case 2:
      return (<DepositFormSecondStep onNext={onNext}></DepositFormSecondStep>)
    case 3:
      return (<DepositFormThirdStep onNext={onNext}></DepositFormThirdStep>)
    default:
      return (<DepositFormFirstStep onNext={onNext}></DepositFormFirstStep>)
  }
}

function DepositFormConnected() {
  const step = useAppSelector(state => state.depositForm.step)
  const dispatch = useAppDispatch()

  return (
    <RenderStep
      step={step}
      onNext={() => dispatch(setStep(step + 1))}
    />
  )
}

export default DepositFormConnected
