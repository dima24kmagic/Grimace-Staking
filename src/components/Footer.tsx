import styled from "@emotion/styled"
import Link from "next/link"
import DiscordIcon from "@/components/icons/DiscordIcon"
import TelegramIcon from "@/components/icons/TelegramIcon"
import TwitterIcon from "@/components/icons/TwitterIcon"
import Container from "@/components/Container"

const ContainerStyled = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: auto;
  padding: 24px;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`

const CopyrightTextStyled = styled.p`
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;

  & .thin {
    font-weight: 300;
  }

  & b {
    font-weight: 700;
  }

  @media screen and (max-width: 992px) {
    text-align: center;
    font-size: 1rem;
    order: 10;
  }

  @media screen and (min-width: 992.01px) and (max-width: 1400px) {
    font-size: 1.175rem;
  }
`

const HrStyled = styled.hr`
  display: block;
  height: 1px;
  background: #454545;
  border: none;
  flex-grow: 1;

  @media screen and (max-width: 992px) {
    display: none;
  }
`

const LinksContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`

const TextLinksContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LinkStyled = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-accent);
  }

  &:not(:last-child)::after {
    content: "|";
    color: #fff;
    margin-left: 6px;
    margin-right: 6px;
  }

  @media screen and (max-width: 992px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 992.01px) and (max-width: 1400px) {
    font-size: 1rem;
  }
`

const SocialLinksContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 992px) {
    gap: 24px;
  }
`

const SocialLinkStyled = styled(Link)`
  fill: #fff;
  transition: fill 0.2s ease-in-out;

  &:hover {
    fill: var(--color-accent);
  }
`

function Footer() {
  return (
    <ContainerStyled>
      <CopyrightTextStyled>
        <b>Grimace</b>
        {" "}
        <span className="thin">STAKING</span>
        {" "}
        &copy; Grimace Coin 2023
      </CopyrightTextStyled>
      <HrStyled />
      <LinksContainerStyled>
        <TextLinksContainerStyled>
          <LinkStyled href="#">Swap</LinkStyled>
          <LinkStyled href="#">NFT</LinkStyled>
          <LinkStyled href="#">Whitepaper</LinkStyled>
          <LinkStyled href="#">Grimace</LinkStyled>
        </TextLinksContainerStyled>
        <SocialLinksContainerStyled>
          <SocialLinkStyled href="#">
            <DiscordIcon width={36} height={36} />
          </SocialLinkStyled>
          <SocialLinkStyled href="#">
            <TelegramIcon width={36} height={36} />
          </SocialLinkStyled>
          <SocialLinkStyled href="#">
            <TwitterIcon width={36} height={36} />
          </SocialLinkStyled>
        </SocialLinksContainerStyled>
      </LinksContainerStyled>
    </ContainerStyled>
  )
}

export default Footer
