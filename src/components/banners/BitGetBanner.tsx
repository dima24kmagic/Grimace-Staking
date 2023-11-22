import type { BannerProps } from "./Banner"
import Banner from "./Banner"
import bitGetImg from "@/assets/img/bitget.png"

export default (props: Partial<BannerProps>) => (
  <Banner
    heading={(
      <>
        <b className="font-normal">BitGet</b>
        {" "}
        EXCHANGE
      </>
    )}
    subheading="Buy Grimace token on Bitget CEX"
    imageAlt="BitGet Exchange"
    imageData={bitGetImg}
    className="text-[#000] border-[#055257] bg-gradient-to-r from-[#00F0FF] to-[#00DDEB]"
    {...props}
  />
)
