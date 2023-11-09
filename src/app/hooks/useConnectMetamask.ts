import { useMetaMask } from "metamask-react";
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { useEffect } from "react";
import { setAccountAddress } from "../store/accountState";
import { toast } from "react-toastify";
import useCheckConnection from "./useCheckConnection";

export const useConnectMetamask = () => {
  const { connect, account } = useMetaMask();
  const dispatch = useAppDispatch();
  const {isConnected, isOnRightChain, isMetamaskInstalled} = useCheckConnection()

  useEffect(() => {
    if(isOnRightChain && isConnected && isMetamaskInstalled)
      dispatch(setAccountAddress(account));
  }, [account, isConnected, isOnRightChain, isMetamaskInstalled]);

  const handleConnect = async () => {
    if(account) return;

    await connect().catch(() => {
      toast.error("Please connect metamask to continue using application")
    });
  };

  return { handleConnect };
};
