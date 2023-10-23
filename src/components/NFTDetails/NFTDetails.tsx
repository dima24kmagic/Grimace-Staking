import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import Image from "next/image";
import useTimeLeft from "@/app/hooks/useTimeLeft";
import { useMetaMask } from "metamask-react";
import { Spinner } from "@/app/collection/[collectionID]/[nftID]/page";
import { keyframes } from "@emotion/css";
import Countdown from "../Countdown/Countdown";
import BidsHistory from "../BidsHistrory/BidsHistory";
import { IBid } from "@/app/hooks/useAuction/useBidsHistory";
import { IBlockchainAuctionData } from "@/app/hooks/useAuction/useAuctionDetails";
import ProgressLoader from "@/components/ProgressLoader";
import { useRemainingTime } from "@/app/page";
import { useWeb3Context } from "@/app/hooks/useWeb3";

export type NFTDetailsProps = {
  isBidsLoading: boolean;
  bidsHistory: IBid[];
  isPendingBid: boolean;
  onPlaceBidClick: () => void;
  nftItem: {
    metadata: {
      id: string;
      collection: string;
      name: React.ReactNode;
      subheading: React.ReactNode;
      description: React.ReactNode;
      buyHref: string;
      buyGrimaceHref: string;
      imageSrc: string;
    };
    blockchainData: IBlockchainAuctionData;
  };
};

function formatAddress(address) {
  const prefix = address.slice(0, 2);
  const firstFour = address.slice(2, 6);
  const lastFour = address.slice(-4);

  return `${prefix}${firstFour}...${lastFour}`;
}

export const formatBidAmountToDecimals = (bidAmount: BigInt = BigInt(0)) => {
  // Divide the bidAmount by 10^18 and round it to 3 decimal places
  const currentBid = Number(
    (Number(bidAmount) / Number(10n ** 18n)).toFixed(5)
  );
  return currentBid.toString();
};

function NFTDetails({
  nftItem,
  onPlaceBidClick,
  isPendingBid,
  isBidsLoading,
  bidsHistory,
}: NFTDetailsProps) {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const { metadata, blockchainData } = nftItem;
  const { account } = useMetaMask();
  const { id, collection, name, buyGrimaceHref, imageSrc, description } =
    metadata;
  const {
    initialPrice,
    highestBidder,
    highestBid,
    bidStep,
    timeLeftForAuction,
    endTime,
  } = blockchainData;
  const isReleased = Number(initialPrice) !== 0;
  const { minutes, seconds, hours } = useTimeLeft(timeLeftForAuction);
  const { dd, hh, mm } = useRemainingTime(timeLeftForAuction.toISOString());

  const isHighestBidder =
    account?.toLowerCase() == highestBidder?.toLowerCase();

  const isEnded =
    Number(endTime) === 0 || isNaN(Number(endTime))
      ? false
      : Number(endTime) <= Math.floor(new Date().getTime() / 1000);
  const formattedHighestBid = formatBidAmountToDecimals(highestBid);
  const formattedInitialPrice = formatBidAmountToDecimals(initialPrice);
  const currentBid = () =>
    Number(formattedHighestBid) > Number(formattedInitialPrice)
      ? formattedHighestBid
      : formattedInitialPrice;
  return (
    <>
      <Root>
        <div style={{ position: "relative" }}>
          {isImgLoading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <StyledNFTSkeleton height={500} width={500} />
            </div>
          ) : null}
          <NFTImage
            src={imageSrc}
            alt={typeof name === "string" ? name : "NFT"}
            width={500}
            height={500}
            onLoad={() => setIsImgLoading(false)}
          />
        </div>

        <Content>
          <Name>
            {collection} {id}
          </Name>
          <Subheading>
            {isReleased
              ? isEnded
                ? "Auction Ended"
                : "Auction started"
              : "Wait for auction"}
          </Subheading>
          <Buttons>
            <Button
              buttonType="filled"
              onClick={onPlaceBidClick}
              disabled={
                !isReleased || isHighestBidder || isPendingBid || isEnded
              }
              title={
                !isReleased ? "Wait until auction" : "Link to NFT Marketplace"
              }
            >
              Place Bid
              {isPendingBid && (
                <Spinner
                  marginLeft="4px"
                  borderWidth="3px"
                  marginBottom="2px"
                  width={20}
                  height={20}
                />
              )}
            </Button>
            <Button
              href={buyGrimaceHref}
              buttonType="outlined"
              target={"__blank"}
              title={buyGrimaceHref}
            >
              Buy Grimace
            </Button>
          </Buttons>

          {isReleased && !isEnded && (
            <>
              <BidsContainer>
                <Bid>
                  {Number(highestBid) === 0 ? (
                    <>
                      Initial Price:{" "}
                      <span style={{ fontSize: "1.5rem" }}>
                        {formatBidAmountToDecimals(initialPrice)}
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      Current bid:{" "}
                      <span style={{ fontSize: "1.5rem" }}>{currentBid()}</span>{" "}
                    </>
                  )}

                  <span style={{ fontSize: "0.9rem" }}>$GRIMACE</span>
                </Bid>
                <Bid>
                  Min Bid Step:{" "}
                  <span style={{ fontSize: "1.2rem" }}>
                    {formatBidAmountToDecimals(bidStep)}
                  </span>{" "}
                  <span style={{ fontSize: "0.9rem" }}>$GRIMACE</span>
                </Bid>
              </BidsContainer>
              <TimeLeftContainer>
                <TimeLeft>Time Left:</TimeLeft>
                <Countdown
                  num1="42"
                  num2="04"
                  num3="20"
                  gap={3}
                  fontSize={60}
                  label1="Days"
                  label2="Hours"
                  label3="Minutes"
                />
              </TimeLeftContainer>
            </>
          )}
        </Content>
      </Root>
      <DescriptionTitle>Description</DescriptionTitle>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
      {isReleased && !isBidsLoading && bidsHistory?.length > 0 && (
        <BidsHistory allBids={bidsHistory} />
      )}
      <ProgressLoader />
    </>
  );
}

