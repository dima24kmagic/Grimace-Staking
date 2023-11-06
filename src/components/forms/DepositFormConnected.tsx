import { useState } from "react"
import DepositFormFirstStep from "./DepositFormFirstStep"
import DepositFormSecondStep from "./DepositFormSecondStep"
import DepositFormThirdStep from "./DepositFormThirdStep"

function RenderStep({step, onNext} : {step: number, onNext: () => void}) {
  switch(step) {
    default:
      return (<DepositFormFirstStep onNext={onNext}></DepositFormFirstStep>)
    case 2:
      return (<DepositFormSecondStep onNext={onNext}></DepositFormSecondStep>)
    case 3:
      return (<DepositFormThirdStep onNext={onNext}></DepositFormThirdStep>)
  }
}

function DepositFormConnected() {
  const [step, setStep] = useState(1)

  return (
    <RenderStep step={step} onNext={() => {
      if(step < 3){
        setStep(step + 1)
      } else {
        setStep(1)
      }
    } }></RenderStep>
  )
}

export default DepositFormConnected
