import { useMetaMask } from "metamask-react"
import { createContext, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import useCheckConnection from "./useCheckConnection"
import { setAccountAddress } from "@/store/accountState"
import { useAppDispatch } from "@/store/hooks"

const MetamaskContext = createContext<{handleConnect:any}>({handleConnect:null})

const MetamaskContextProvider = ({ children }) => {
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

  return (
    <MetamaskContext.Provider value={{ handleConnect }}>
      {children}
    </MetamaskContext.Provider>
  )
}

const useMetamaskContext = () => useContext(MetamaskContext)

export { MetamaskContextProvider, useMetamaskContext }