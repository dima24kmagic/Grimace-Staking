import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

// import GrimaceMandalasNFT from "@/nftArtifacts/GrimaceMandalaNFT.json";
// import TokenETH from "@/nftArtifacts/TokenETH.json";

const GrimaceMandalasNFT = {};
const TokenETH = {};

// Create a type for the contract methods
type TokenContractMethods = {
  [methodName: string]: (...args: any[]) => Promise<any>;
};

const Web3Context = createContext({
  web3: null,
  nftContract: null,
  tokenContract: null,
  tokenContractAddress: null,
  nftContractAddress: null,
  isRealUser: null,
  setIsRealUser: null,
  signature: "",
  setSignature: null,
});

const Web3Provider = ({ children }) => {
  const [isRealUser, setIsRealUser] = useState(false);
  const [signature, setSignature] = useState("");

  const [web3, setWeb3] = useState(null);
  const [nftContract, setnftContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const nftContractAbi: AbiItem[] = GrimaceMandalasNFT.abi;
        const nftContractInstance = new web3Instance.eth.Contract(
          GrimaceMandalasNFT.abi,
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        setnftContract(nftContractInstance);

        const tokenEthABI: AbiItem[] = TokenETH.abi;
        const tokenContractInstance = new web3Instance.eth.Contract(
          TokenETH.abi,
          process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS
        );

        setTokenContract(tokenContractInstance);
      }
    };

    initializeWeb3();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        nftContract,
        tokenContract,
        tokenContractAddress: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
        nftContractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        isRealUser,
        setIsRealUser,
        signature,
        setSignature,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = () => {
  const {
    web3,
    nftContract,
    tokenContract,
    tokenContractAddress,
    nftContractAddress,
    isRealUser,
    setIsRealUser,
    signature,
    setSignature,
  } = useContext(Web3Context);

  return {
    web3,
    nftContract,
    tokenContract,
    tokenContractAddress,
    nftContractAddress,
    isRealUser,
    setIsRealUser,
    signature,
    setSignature,
  };
};

export { Web3Provider, useWeb3Context };
