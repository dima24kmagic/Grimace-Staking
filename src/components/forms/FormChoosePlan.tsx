import clsx from "clsx"
import { useEffect } from "react"
import FormContainer from "@/components/Card"
import Button from "@/components/Button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import usePlans from "@/hooks/usePlans"
import { selectPlan } from "@/store/depositFormState"
import { LoadingSpinner, Spinner } from "@/app/page"

const PlanItem = ({
  durationNumber,
  durationUnit,
  apr,
  ewp,
  selected = false,
  onClick,
}: {
  durationNumber: number
  durationUnit: string
  apr: number
  ewp: number
  selected?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className={clsx(
        "flex justify-between items-center border-2 border-solid text-white px-3 py-2",
        selected ? "border-purple-900 bg-gradient-to-r from-purple-950 to-purple-900" : "border-[#4e4e4e]",
      )}
      onClick={onClick}
    >
      <h3 className="uppercase leading-none">
        <span className="text-3xl md:text-3xl mr-2">{durationNumber}</span>
        <span
          className={clsx(
            "text-xl md:text-2xl",
            selected ? "" : "text-hint",
          )}
        >
          {durationUnit}
        </span>
      </h3>
      <div className="text-right">
        <p className={clsx("text-lg", selected ? "" : "text-hint")}>
          APR:
          {" "}
          <span className="text-white">
            {apr}
            %
          </span>
        </p>
        <p className={clsx("text-sm", selected ? "" : "text-hint")}>
          EWP:
          {" "}
          <span className="text-white">
            {ewp}
            %
          </span>
        </p>
      </div>
    </button>
  )
}

export const daysToReadablePeriod = { 90: { number: 3, unit: "months" }, 180: { number: 6, unit: "months" }, 360: { number: 1, unit: "year" }, 1800: { number: 5, unit: "years" } }

export default ({ onNext }: { onNext: () => void }) => {
  const selectedPlanIndex = useAppSelector(state => state.depositForm.selectedPlanIndex)
  const dispatch = useAppDispatch()
  const { plans, updatePlans } = usePlans()

  useEffect(() => {
    updatePlans()
  }, [])

  return (
    <>
      <FormContainer>
        <h1 className="uppercase text-3xl font-light leading-none mb-2">
          Step 2:
        </h1>
        <h2 className="uppercase text-hint font-light text-2xl leading-none mb-6">
          Choose plan
        </h2>
        <div className="w-full flex flex-col gap-2 mb-4">
          {plans.length > 0 ? plans.map((plan, index) => (
            <PlanItem
              key={index}
              durationNumber={daysToReadablePeriod[plan.days].number}
              durationUnit={daysToReadablePeriod[plan.days].unit}
              apr={plan.percent * -1}
              ewp={plan.ewp}
              selected={selectedPlanIndex === plan.id}
              onClick={() => dispatch(selectPlan(plan.id))}
            />
          ))
            : 
            <LoadingSpinner>
              <Spinner />
            </LoadingSpinner>
          }
        </div>
        <p className="text-hint">EWP - Early Withdrawal Penalty</p>
        <Button disabled={selectedPlanIndex == null} className="self-center mt-6 w-[220px]" onClick={onNext}>
          Step 3
        </Button>
      </FormContainer>
    </>
  )
}
