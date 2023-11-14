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
    <Link className="hover:text-purple transition-colors" href="#"><DiscordIcon /></Link>
    <Link className="hover:text-purple transition-colors" href="#"><TelegramIcon /></Link>
    <Link className="hover:text-purple transition-colors" href="#"><TwitterIcon /></Link>
  </div>
)

export default Socials
