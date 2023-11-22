import React from "react"
import Link from "next/link"
import clsx from "clsx"
import DiscordIcon from "./icons/DiscordIcon"
import TelegramIcon from "./icons/TelegramIcon"
import TwitterIcon from "./icons/TwitterIcon"

const Socials = ({ className, ...rest }: React.ComponentProps<"div">) => (
  <div
    {...rest}
    className={clsx(
      "flex justify-between items-center gap-3 text-[32px] leading-[0]",
      className,
    )}
  >
    <Link className="hover:text-purple transition-colors" href="https://discord.com/invite/grimacedoge"><DiscordIcon /></Link>
    <Link className="hover:text-purple transition-colors" href="https://t.me/grimacecommunity"><TelegramIcon /></Link>
    <Link className="hover:text-purple transition-colors" href="https://twitter.com/Grimacedogchain"><TwitterIcon /></Link>
  </div>
)

export default Socials
