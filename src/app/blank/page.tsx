"use client"

import { Button } from "@/components/Button/Button"
import AccountIcon from "@/components/icons/AccountIcon"

export default function Home() {
  return (
    <>
      <span>
        Hello!
        {" "}
        <AccountIcon />
      </span>
      <Button>Early Unstake</Button>
    </>
  )
}
