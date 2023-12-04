import { type ComponentProps, useEffect, useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMetaMask } from "metamask-react"
import MenuIcon from "@/components/icons/MenuIcon"
import CloseIcon from "@/components/icons/CloseIcon"
import Socials from "@/components/Socials"
import Hr from "@/components/Hr"
import MetamaskButton from "@/components/MetamaskButton"
import { useMetamaskContext } from "@/hooks/useConnectMetamask"
import FAQSections from "./FAQSections/FAQSections"

const NavLink = ({ href, className, ...rest }: ComponentProps<typeof Link>) => {
  const pathname = usePathname()
  const isActive = pathname?.startsWith(href.toString()) || false

  return (
    <Link
      {...rest}
      href={href}
      className={clsx(
        "uppercase transition-colors hover:text-purple",
        isActive && "text-purple",
        className,
      )}
    />
  )
}

const NavLinks = () => (
  <>
    <NavLink href="/dashboard">Dashboard</NavLink>
    <NavLink href="/rank">Rank</NavLink>
    <FAQSections />
  </>
)

const Header = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const pathname = usePathname()
  const handleMenuButtonClick = () => setSidebarOpened(prev => !prev)
  const { handleConnect } = useMetamaskContext()
  const { account } = useMetaMask()

  useEffect(() => {
    setSidebarOpened(false)
  }, [pathname])

  const mobileHeader = (
    <div className="container flex items-center justify-between p-3 md:hidden">
      <Link href="/">
        <span className="text-xl">
          <span className="font-bold">Grimace</span>
          {" "}
          <span className="font-light">Staking</span>
        </span>
      </Link>
      <button
        className="text-[32px]"
        onClick={handleMenuButtonClick}
      >
        {sidebarOpened ? <CloseIcon /> : <MenuIcon />}
      </button>
    </div>
  )

  return (
    <header className="container md:px-3 w-full md:pt-10 mx-auto">
      <div className="hidden md:block">
        <div className="flex content-between items-center mb-2 gap-6">
          <Link href="/">
            <span className="text-2xl">
              <span className="font-bold">Grimace</span>
              {" "}
              <span className="font-light">Staking</span>
            </span>
          </Link>
          <Hr />
          <MetamaskButton account={account} handleConnect={handleConnect} />
        </div>
        <nav className="flex content-start items-center gap-6 text-lg">
          <NavLinks />
        </nav>
      </div>
      {mobileHeader}
      {sidebarOpened && (
        <div className="w-full h-full fixed left-0 top-0 bg-dark z-[100] md:hidden">
          <div className="container mx-auto flex flex-col items-start">
            {mobileHeader}
            <div className="flex flex-col items-start gap-4 p-4">
              <MetamaskButton account={account} handleConnect={handleConnect} />
              <div className="flex flex-col text-xl">
                <NavLinks />
              </div>
              <Socials />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
