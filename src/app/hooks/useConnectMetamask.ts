import { useMetaMask } from "metamask-react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/store/hooks"
import { setAccountAddress } from "../store/accountState"
import useCheckConnection from "./useCheckConnection"

export const useConnectMetamask = () => {
  const { connect, account } = useMetaMask()
  const dispatch = useAppDispatch()
  const { isConnected, isOnRightChain, isMetamaskInstalled } = useCheckConnection()

  useEffect(() => {
    if (isOnRightChain && isConnected && isMetamaskInstalled) {
      dispatch(setAccountAddress(account))
    }
  }, [account, isConnected, isOnRightChain, isMetamaskInstalled])

  const handleConnect = async () => {
    if (account) {
      return
    }

    await connect().catch(() => {
      toast.error("Please connect metamask to continue using application")
    })
  }

  return { handleConnect }
}
