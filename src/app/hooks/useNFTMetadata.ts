import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { useWeb3Context } from "@/app/hooks/useWeb3";

interface ITokenMetadata {
  web3Id: any;
  id: string;
  imageSrc: string;
  urlSlug: string;
  title?: string;
  collection?: string;
  description?: string;
}

export const collectionNameToURLSlug = (collection: string) => {
  return collection.toLowerCase().replace(/\s+/g, "-");
};

// TODO: Set contract address from proccess.env.NEXT_PUBLIC_CONTRACT_ADDRESS
export const useNFTMetadata = (): {
  nftTokens: ITokenMetadata[];
  isLoading: boolean;
} => {
  const { web3, tokenContract, nftContract } = useWeb3Context();
  const [nftTokens, setNFTTokens] = useState<ITokenMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useMetaMask();

  const checkTokens = async () => {
    try {
      if (!account) {
        alert("Please connect metamask to check your collection");
        return;
      }
      setIsLoading(true);
      // Call the balanceOf function to get the number of tokens owned by the account
      const balance = await nftContract.methods.balanceOf(account).call();

      // Retrieve the metadata URI for each token
      const tokens: ITokenMetadata[] = [];
      const fetchPromises = [];
      for (let i = 0; i < balance; i++) {
        fetchPromises.push(
          new Promise(async (resolve, rej) => {
            try {
              const tokenId = await nftContract.methods
                .tokenOfOwnerByIndex(account, i)
                .call();
              const tokenURI = (await nftContract.methods
                .tokenURI(tokenId)
                .call()) as string;
              const nftID = tokenURI?.split("/")?.pop();
              const res = await fetch(`/api/metadata/${nftID}`);
              const nftMetadata = await res.json();
              tokens.push({
                ...nftMetadata,
                web3Id: tokenId,
                urlSlug:
                  collectionNameToURLSlug(nftMetadata.collection) +
                  "-" +
                  nftMetadata.id,
              });
              resolve();
            } catch (e) {
              rej(e);
            }
          })
        );
      }

      await Promise.all(fetchPromises);
      tokens.sort((a, b) => a.id - b.id);

      setNFTTokens(tokens);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking NFT tokens:", error);
    }
  };

  useEffect(() => {
    (async () => {
      if (account) {
        await checkTokens();
      }
      if (!account) {
        setIsLoading(false);
      }
    })();
  }, [account]);

  return { nftTokens, isLoading };
};
