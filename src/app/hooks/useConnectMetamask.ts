import { useMetaMask } from "metamask-react";

export const useConnectMetamask = () => {
  const { connect, account } = useMetaMask();
  const handleConnect = async () => {
    if(account) return;

    await connect().catch(() => {
      return alert("Please connect metamask to continue using application");
    });
  };

  return { handleConnect };
};
