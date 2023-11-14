"use client"

import FormChoosePlan from "@/components/forms/FormChoosePlan"
import FormConfirmation from "@/components/forms/FormConfirmation"
import FormDisconnected from "@/components/forms/FormDisconnected"
import FormEnterAmount from "@/components/forms/FormEnterAmount"

export default function Home() {
  const formNo = 4 as number

  let content = "🤔" as any
  if (formNo === 1) {
    content = <FormDisconnected />
  } else if (formNo === 2) {
    content = <FormEnterAmount />
  } else if (formNo === 3) {
    content = <FormChoosePlan />
  } else if (formNo === 4) {
    content = <FormConfirmation />
  }

  return (
    <div className="w-full h-full grow flex flex-col justify-center gap-3 max-w-[min(600px,100%)] mx-auto px-2">
      {content}
    </div>
  )
}
