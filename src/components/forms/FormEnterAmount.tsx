import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "react-toastify"
import FormContainer from "@/components/Card"
import Button from "@/components/Button"
import BitGetBanner from "@/components/banners/BitGetBanner"
import GrimaceSwapBanner from "@/components/banners/GrimaceSwapBanner"
import grimaceCoinImg from "@/assets/img/grimace-coin.png"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setAmountString } from "@/store/depositFormState"
import useBalance from "@/hooks/useBalance"

export default ({ onNext }: { onNext: () => void }) => {
  const amountString = useAppSelector(state => state.depositForm.amountString)
  const amount = useAppSelector(state => state.depositForm.amount)
  const dispatch = useAppDispatch()
  const { balance, updateBalance } = useBalance()

  useEffect(() => {
    updateBalance()
  })

  return (
    <>
      <FormContainer>
        <h1 className="uppercase text-3xl font-light leading-none mb-2">
          Step 1:
        </h1>
        <h2 className="uppercase text-hint font-light text-lg md:text-2xl leading-none mb-6">
          Enter amount
        </h2>
        <div className="w-full relative mb-2">
          <Image
            src={grimaceCoinImg}
            alt="Grimace Coin"
            className="absolute left-[4px] top-[4px] h-[calc(100%-8px)] w-auto"
          />
          <input
            value={amountString ?? ""}
            onChange={(event) => {
              const input = event.target.value
              const floatPattern = /^\d*\.?\d*$/
              if (floatPattern.test(input) || input === "") {
                dispatch(setAmountString(input))
              }
            }}
            type="text"
            autoComplete="off"
            className="bg-[#262626] placeholder:text-[#727272] pl-[64px] rounded-full w-full text-lg md:text-xl font-light outline-none py-3"
            placeholder="GRIMACE amount"
          />
        </div>
        <p onClick={() => dispatch(setAmountString(balance))} className="cursor-pointer uppercase font-light self-end">
          Current balance:
          {" "}
          {balance}
          {" "}
          Grimace
        </p>
        <Button
          className="self-center mt-6 w-[220px]"
          onClick={
          amount && amount >= 0.001 ? onNext : () => toast.error("Minimum 0.001 GRIMACE")
}
        >
          Step 2
        </Button>
      </FormContainer>
      <Link href="#" className="text-hint text-lg hover:text-purple transition-colors">
        Still no GRIMACE?
      </Link>
      <BitGetBanner />
      <GrimaceSwapBanner />
    </>
  )
}
