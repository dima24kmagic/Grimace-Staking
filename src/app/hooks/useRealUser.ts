import { useWeb3Context } from "@/app/hooks/useWeb3";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { verifyMessage } from "ethers";

export const SIGNATURE_MESSAGE = "Sign this message to prove NFT hold";
export const useRealUser = () => {
  const { isRealUser, setIsRealUser, setSignature, signature } =
    useWeb3Context();
  const { account, ethereum } = useMetaMask();
  useEffect(() => {
    (async () => {
      try {
        if (account) {
          if (!signature) {
            const messageToSign = SIGNATURE_MESSAGE;
            const signature = await ethereum.request({
              method: "personal_sign",
              params: [messageToSign, account],
            });
            const actualAddress = verifyMessage(messageToSign, signature);
            setIsRealUser(
              actualAddress.toLowerCase() === account.toLowerCase()
            );
            setSignature(signature);
          }
        }
      } catch (e) {
        setIsRealUser(false);
        console.log(e);
        throw new Error("Cant verify address");
      }
    })();
    if (window?.ethereum?.isImpersonator) {
      setIsRealUser(false);
    }
  }, [account]);

  return { isRealUser };
};
