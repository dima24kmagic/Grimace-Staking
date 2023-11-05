import { useMetaMask } from "metamask-react";
import React, { useState, useEffect } from 'react';
import { useWeb3Context } from "@/app/hooks/useWeb3";

export const useAccountBalance = () => {
  const { account } = useMetaMask();
  const [balance, setBalance] = useState<String | null | undefined>(null);
  const { web3, tokenContract, stackingContract, tokenContractAddress } = useWeb3Context();

  useEffect(() => {
    const getBalance = async () => {
      if (!account) return;

      const balanceOf = tokenContract?.methods.balanceOf(account)

      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [
          {
            to: tokenContractAddress,
            data: balanceOf!.encodeABI(),
          },
          'latest',  // 'latest' for the latest block
        ],
      })

      setBalance(web3?.utils.fromWei(result, 'ether'))
    }

    getBalance();
  })

  return { balance };
};
