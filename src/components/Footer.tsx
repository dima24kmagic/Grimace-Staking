import type { ComponentProps } from "react"
import Link from "next/link"
import Socials from "./Socials"
import Hr from "@/components/Hr"

const NavLink = (props: ComponentProps<typeof Link>) => (
  <Link
    {...props}
    className="hover:text-purple transition-colors"
  />
)

const Footer = () => (
  <footer className="container flex flex-col content-between items-center gap-2 mx-auto py-6 md:pb-10 md:pt-0 md:px-3 lg:gap-6 lg:flex-row">
    <Socials className="lg:order-4" />
    <Hr className="hidden lg:block lg:order-2" />
    <nav className="lg:order-3 flex gap-2 content-between items-center uppercase font-light text-base md:text-lg">
      <NavLink href="https://swap.grimacedoge.com">Swap</NavLink>
      |
      <NavLink href="https://nft-grimace.com">NFT</NavLink>
      |
      <NavLink href="https://whitepaper.grimacedoge.com">Whitepaper</NavLink>
      |
      <NavLink href="https://grimacedoge.com">Grimace</NavLink>
    </nav>
    <p className="text-base md:text-lg lg:order-1">
      <span className="font-bold">Grimace</span>
      {" "}
      <span className="font-light">STAKING</span>
      {" "}
      <span className="font-normal">&copy; Grimace Coin 2023</span>
    </p>
  </footer>
)

export default Footer
