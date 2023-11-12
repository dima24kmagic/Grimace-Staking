import { createContext, useContext, useEffect, useState } from "react"
import type { Contract } from "web3"
import Web3 from "web3"

import StackingContract from "@/contracts/Stacking.json"
import TokenContract from "@/contracts/TokenETH.json"

const Web3Context = createContext<{
  web3: Web3 | null
  stackingContract: Contract<typeof StackingContract.abi> | null
  tokenContract: Contract<typeof TokenContract.abi> | null
  tokenContractAddress: string | null
  stackingContractAddress: string | null
}>({
  web3: null,
  stackingContract: null,
  tokenContract: null,
  tokenContractAddress: null,
  stackingContractAddress: null,
})

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [stackingContract, setStackingContract] = useState<Contract<
    typeof StackingContract.abi
  > | null>(null)
  const [tokenContract, setTokenContract] = useState<Contract<
    typeof TokenContract.abi
  > | null>(null)

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window?.ethereum) {
        const web3Instance = new Web3(window?.ethereum)
        setWeb3(web3Instance)

        const stackingContractABI = StackingContract?.abi
        const stackingContractInstance = new web3Instance.eth.Contract(
          stackingContractABI,
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        )
        setStackingContract(stackingContractInstance)

        const tokenContractABI = TokenContract.abi
        const tokenContractInstance = new web3Instance.eth.Contract(
          tokenContractABI,
          process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
        )

        setTokenContract(tokenContractInstance)
      }
    }

    initializeWeb3()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        web3,
        stackingContract,
        tokenContract,
        tokenContractAddress:
          process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ?? null,
        stackingContractAddress:
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? null,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

const useWeb3Context = () => {
  const {
    web3,
    stackingContract,
    tokenContract,
    tokenContractAddress,
    stackingContractAddress,
  } = useContext(Web3Context)

  return {
    web3,
    stackingContract,
    tokenContract,
    tokenContractAddress,
    stackingContractAddress,
  }
}

export { Web3Provider, useWeb3Context }
