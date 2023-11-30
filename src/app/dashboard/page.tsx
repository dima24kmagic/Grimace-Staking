"use client"

import React, { useEffect, useState } from "react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import Card from "@/components/Card"
import UnlockIcon from "@/components/icons/UnlockIcon"
import PlusIcon from "@/components/icons/PlusIcon"
import Button from "@/components/Button"
import Page from "@/components/Page"
import useDeposits from "@/hooks/useDeposits"
import usePlans from "@/hooks/usePlans"
import { useAppSelector } from "@/store/hooks"
import { daysToReadablePeriod } from "@/components/forms/FormChoosePlan"
import { LoadingSpinner, Spinner } from "../page"
import { useRouter } from "next/navigation"
import EarlyUnstakeAlert from "@/components/EarlyUnstakeAlert/EarlyUnstakeAlert"

export default () => {
  const { deposits, updateDeposits, handleWithdraw, depositsLoaded } = useDeposits()
  const { updatePlans, plans } = usePlans()
  const accountAddress = useAppSelector(state => state.account.address)
  const router = useRouter()

  useEffect(() => {
    if (accountAddress) {
      updatePlans().then(() => updateDeposits())
    }
    
  }, [accountAddress])

  return (
    <Page
      heading="My Dashboard"
      subheading={(
        <p className="text-hint font-light text-xs sm:text-base md:text-lg">
          {accountAddress}
        </p>
      )}
    >
      {depositsLoaded ? 
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 auto-rows-fr">
          {deposits.filter(dep => !dep.isTaken).map((dep, index) => (
            <Deposit
              key={index}
              id={dep.id}
              readyToWithdrawals={dep.withdrawable}
              depositAmount={dep.amount}
              withdrawalAmount={dep.amountToWithdraw}
              period={`${daysToReadablePeriod[plans[dep.planIndex].days].number} ${daysToReadablePeriod[plans[dep.planIndex].days].unit}`}
              unstakeDate={dep.finish}
              unstakeDateSeconds={dep.finishDateSeconds}
              handleWithdraw={handleWithdraw}
            />
          ))}
          <button onClick={() => { router.push("/")}} className="w-full h-full flex justify-center items-center border-[3px] border-solid border-[#454545] text-[#242424]">
            <PlusIcon className="text-[100px]" />
          </button>
        </div>
        : 
        <LoadingSpinner>
          <Spinner />
        </LoadingSpinner>
      }      
    </Page>
  )
}

const Timer = ({
  timeLeftSeconds,
}: {
  timeLeftSeconds: number
}) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    years,
  } = secondsToComponents(timeLeftSeconds)

  return (
    <div className="flex select-none">
      <Slots slots={years} className="mr-3">Years</Slots>
      <Slots slots={days} className="mr-5">Days</Slots>
      <Slots slots={hours} className="mr-3">Hours</Slots>
      <Slots slots={minutes} className="mr-3">Minutes</Slots>
      <Slots slots={seconds}>Seconds</Slots>
    </div>
  )
}

