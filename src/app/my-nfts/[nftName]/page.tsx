"use client";
import { useParams } from "next/navigation";
import ZoomableImageBox from "@/components/ZoomableImageBox";
import styled from "@emotion/styled";
import { useMetaMask } from "metamask-react";
import { useNFTMetadata } from "@/app/hooks/useNFTMetadata";
import { useRealUser } from "@/app/hooks/useRealUser";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  width: 100%;
`;

const StyledName = styled.div`
  font-size: 54px;
  font-weight: 900;
  margin: 0 auto;
  margin-bottom: 22px;
  text-align: center;
`;

const StyledZoomableImageWrapper = styled.div``;

export default function MyNFTPage(props) {
  const { nftName } = useParams();
  const { account } = useMetaMask();
  const { nftTokens, isLoading } = useNFTMetadata(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  const { isRealUser } = useRealUser();
  if (!isRealUser) {
    return "Need to verify address";
  }

  if (!account) {
    return (
      <StyledWrapper>
        <title>NFT Preview</title>Please connect to metamask
      </StyledWrapper>
    );
  }
  if (isLoading) {
    return (
      <StyledWrapper>
        <title>NFT Preview</title>Checking ownership on blockchain
      </StyledWrapper>
    );
  }

  const nftToken = nftTokens.find(({ urlSlug }) => urlSlug === nftName);
  if (nftTokens.length > 0 && nftToken) {
    return (
      <StyledWrapper>
        <title>
          {nftToken.collection} {nftToken.id}
        </title>
        <StyledName>
          {nftToken.collection} {nftToken.id}
        </StyledName>
        <ZoomableImageBox width={800} height={600} nftID={nftToken.id} />
      </StyledWrapper>
    );
  }
  return (
    <StyledWrapper>
      <title>NFT Preview</title>You don&apos;t have access to this NFT
    </StyledWrapper>
  );
}
