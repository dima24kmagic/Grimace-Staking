import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import Subheading from "./forms/Subheading"
import { setBalance } from "@/app/store/accountState"
import { useEffect } from "react"
import { useEthersContext } from "@/app/hooks/useEthers"

function Balance({onClick}: {onClick: (balance : string | null) => void}) {
  const accountAddress = useAppSelector(state => state.account.address)
  const balance = useAppSelector(state => state.account.balance)
  const dispatch = useAppDispatch()
  const { tokenContract, ethers } = useEthersContext()

useEffect(() => {
    if (!accountAddress){
        dispatch(setBalance(null))
        return
    }
    
    tokenContract!.balanceOf(accountAddress)
      .then((result) => { dispatch(setBalance(ethers.formatEther(result)))})
  });

  return (
    //TODO: cursor pointer
    <Subheading onClick={() => onClick(balance)}>Current balance: {balance}</Subheading>
  )
}

export default Balance
