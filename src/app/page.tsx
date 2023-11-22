"use client"

import FormChoosePlan from "@/components/forms/FormChoosePlan"
import FormConfirmation from "@/components/forms/FormConfirmation"
import FormDisconnected from "@/components/forms/FormDisconnected"
import FormEnterAmount from "@/components/forms/FormEnterAmount"
import { setStep } from "@/store/depositFormState"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function Home() {
  const accountAddress = useAppSelector(state => state.account.address)
  const step = useAppSelector(state => state.depositForm.step)
  const dispatch = useAppDispatch()

  let content = "" as any
  if (!accountAddress) {
    content = <FormDisconnected />
  } else if (step === 1) {
    content = <FormEnterAmount onNext={() => dispatch(setStep(step + 1))} />
  } else if (step === 2) {
    content = <FormChoosePlan onNext={() => dispatch(setStep(step + 1))} />
  } else if (step === 3) {
    content = <FormConfirmation onNext={() => dispatch(setStep(step + 1))} />
  }

  return (
    <div className="w-full h-full grow flex flex-col justify-center gap-3 max-w-[min(600px,100%)] mx-auto px-2">
      {content}
    </div>
  )
}
