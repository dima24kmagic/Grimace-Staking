import { createContext, useContext, useEffect, useState } from "react"
import { Contract, ethers } from "ethers"

import { useMetaMask } from "metamask-react"
import { toast } from "react-toastify"
import useBalance from "./useBalance"
import TokenContract from "@/contracts/TokenETH.json"
import StackingContract from "@/contracts/Stacking.json"

const EthersContext = createContext<{
    ethers: any
    stackingContract: Contract | null
    tokenContract: Contract | null
    tokenContractAddress: string | null
    stackingContractAddress: string | null
}>({
  ethers,
    stackingContract: null,
    tokenContract: null,
    tokenContractAddress: null,
    stackingContractAddress: null,
})

const EthersProvider = ({ children }) => {
  const [stackingContract, setStackingContract] = useState<Contract | null>(null)
  const [tokenContract, setTokenContract] = useState<Contract | null>(null)
  const { account } = useMetaMask()
  const { updateBalance } = useBalance()

  const setContractInstances = (provider: any) => {
    const stackingContractInstance = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)
    setStackingContract(stackingContractInstance)
    
    const tokenContractInstance = new Contract(process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!, TokenContract.abi, provider)
    setTokenContract(tokenContractInstance)
  }

  const registerEventHandlers = () => {
    const wsProvider = new ethers.WebSocketProvider(process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT!)
    const stackingContractInstance = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, wsProvider)

    stackingContractInstance.on("NewDeposit", (address, plan, amount) => {
      if (account && account.toLowerCase() === address.toLowerCase()) {
        toast.info(`${ethers.formatEther(amount)} GRIMACE successfully deposited`)
        //updateBalance()
      }
    })
  }

  const initialize = async () => {
    if (!window.ethereum) {
      return
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    setContractInstances(provider)

    if (!account) {
      return
    }
    
    const signer = await provider.getSigner()
    setContractInstances(signer)
    registerEventHandlers()
  }

  useEffect(() => {
    initialize() 
  }, [account])

  return (
    <EthersContext.Provider
      value={{
        ethers,
        stackingContract,
        tokenContract,
        tokenContractAddress:
          process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ?? null,
        stackingContractAddress:
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? null,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}

const useEthersContext = () => {
  const {
    ethers,
    stackingContract,
    tokenContract,
    tokenContractAddress,
    stackingContractAddress,
  } = useContext(EthersContext)

  return {
    ethers,
    stackingContract,
    tokenContract,
    tokenContractAddress,
    stackingContractAddress,
  }
}

export { EthersProvider, useEthersContext }