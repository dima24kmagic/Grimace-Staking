import { useEffect, useState } from "react"
import { useMetaMask } from "metamask-react"
import { toast } from "react-toastify"

const useCheckConnection = () => {
  const { status, chainId, switchChain } = useMetaMask()
  const [isOnRightChain, setIsOnRightChain] = useState(false)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const targetChainId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID ?? "0x61" //0x61 - bsc testnet

  useEffect(() => {
    if (status !== "initializing") {
      (() => {
        if (status === "unavailable") {
          // MetaMask is not installed
          setIsMetamaskInstalled(false)
          toast.info("Please install MetaMask")
        } else if (status === "notConnected") {
          // User is not connected to MetaMask
          setIsMetamaskInstalled(true)
          setIsConnected(false)
          toast.info("Please connect to MetaMask")
        } else if (chainId !== targetChainId) {
          // User is connected to MetaMask but not on the right chain
          setIsMetamaskInstalled(true)
          setIsConnected(false)
          setIsOnRightChain(false)
          toast.info("Please connect to the DogeChain")
          switchChain(targetChainId)
        } else {
          // User is connected to MetaMask and on the right chain
          setIsConnected(true)
          setIsMetamaskInstalled(true)
          setIsOnRightChain(true)
        }
      })()
    }
  }, [status, chainId])

  return {
    isMetamaskInstalled,
    isOnRightChain,
    isConnected,
  }
}
export default useCheckConnection
