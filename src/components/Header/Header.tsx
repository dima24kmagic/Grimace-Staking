import React, { useState } from "react"
import type { ComponentProps, MouseEventHandler } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { css } from "@emotion/css"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import { useMetaMask } from "metamask-react"
import Hamburger from "hamburger-react"
import { useWindowSize } from "@uidotdev/usehooks"
import AccountIcon from "@/components/icons/AccountIcon"
import { useConnectMetamask } from "@/app/hooks/useConnectMetamask"
import Container from "@/components/Container"

const Root = styled.header`
  display: flex;
  justify-content: center;
  padding: 24px 24px;
`

const navLinkActiveStyle = css`
  color: var(--color-accent);
`

const NavLinkStyled = styled(Link)`
  text-transform: uppercase;
  font-size: 1.5rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-accent);
  }

  @media screen and (max-width: 992px) {
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid gray;
    width: 100%;
  }
`

function NavLink(props: ComponentProps<typeof Link>) {
  const { className, href, ...rest } = props
  const pathname = usePathname()
  const isActive = pathname?.startsWith(href.toString()) ?? false

  return (
    <NavLinkStyled
      {...rest}
      className={classNames(className, {
        [navLinkActiveStyle]: isActive,
      })}
      href={href}
    />
  )
}

function NavLinks() {
  return (
    <>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/rank">Rank</NavLink>
      <NavLink href="/withdrawals">Withdrawals</NavLink>
      <NavLink href="/faq">FAQ</NavLink>
    </>
  )
}

const BurgerWrapperStyled = styled.div`
  display: none;

  @media screen and (max-width: 992px) {
    display: inline;
    font-size: 1.5rem;
    z-index: 999999;
  }
`

const StyledMenuWrapper = styled.div<{ isOpen: boolean }>`
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
`

const StyledMenuBackgroundDrop = styled.div<{ isOpen: boolean }>`
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
`

const LogoLinkStyled = styled(Link)`
  font-weight: 300;
  font-size: 2.375rem;

  @media screen and (max-width: 992px) {
    font-size: 1.5rem;
  }

  & b {
    font-weight: 700;
  }
`

const HeaderRowStyled = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
`

const HrStyled = styled.hr`
  display: block;
  background: #454545;
  border: none;
  outline: none;
  height: 1px;
  flex-grow: 1;
`

const HeaderDesktopStyled = styled(Container)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-direction: column;
`

const HeaderTabletStyled = styled(Container)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavLinksContainerStyled = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

function Logo() {
  return (
    <LogoLinkStyled href="/">
      <b>GRIMACE</b>
      {" "}
      <span>STAKING</span>
    </LogoLinkStyled>
  )
}

const ConnectButton = styled.button`
  font-size: 1.25rem;
  text-transform: uppercase;
  border: 3px solid var(--color-orange);
  color: var(--color-white);
  background: transparent;
  font-family: var(--font-family);
  overflow: hidden;
  border-radius: 100px;
  transition-timing-function: ease;
  transition-duration: 150ms;
  transition-property: background-color, color;
  height: 42px;

  &:hover {
    cursor: pointer;
  }

  &:not(.connected):hover {
    color: var(--color-dark);
    background-color: var(--color-orange);
  }

  @media screen and (max-width: 992px) {
    font-size: 1rem;
    margin-top: 12px;
  }

  & > div::before {
    background: var(--color-dark);
  }

  &.connected {
    background: var(--color-purple);
    border-color: var(--color-purple);

    & > div {
      background: rgba(0, 0, 0, 75%);

      &::before {
        background: transparent;
      }
    }
  }
`

const ConnectButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 16px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 1px;
    top: 1px;
    bottom: 1px;
    width: 34px;
    height: 34px;
    border-radius: 100px;
  }
`

const ConnectButtonIconStyles = css`
  fill: var(--color-orange);
  position: absolute;
  left: -3px;
  top: -3px;
  bottom: -3px;

  &.connected {
    fill: var(--color-purple);
  }
`

function ConnectMetamaskWrapper({
  account,
  handleConnect,
}: {
  account: string | null
  handleConnect: () => Promise<void>
}) {
  return (
    <ConnectButton
      onClick={handleConnect}
      className={classNames({
        connected: !!account,
      })}
    >
      <ConnectButtonWrapper>
        <AccountIcon
          className={classNames({
            [ConnectButtonIconStyles]: true,
            connected: !!account,
          })}
          width={42}
          height={42}
        />
        <span>
          {account
            ? `${account.substring(0, 5)}...${account.substring(account.length - 3)}`
            : "Connect"}
        </span>
      </ConnectButtonWrapper>
    </ConnectButton>
  )
}

function Header() {
  const { handleConnect } = useConnectMetamask()
  const { account } = useMetaMask()
  const [isOpen, setOpen] = useState(false)
  const handleCloseMenu: MouseEventHandler = (event) => {
    event.stopPropagation()
    setOpen(false)
  }
  const size = useWindowSize()
  const isWideScreen = (size.width ?? 1280) > 992

  return (
    <Root>
      {isWideScreen
        ? (
          <HeaderDesktopStyled>
            <HeaderRowStyled>
              <Logo />
              <HrStyled />
              <ConnectMetamaskWrapper account={account} handleConnect={handleConnect} />
            </HeaderRowStyled>
            <NavLinksContainerStyled>
              <NavLinks />
            </NavLinksContainerStyled>
          </HeaderDesktopStyled>
          )
        : (
          <>
            <HeaderTabletStyled>
              <Logo />
              <BurgerWrapperStyled>
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </BurgerWrapperStyled>
            </HeaderTabletStyled>
            <StyledMenuBackgroundDrop isOpen={isOpen} onClick={handleCloseMenu}>
              <StyledMenuWrapper isOpen={isOpen}>
                <NavLinks />
                <ConnectMetamaskWrapper account={account} handleConnect={handleConnect} />
              </StyledMenuWrapper>
            </StyledMenuBackgroundDrop>
          </>
          )}
    </Root>
  )
}

export default Header
