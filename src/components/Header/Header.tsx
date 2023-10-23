import React, { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useMetaMask } from "metamask-react";
import { useConnectMetamask } from "@/app/hooks/useConnectMetamask";
import Container from "@/components/Container";
import metamaskLogoIcon from "../../../public/matamask_logo.png";
import Image from "next/image";
import { media } from "@/app/utils";
import Hamburger from "hamburger-react";
import { useWindowSize } from "@uidotdev/usehooks";

const Root = styled.header`
  display: flex;
  justify-content: center;
  padding: 24px 24px;
`;

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const OutlinedButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid var(--color-orange);
  background-color: rgba(0, 0, 0, 0%);
  color: var(--color-white);
  font-family: var(--font-family);
  border-radius: 100px;
  padding: 8px 12px;
  transition-timing-function: ease;
  transition-duration: 150ms;
  transition-property: background-color, color;

  &:hover {
    color: var(--color-dark);
    background-color: var(--color-orange);
    cursor: pointer;
  }

  ${media["992px"](
          `font-size: 1rem; margin-top: 12px`
  )}
`;

const AccountAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //margin-top: 6px;
  color: rgb(255, 255, 255);
  font-size: 1rem;

  img {
    margin-right: 4px;
  }
`;

const ItemsLeft = styled.div``;
const ItemsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  margin-bottom: 4px;
`;

const navLinkStyle = css`
  font-size: 1.5rem;
`;

const navLinkActiveStyle = css``;

export type NavLinkProps = React.ComponentProps<typeof Link>;

const StyledNavLink = styled(Link)`
  ${media["992px"](
          `margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid gray; width: 100%;`
  )}
`;

function NavLink(props: NavLinkProps) {
  const { className, href, ...rest } = props;
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href.toString()) ?? false;

  return (
    <StyledNavLink
      {...rest}
      className={classNames(className, navLinkStyle, {
        [navLinkActiveStyle]: isActive,
      })}
      href={href}
    />
  );
}

const StyledHamburgerWrapper = styled.div`
  display: none;
  ${media["992px"](`
    display: inline;
    font-size: 1.5rem;
    z-index: 99999999999999;
  `)}
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #1a1a1a;
  box-shadow: 8px 0px 40px #000000;
  width: 80%;
  height: 100vh;
  max-width: 300px;
  padding: 100px 36px;

  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  z-index: 99999;
`;

const StyledMenuBackgroundDrop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4.5px);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  z-index: 99999;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 2.5rem;

  ${media["992px"](`
    font-size: 1.5rem;
  `)}
  & b {
    font-weight: 700;
  }
`;

function Logo() {
  return (
    <LogoLink href="/">
      <b>Grimace NFT</b> View
    </LogoLink>
  );
}

const ConnectMetamaskWrapper = ({
  account,
  handleConnect,
}: {
  account: string;
  handleConnect: () => Promise<void>;
}) => {
  if (account) {
    return (
      <AccountAddressWrapper>
        <Image
          width={30}
          height={30}
          src={metamaskLogoIcon}
          alt="metamask logo"
        />
        <p>{account.substring(0, 8)}...</p>
      </AccountAddressWrapper>
    );
  }
  return (
    <OutlinedButton onClick={handleConnect}>Connect MetaMask</OutlinedButton>
  );
};

/**
 * Header
 */
function Header() {
  const { handleConnect } = useConnectMetamask();
  const { account } = useMetaMask();
  const [isOpen, setOpen] = useState(false);
  const handleCloseMenu = (e: Event) => {
    e.stopPropagation();
    setOpen(false);
  };
  const size = useWindowSize();
  return (
    <Root>
      <Wrapper>
        <ItemsLeft>
          <Logo/>
        </ItemsLeft>
        <ItemsRight>
          {size.width > 992 && (
            <>
              <NavLink href="/my-nfts">My NFTs</NavLink>
              <NavLink href="/collection">Collection</NavLink>
              <ConnectMetamaskWrapper
                account={account}
                handleConnect={handleConnect}
              />
            </>
          )}
          <StyledHamburgerWrapper>
            <Hamburger toggled={isOpen} toggle={setOpen}/>
          </StyledHamburgerWrapper>
        </ItemsRight>
      </Wrapper>
      {size.width <= 992 && (
        <StyledMenuBackgroundDrop isOpen={isOpen} onClick={handleCloseMenu}>
          <StyledMenuWrapper
            isOpen={isOpen}
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink href="/my-nfts">My NFTs</NavLink>
            <NavLink href="/collection">Collection</NavLink>
            <ConnectMetamaskWrapper
              account={account}
              handleConnect={handleConnect}
            />
          </StyledMenuWrapper>
        </StyledMenuBackgroundDrop>
      )}
    </Root>
  );
}

export default Header;
