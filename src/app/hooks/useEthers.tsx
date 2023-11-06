import { createContext, useContext, useEffect, useState } from "react"
import { Contract, ethers } from "ethers"

import StackingContract from "@/contracts/Stacking.json"
import TokenContract from "@/contracts/TokenETH.json"
import { useMetaMask } from "metamask-react"

const EthersContext = createContext<{
    ethers: any
    stackingContract: Contract | null
    tokenContract: Contract | null
    tokenContractAddress: string | null
    stackingContractAddress: string | null
}>({
    ethers: ethers,
    stackingContract: null,
    tokenContract: null,
    tokenContractAddress: null,
    stackingContractAddress: null,
})

const EthersProvider = ({ children }) => {
  const [stackingContract, setStackingContract] = useState<Contract | null>(null)
  const [tokenContract, setTokenContract] = useState<Contract | null>(null)
  const { account } = useMetaMask()

  const setContractInstances = (provider : any) => {
    const stackingContractInstance = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)
    setStackingContract(stackingContractInstance)
    
    const tokenContractInstance = new Contract(process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!, TokenContract.abi, provider)
    setTokenContract(tokenContractInstance)        
  }

  useEffect(() => {
    const initialize = async () => {
      if (window?.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)

        if(!account){
          setContractInstances(provider)
          return
        }

        const signer = await provider.getSigner()
        setContractInstances(signer)
      }
    }

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
