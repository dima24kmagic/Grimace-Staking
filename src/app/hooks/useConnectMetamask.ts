import { useMetaMask } from "metamask-react";

export const useConnectMetamask = () => {
  const { connect } = useMetaMask();
  const handleConnect = async () => {
    await connect().catch(() => {
      return alert("Please connect metamask to continue using application");
    });
  };

  return { handleConnect };
};
