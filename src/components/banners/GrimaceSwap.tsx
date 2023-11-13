import { css } from "@emotion/css"
import type { BannerProps } from "./Banner"
import Base from "./Banner"
import grimaceSwapImg from "@/assets/img/grimace-swap.png"

const buttonStyles = css`
  border-color: #32155B;
  background: linear-gradient(90deg, #7A30DC -3.06%, #271145 100%);
  color: #fff;
`

export default (props: Partial<BannerProps>) => (
  <Base
    heading={(
      <>
        <b>GRIMACE</b>
        {" "}
        SWAP
      </>
    )}
    subheading="SWAP GRIMACE ON DOGECHAIN"
    imageAlt="Grimace Swap"
    imageData={grimaceSwapImg}
    className={buttonStyles}
    {...props}
  />
)
