"use client"

import FormChoosePlan from "@/components/forms/FormChoosePlan"
import FormConfirmation from "@/components/forms/FormConfirmation"
import FormDisconnected from "@/components/forms/FormDisconnected"
import FormEnterAmount from "@/components/forms/FormEnterAmount"
import { setStep } from "@/store/depositFormState"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import styled from "@emotion/styled"

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 300px;
  display: flex;
  margin-top: 32px;
  background: rgba(0, 0, 0, 0);
  border-radius: 16px;
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #9747ff;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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
    content = <FormChoosePlan onNext={() => dispatch(setStep(step + 1))} onPrev={() => dispatch(setStep(step - 1))} />
  } else if (step === 3) {
    content = <FormConfirmation onNext={() => dispatch(setStep(step + 1))} onPrev={() => dispatch(setStep(step - 1))} />
  } else if (step === 4) {
    content = (
      <LoadingSpinner>
        <Spinner />
      </LoadingSpinner>
    )
  }

  return (
    <div className="w-full h-full grow flex flex-col justify-center gap-3 max-w-[min(600px,100%)] mx-auto px-2">
      {content}
    </div>
  )
}
