import Link from "next/link";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import DiscordIcon from "@/components/icons/DiscordIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import Container from "@/components/Container";
import FAQSections from "@/components/FAQSections/FAQSections";

const socialIconStyles = css`
  width: 27px;
  height: 27px;
`;

const Root = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  gap: 20px;
  margin: 36px 0;
`;

const LinksContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 14px;
    margin: 24px auto auto;
  }
`;

const TextLink = styled(Link)`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1rem;
  color: var(--color-text);
  transition-timing-function: ease;
  transition-duration: 150ms;
  transition-property: color;

  &:hover {
    color: var(--color-accent);
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
`;

const LinkIcon = styled(Link)`
  fill: var(--color-text);
  transition-timing-function: ease;
  transition-duration: 150ms;
  transition-property: fill;

  &:hover {
    fill: var(--color-accent);
  }
`;

const Copyright = styled.span`
  font-size: 1.25rem;
  text-align: center;
`;

function Footer() {
  return (
    <Root>
      <LinksContainer>
        <TextLink href="/">Homepage</TextLink>
        <SocialLinksContainer>
          <LinkIcon
            href="https://discord.com/invite/grimacedoge"
            target="_blank"
          >
            <DiscordIcon className={socialIconStyles} />
          </LinkIcon>
          <LinkIcon href="https://t.me/grimacecommunity" target="_blank">
            <TelegramIcon className={socialIconStyles} />
          </LinkIcon>
          <LinkIcon href="https://twitter.com/Grimacedogchain" target="_blank">
            <TwitterIcon className={socialIconStyles} />
          </LinkIcon>
        </SocialLinksContainer>
        <TextLink href="https://whitepaper.grimacedoge.com/">
          Whitepaper
        </TextLink>
        <FAQSections />
      </LinksContainer>
      <Copyright>&copy; Grimace Coin 2023</Copyright>
    </Root>
  );
}

export default Footer;
