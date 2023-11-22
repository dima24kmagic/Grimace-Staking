import FormContainer from "../Card"
import BitGetBanner from "@/components/banners/BitGetBanner"
import GrimaceSwapBanner from "@/components/banners/GrimaceSwapBanner"
import Button from "@/components/Button"

export default () => {
  return (
    <>
      <FormContainer className="border-orange text-center items-center">
        <h1 className="uppercase text-3xl leading-none mb-3">
          <span className="font-light">Stake</span>
          {" "}
          <span className="font-medium">Grimace</span>
        </h1>
        <h2 className="uppercase text-hint font-light text-lg md:text-xl leading-none">
          Protecting you from you
        </h2>
        <Button className="mt-6 from-orange-600 to-orange-400 w-[220px]">
          Connect
        </Button>
      </FormContainer>
      <BitGetBanner />
      <GrimaceSwapBanner />
    </>
  )
}