const Root = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 992px) {
    max-width: 500px;
    flex-direction: column;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    max-width: 400px;
    flex-direction: column;
    margin: 0 auto;
  }
  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const NFTImage = styled(Image)`
  height: auto;
  object-fit: cover;
  max-width: min(500px, 100%);
  max-height: max(400px, 80vh);
  border-radius: 24px;

  @media (max-width: 992px) {
    margin: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  flex: 1;
  text-align: right;
  padding: 0 50px;
  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  margin-top: 0;
  @media (max-width: 992px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Subheading = styled.h3`
  margin-top: 12px;
`;
const DescriptionTitle = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 2rem;
`;
const Description = styled.p`
  margin-top: 18px;
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 992px) {
    max-width: 500px;
  }
  @media (max-width: 600px) {
    max-width: 400px;
  }
  @media (max-width: 480px) {
    max-width: 300px;
  }
`;
const BidsContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;
const Bid = styled.p`
  margin-bottom: 4px;
  margin-right: 4px;
  // display: inline-block;
  font-size: 1.2rem;
  span {
    display: inline-block;
    color: #ac6cff;
  }
`;
const TimeLeftContainer = styled.div`
  width: 377px;
`;
const TimeLeft = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  text-align: left;
  margin-bottom: 8px;
`;

const Buttons = styled.div`
  gap: 24px;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  @media (max-width: 992px) {
    justify-content: space-between;
    gap: 16px;
    margin: 16px 0;
  }

  & > * {
    width: 100%;
  }
`;
const load = keyframes`
  to {
    // Move shine from left to right, with offset on the right based on the width of the shine - see background-size
    background-position: right -40px top 0;
  }
`;
const StyledNFTSkeleton = styled.div`
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  // The skeleton itself will be a light gray
  background-color: #ddd;
  // The shine that's going to move across the skeleton:
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0)
  );
  background-size: 40px 100%; // width of the shine
  background-repeat: no-repeat; // No need to repeat the shine effect
  // Place shine on the left side, with offset on the left based on the width of the shine - see background-size
  background-position: left -40px top 0;
  animation: ${load} 1s ease infinite; // increase animation time to see effect in 'slow-mo'
  border-radius: 12px;
`;
export default NFTDetails;
