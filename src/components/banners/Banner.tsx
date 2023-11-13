import type { ComponentProps, ReactNode } from "react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import styled from "@emotion/styled"

const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
  border-radius: 0;
  border-width: 4px;
  border-style: solid;
  padding-right: 24px;

  cursor: pointer;
`

const TextContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
`

const HeadingStyled = styled.span`
  font-size: 2.1875rem;
  font-weight: 300;

  & b {
    font-weight: 400;
  }
`

const SubheadingStyled = styled.span`
  font-size: 1.25rem;
  font-weight: 300;
  text-transform: uppercase;
  opacity: 0.6;
`

const LeadingImageStyled = styled(Image)`
  width: 90px;
  height: 90px;
`

export type BannerProps = {
  heading: ReactNode
  subheading: ReactNode
  imageData: StaticImageData
  imageAlt: string
} & ComponentProps<typeof StyledButton>

function Banner({
  heading,
  subheading,
  imageAlt,
  imageData,
  ...rest
}: BannerProps) {
  return (
    <StyledButton {...rest}>
      <LeadingImageStyled alt={imageAlt} src={imageData} />
      <TextContainerStyled>
        <HeadingStyled>{heading}</HeadingStyled>
        <SubheadingStyled>{subheading}</SubheadingStyled>
      </TextContainerStyled>
    </StyledButton>
  )
}

export default Banner
