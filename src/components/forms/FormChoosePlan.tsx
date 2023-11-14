import clsx from "clsx"
import { useState } from "react"
import FormContainer from "@/components/Card"
import Button from "@/components/Button"

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

export default () => {
  const [selected, setSelected] = useState(3)

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
          <PlanItem
            durationNumber={3}
            durationUnit="months"
            apr={-0.11}
            ewp={66}
            selected={selected === 1}
            onClick={() => setSelected(1)}
          />
          <PlanItem
            durationNumber={6}
            durationUnit="months"
            apr={-0.22}
            ewp={66}
            selected={selected === 2}
            onClick={() => setSelected(2)}
          />
          <PlanItem
            durationNumber={1}
            durationUnit="year"
            apr={-0.66}
            ewp={66}
            selected={selected === 3}
            onClick={() => setSelected(3)}
          />
          <PlanItem
            durationNumber={5}
            durationUnit="years"
            apr={-1.2}
            ewp={66}
            selected={selected === 4}
            onClick={() => setSelected(4)}
          />
        </div>
        <p className="text-hint">EWP - Early Withdrawal Penalty</p>
        <Button className="self-center mt-6 w-[220px]">
          Step 3
        </Button>
      </FormContainer>
    </>
  )
}
