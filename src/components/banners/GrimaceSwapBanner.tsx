import type { BannerProps } from "./Banner"
import Banner from "./Banner"
import grimaceSwapImg from "@/assets/img/grimace-swap.png"

export default (props: Partial<BannerProps>) => (
  <Banner
    url="https://swap.grimacedoge.com/"
    heading={(
      <>
        <b className="font-normal">GRIMACE</b>
        {" "}
        SWAP
      </>
    )}
    subheading="SWAP GRIMACE ON DOGECHAIN"
    imageAlt="Grimace Swap"
    imageData={grimaceSwapImg}
    className="text-white border-[#32155B] bg-gradient-to-r from-[#7A30DC] to-[#271145]"
    {...props}
  />
)
