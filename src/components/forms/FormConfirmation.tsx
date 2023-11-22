import Image from "next/image"
import { daysToReadablePeriod } from "./FormChoosePlan"
import FormContainer from "@/components/Card"
import grimaceManImg from "@/assets/img/grimace-man.png"
import { useAppSelector } from "@/store/hooks"
import useDeposits from "@/hooks/useDeposits"

export default ({ onNext }: { onNext: () => void }) => {
  const depositForm = useAppSelector(state => state.depositForm)
  const { handleDeposit } = useDeposits()
  return (
    <>
      <FormContainer className="text-white bg-purple-700 relative pb-[160px] md:pb-[160px]">
        <h1 className="uppercase text-3xl leading-none mb-2">
          Step 3:
        </h1>
        <h2 className="uppercase font-light text-2xl leading-none mb-6">
          Confirmation
        </h2>
        <div className="flex flex-wrap mb-12">
          <div className="basis-2/4">
            <h4 className="sm:text-lg text-purple-950">Deposit amount</h4>
            <p className="md:text-lg">
              {depositForm.amount}
              {" "}
              <span className="text-sm">GRIMACE</span>
            </p>
          </div>
          <div className="basis-2/4">
            <h4 className="sm:text-lg text-purple-950">Withdrawal amount</h4>
            <p className="md:text-lg">
              {depositForm.amountToWithdraw?.toFixed(7)}
              {" "}
              <span className="text-sm">GRIMACE</span>
            </p>
          </div>
          <div className="basis-2/4">
            <h4 className="sm:text-lg text-purple-950">Period</h4>
            <p className="md:text-lg">
              {daysToReadablePeriod[depositForm.selectedPlan!.days].number}
              {" "}
              {daysToReadablePeriod[depositForm.selectedPlan!.days].unit}
            </p>
          </div>
          <div className="basis-2/4">
            <h4 className="sm:text-lg text-purple-950">Unstake date</h4>
            <p className="md:text-lg">
              {depositForm.unstakeDate}
            </p>
          </div>
        </div>
        <p>
          NOTICE:
          <br />
          By making a deposit you agree
          <br />
          to all the terms and conditions
          <br />
          of GRIMACE STAKING
        </p>
        <button onClick={() => {
          onNext()
          handleDeposit()
        }} className="uppercase self-center text-2xl text-purple-700 font-bold leading-none py-3 px-12 md:px-16 bg-white rounded-xl absolute left-auto right-[120px] bottom-[34px] md:right-auto md:left-2/4 md:-translate-x-2/4 md:bottom-[48px] z-10">
          Stake
        </button>
        <Image
          className="absolute right-0 bottom-0 w-[260px] md:w-[300px] h-auto"
          src={grimaceManImg}
          alt="Grimace"
          priority={false}
        />
      </FormContainer>
    </>
  )
}
