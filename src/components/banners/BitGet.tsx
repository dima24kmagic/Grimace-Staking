import { css } from "@emotion/css"
import type { BannerProps } from "./Banner"
import Base from "./Banner"
import bitGetImg from "@/assets/img/bitget.png"

const buttonStyles = css`
  border-color: #055257;
  background: linear-gradient(90deg, #00F0FF -3.06%, #00DDEB 100%);
  color: #000;
`

export default (props: Partial<BannerProps>) => (
  <Base
    heading={(
      <>
        <b>BitGet</b>
        {" "}
        EXCHANGE
      </>
    )}
    subheading="Buy Grimace token on Bitget CEX"
    imageAlt="BitGet Exchange"
    imageData={bitGetImg}
    className={buttonStyles}
    {...props}
  />
)