const Deposit = ({
  id,
  depositAmount,
  withdrawalAmount,
  period,
  unstakeDate,
  readyToWithdrawals,
  unstakeDateSeconds,
  handleWithdraw,
}: {
  id: number
  depositAmount: number
  withdrawalAmount: number
  period: string
  unstakeDate: string
  readyToWithdrawals: boolean
  unstakeDateSeconds: number
  handleWithdraw: (id: number) => Promise<void>
}) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftSeconds(Math.floor(unstakeDateSeconds - (new Date().getTime() / 1000)))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={clsx(readyToWithdrawals ? "bg-purple-700" : "")}>
      <div className="mb-2 leading-none">
        <h2 className="uppercase text-2xl font-light mb-4">
          Deposit #
          {id+1}
        </h2>
        {readyToWithdrawals
          ? <h3 className="uppercase text-xl font-bold mb-6">Ready to withdrawals</h3>
          : (
            <Timer timeLeftSeconds={timeLeftSeconds} />
            )}
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="basis-2/4">
          <h4 className={clsx(
            "sm:text-lg",
            readyToWithdrawals ? "text-purple-950" : "text-[#898989]",
          )}
          >
            Deposit amount
          </h4>
          <p className="md:text-xl">
            {depositAmount}
            {" "}
            <span className="text-base">GRIMACE</span>
          </p>
        </div>
        <div className="basis-2/4">
          <h4 className={clsx(
            "sm:text-lg",
            readyToWithdrawals ? "text-purple-950" : "text-[#898989]",
          )}
          >
            Withdrawal amount
          </h4>
          <p className="md:text-lg">
            {withdrawalAmount.toFixed(7)}
            {" "}
            <span className="text-sm">GRIMACE</span>
          </p>
        </div>
        <div className="basis-2/4">
          <h4 className={clsx(
            "sm:text-lg",
            readyToWithdrawals ? "text-purple-950" : "text-[#898989]",
          )}
          >
            Period
          </h4>
          <p className="md:text-lg">{period}</p>
        </div>
        <div className="basis-2/4">
          <h4 className={clsx(
            "sm:text-lg",
            readyToWithdrawals ? "text-purple-950" : "text-[#898989]",
          )}
          >
            Unstake date
          </h4>
          <p className="md:text-lg">{unstakeDate}</p>
        </div>
      </div>

      <div className="self-center my-auto flex items-stretch justify-center flex-col xl:flex-row gap-2">
        {readyToWithdrawals
          ? (
            <Button onClick={() => {handleWithdraw(id)}} className="flex items-center gap-2 justify-center self-center from-success-800 to-success-500">Withdrawal</Button>
            )
          : (
            <Button onClick={() => {setOpenAlert(!openAlert)}} className="flex items-center gap-2 justify-center self-center from-danger-800 to-danger-500">
              <UnlockIcon className="text-[24px]" />
              Early unstake
            </Button>
            )}
      </div>
      <EarlyUnstakeAlert handleClose={() => {setOpenAlert(!openAlert)}} handleWithdraw={() => {
        handleWithdraw(id)
        setOpenAlert(!openAlert)
      }} isOpenProp={openAlert}></EarlyUnstakeAlert>
    </Card>
  )
}

const Slot = ({
  className,
  children,
  ...rest
}: React.ComponentProps<"span">) => (
  <span
    className={twMerge(
      clsx(
        "inline-flex items-center justify-center border border-solid border-white text-white leading-none text-center",
        "text-base md:text-lg",
        "w-[18px] h-[28px] md:w-[24px] md:h-[36px]",
        "rounded-md md:rounded-lg",
      ),
      className,
    )}
    {...rest}
  >
    {children}
  </span>
)

const Slots = ({
  className,
  slots,
  children,
  ...rest
}: React.ComponentProps<"span"> & { slots: React.ReactNode[] }) => (
  <span
    className={twMerge(
      "inline-block",
      className,
    )}
    {...rest}
  >
    <div className="flex gap-1 mb-1">
      {slots.map((slot, i) => <Slot key={i}>{slot}</Slot>)}
    </div>
    <p className="text-[0.575rem] md:text-xs uppercase text-center w-full">{children}</p>
  </span>
)

function secondsToComponents(sec: number): {
  seconds: [number, number]
  minutes: [number, number]
  hours: [number, number]
  days: [number, number, number]
  years: [number, number]
} {
  const seconds = sec % 60
  const minutes = Math.floor(sec / 60) % 60
  const hours = Math.floor(sec / 60 / 60) % 24
  const days = Math.floor(sec / 60 / 60 / 24) % 365
  const years = Math.floor(sec / 60 / 60 / 24 / 365)

  return {
    seconds: [Math.floor(seconds / 10), seconds % 10],
    minutes: [Math.floor(minutes / 10), minutes % 10],
    hours: [Math.floor(hours / 10), hours % 10],
    days: [Math.floor(days / 100), Math.floor(days / 10) % 10, days % 10],
    years: [Math.floor(years / 10), years % 10],
  }
}
