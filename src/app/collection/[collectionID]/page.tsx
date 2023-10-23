"use client";
import { useParams } from "next/navigation";
import React from "react";
import { collectionPreviewItems } from "@/app/collection/page";
import styled from "@emotion/styled";
import CollectionGrid from "@/components/CollectionGrid/CollectionGrid";
import Link from "next/link";
import Image from "next/image";
//@ts-ignore
import nftsMetadata from "/public/NFTsMetadata.json";
import { LoadingSpinner, Spinner } from "./[nftID]/page";
import useHighestBids from "@/app/hooks/useHighestBids";
import useCheckConnection from "@/app/hooks/useCheckConnection";
import { useRealUser } from "@/app/layout";

export default function NFTPage() {
  const { isMetamaskInstalled } = useCheckConnection();

  const { collectionID } = useParams() as { collectionID: string };

  const previewItem = collectionPreviewItems.find(
    ({ urlSlug }) => urlSlug === collectionID
  );
  const nftsValues: any[] = Object.values(nftsMetadata).filter(
    ({ collection }: any) => collection === previewItem?.collection
  );

  const { newNfts, isLoading } = useHighestBids({ nftsValues });

  return (
    <>
      <title>{previewItem?.collection}</title>
      <H1>{previewItem?.collection}</H1>
      {isLoading ? (
        <LoadingSpinner width={300} height={300}>
          <Spinner />
          {isMetamaskInstalled ? "Loading NFTs" : "Awaiting for MetaMask..."}
        </LoadingSpinner>
      ) : (
        <CollectionGrid>
          {newNfts.map(
            ({ id, edition, highestBid, endTime, initialPrice }, i: number) => {
              const isEnded =
                Number(endTime) === 0 || isNaN(Number(endTime))
                  ? false
                  : Number(endTime) <= Math.floor(new Date().getTime() / 1000);

              return (
                <div style={{ position: "relative" }} key={i}>
                  <Link href={`/collection/${collectionID}/${id}`}>
                    <PlaceholderItem src={previewItem!.imageSrc} alt={id} />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <P>{edition}</P>
                    </div>
                    {!isEnded && (highestBid !== 0 || initialPrice !== 0) && (
                      <HighestBidContainer>
                        <HighBidP>
                          {highestBid >= initialPrice
                            ? highestBid
                            : initialPrice}{" "}
                          $GRIMACE
                        </HighBidP>
                      </HighestBidContainer>
                    )}
                    {isEnded && (
                      <HighestBidContainer>
                        <HighBidP>SOLD</HighBidP>
                      </HighestBidContainer>
                    )}
                  </Link>
                </div>
              );
            }
          )}
        </CollectionGrid>
      )}
    </>
  );
}

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 24px;
  padding-left: 24px;
`;
const P = styled.p`
  color: #ac6cff;
  font-size: 32px;
  font-weight: 700;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  user-select: none;
`;

// #ac6cff but a bit darker for background color
const HighestBidContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 5%;
  background-color: #222222;
  border-radius: 12px;
  padding: 8px;
  width: fit-content;
  height: fit-content;
  transition: background 150ms ease-in-out, opacity 150ms ease-in-out,
    transform 150ms ease-in-out;
  border: 1px solid white;
  &:hover {
    transform: scale(1.05);
    // opacity: 0.9;
  }
`;
const HighBidP = styled.p`
  font-size: 19px;
  // text-shadow: -1px -1px 0 #ac6cff, 1px -1px 0 #ac6cff, -1px 1px 0 #ac6cff,
  //   1px 1px 0 #ac6cff;
  margin: 0 auto;
  color: #aa6cff;
  display: inline-block;
  user-select: none;
`;
// Placeholder item that fill the space of a cell
const PlaceholderItem = styled(Image)`
  background-color: #d9d9d9;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  transition: background 150ms ease-in-out, opacity 150ms ease-in-out,
    transform 150ms ease-in-out;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    cursor: pointer;
    background: var(--color-purple);
    opacity: 0.8;
    transform: scale(1.05);
  }
`;
