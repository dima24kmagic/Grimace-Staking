import React, { createContext, useContext, useState } from "react";
import styled from "@emotion/styled";

interface ITransactionMessage {
  preAcceptMessage?: string;
  message?: string;
  hash?: string;
}

interface ProgressLoaderTypes {
  isProcessingTransaction: boolean;
  transactionMessage?: ITransactionMessage;
  handleWaitTransaction: ({
    transaction,
    isProcessing,
  }: {
    transaction: ITransactionMessage;
    isProcessing: boolean;
  }) => void;
}

const ProgressLoaderContext = createContext({
  isProcessingTransaction: false,
  transactionMessage: null,
} as ProgressLoaderTypes);

export const ProgressLoaderProvider = ({ children }) => {
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [transactionMessage, setTransactionMessage] =
    useState<ITransactionMessage>({ hash: "", message: "" });

  const handleWaitTransaction = ({ transaction, isProcessing }) => {
    setIsProcessingTransaction(isProcessing);
    setTransactionMessage(transaction);
  };

  return (
    <ProgressLoaderContext.Provider
      value={{
        isProcessingTransaction,
        transactionMessage,
        handleWaitTransaction,
      }}
    >
      {children}
    </ProgressLoaderContext.Provider>
  );
};

export const useProgressLoader = () => {
  const { isProcessingTransaction, handleWaitTransaction, transactionMessage } =
    useContext(ProgressLoaderContext);

  return { isProcessingTransaction, transactionMessage, handleWaitTransaction };
};

export interface ILoadingStateProps {}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  padding: 32px 64px;
  backdrop-filter: blur(5px);
`;

export const Text = styled.p`
  word-break: break-word;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ textAlign }) => textAlign};
`;
export const Spinner = styled.div`
  display: inline-block;
  width: ${({ width }) => (width ? width + "px" : "80px")};
  height: ${({ height }) => (height ? height + "px" : "80px")};
  border: ${({ borderWidth }) => borderWidth || "4px"} solid #f3f3f3;
  border-top: ${({ borderWidth }) => borderWidth || "4px"} solid #9747ff;
  margin-bottom: ${({ marginBottom }) => marginBottom || "8px"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Loading screen
 */
function ProgressLoader(props: ILoadingStateProps) {
  const { isProcessingTransaction, transactionMessage } = useProgressLoader();

  if (!isProcessingTransaction) {
    return <></>;
  }
  return (
    <StyledWrapper>
      {!transactionMessage?.hash && (
        <Text
          textAlign="center"
          color="white"
          marginBottom="10px"
          fontWeight="100"
        >
          {transactionMessage?.preAcceptMessage}
        </Text>
      )}
      {transactionMessage?.hash && (
        <Text
          textAlign="center"
          color="white"
          marginBottom="8px"
          fontWeight="100"
        >
          txHash: {transactionMessage?.hash}
        </Text>
      )}
      <Text
        color="white"
        marginBottom="8px"
        fontSize="32px"
        fontWeight="100"
        textAlign="center"
      >
        {transactionMessage?.message}
      </Text>
      <Spinner height="50" width="50" />
    </StyledWrapper>
  );
}

export default ProgressLoader;
