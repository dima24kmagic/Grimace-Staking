import { useEffect } from "react"
import Subheading from "./forms/Subheading"
import useBalance from "@/hooks/useBalance"

function Balance({ onClick }: { onClick: (balance: string | null) => void }) {
  const { balance, updateBalance } = useBalance()

  useEffect(() => {
    updateBalance()
  })

  return (
    // TODO: cursor pointer
    <Subheading onClick={() => onClick(balance)}>
      Current balance:
      {balance}
    </Subheading>
  )
}

export default Balance
