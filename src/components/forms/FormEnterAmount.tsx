import Image from "next/image"
import Link from "next/link"
import FormContainer from "@/components/Card"
import Button from "@/components/Button"
import BitGetBanner from "@/components/banners/BitGetBanner"
import GrimaceSwapBanner from "@/components/banners/GrimaceSwapBanner"
import grimaceCoinImg from "@/assets/img/grimace-coin.png"

export default () => {
  const balance = 200

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
            type="text"
            autoComplete="off"
            className="bg-[#262626] placeholder:text-[#727272] pl-[64px] rounded-full w-full text-lg md:text-xl font-light outline-none py-3"
            placeholder="GRIMACE amount"
          />
        </div>
        <p className="uppercase font-light self-end">
          Current balance:
          {" "}
          {balance}
          {" "}
          Grimace
        </p>
        <Button className="self-center mt-6 w-[220px]">
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
