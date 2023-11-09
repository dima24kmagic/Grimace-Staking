import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import Subheading from "./forms/Subheading"
import { useEffect } from "react"
import useUpdateBalance from "@/app/hooks/useUpdateBalance"

function Balance({onClick}: {onClick: (balance : string | null) => void}) {
  const balance = useAppSelector(state => state.account.balance)
  const { updateBalance } = useUpdateBalance()

  useEffect(() => { updateBalance() });

  return (
    //TODO: cursor pointer
    <Subheading onClick={() => onClick(balance)}>Current balance: {balance}</Subheading>
  )
}

export default Balance
