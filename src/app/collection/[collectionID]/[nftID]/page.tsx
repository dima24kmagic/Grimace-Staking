"use client";
import { useParams } from "next/navigation";
import NFTDetails from "@/components/NFTDetails";
import Container from "@/components/Container";
import React, { useEffect, useState } from "react";
import nftsMetadata from "/public/NFTsMetadata.json";
import styled from "@emotion/styled";
import useAuction from "@/app/hooks/useAuction";
import useCheckConnection from "@/app/hooks/useCheckConnection";
import { useRealUser } from "@/app/layout";

export default function NFTPage() {
  const { isMetamaskInstalled } = useCheckConnection();
  const { nftID } = useParams() as { nftID: string };
  const {
    isLoading: isAuctionLoading,
    auctionDetails,
    placeBid,
    isPendingBid,
    bidsHistory,
    isBidsLoading,
  } = useAuction({
    nftID: Number(nftID),
  });

  const nftItem = {
    metadata: {
      ...nftsMetadata?.[nftID],
      buyGrimaceHref: "https://www.mexc.com/exchange/GRIMACE_USDT",
    },
    blockchainData: auctionDetails,
  };
  return (
    <StyledRoot>
      {isAuctionLoading ? (
        <LoadingSpinner width={300} height={300}>
          <Spinner />
          {isMetamaskInstalled
            ? "Loading NFT"
            : "Awaiting for MetaMask installation..."}
        </LoadingSpinner>
      ) : (
        <NFTDetails
          bidsHistory={bidsHistory}
          isBidsLoading={isBidsLoading}
          isPendingBid={isPendingBid}
          onPlaceBidClick={placeBid}
          nftItem={nftItem}
        />
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled(Container)`
  padding-top: 32px;
`;
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  display: flex;
  margin-top: 32px;
  background: #a9a9a9;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
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
