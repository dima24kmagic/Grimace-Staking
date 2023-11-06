import { useMetaMask } from "metamask-react";
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { useEffect } from "react";
import { setAccountAddress } from "../store/accountState";

export const useConnectMetamask = () => {
  const { connect, account } = useMetaMask();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAccountAddress(account));    
  }, [account]);

  const handleConnect = async () => {
    if(account) return;

    await connect().catch(() => {
      return alert("Please connect metamask to continue using application");
    });
  };

  return { handleConnect };
};
