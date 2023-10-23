"use client";

import styled from "@emotion/styled";
import CollectionGrid from "@/components/CollectionGrid";
import React from "react";
import nft1 from "../../../public/eternal-supreme-ultradegen.jpg";
import nft2 from "../../../public/vip-degen-highest-caste.jpg";
import nft3 from "../../../public/revered-guardian-of-the-odyssey.jpg";
import nft4 from "../../../public/believer-diamond-degen.jpg";
import nft5 from "../../../public/golden-degen-dick.jpg";
import nft6 from "../../../public/silver-soldier-of-the-odyssey.jpg";
import Image from "next/image";
import Link from "next/link";
import useCheckConnection from "../hooks/useCheckConnection";
import { useRealUser } from "@/app/layout";

export const collectionPreviewItems = [
  {
    imageSrc: nft1,
    urlSlug: "eternal-supreme-ultradegen",
    description: `This NFT you're looking at? Just a taste of our dope future collections. Ain't like anything you've ever copped before. We're not about the basic monkey pics, dog doodles, rock replicas, or any of that nonsense. Nah, this one right here, with some patience and a bit of luck, you got a chance to bag yourself a hefty chunk of coin. You gotta hustle though, gotta find and piece together a seed phrase from a wallet that's got your reward. Count starts from the top left corner to the top right and then from left to right. Got queries? Slide into @TradeGuardian's DMs.
<br>The first NFT comes with 12 spots where you could stumble across some more locations. Some are ghost towns, but some might hold a part of your seed phrase. The game starts from noon and goes clockwise. When you finally get to the right place, you'll find an Odyssey, and somewhere nearby will be your seed word. Remember, though, these spots might be empty, but there's definitely a word in the area, so stay sharp and patient. There's no trickery, no lottery, no scam – everyone who buys in is getting their prize, no doubt about it. Plus, this NFT's got a hidden CODE for a super prize, exclusive to this piece alone. Good luck, folks!`,
    collection: "Eternal Supreme UltraDegen",
  },
  {
    imageSrc: nft2,
    urlSlug: "vip-degen-highest-caste",
    description: `This NFT you're looking at? Just a taste of our dope future collections. Ain't like anything you've ever copped before. We're not about the basic monkey pics, dog doodles, rock replicas, or any of that nonsense. Nah, this one right here, with some patience and a bit of luck, you got a chance to bag yourself a hefty chunk of coin. You gotta hustle though, gotta find and piece together a seed phrase from a wallet that's got your reward. Count starts from the top left corner to the top right and then from left to right. Got queries? Slide into @TradeGuardian's DMs.
<br>Our second NFT in the collection? It's a smidge simpler but just as dope. You gotta search high and low, 'cause words can pop up in the most unexpected spots! Good luck, y'all!`,
    collection: "VIP-Degen Highest Caste",
  },
  {
    imageSrc: nft3,
    urlSlug: "revered-guardian-of-the-odyssey",
    description: `This NFT you're looking at? Just a taste of our dope future collections. Ain't like anything you've ever copped before. We're not about the basic monkey pics, dog doodles, rock replicas, or any of that nonsense. Nah, this one right here, with some patience and a bit of luck, you got a chance to bag yourself a hefty chunk of coin. You gotta hustle though, gotta find and piece together a seed phrase from a wallet that's got your reward. Count starts from the top left corner to the top right and then from left to right. Got queries? Slide into @TradeGuardian's DMs.
<br>
Our third NFT in the collection ain't no walk in the park either. Gonna need your full attention, but the reward? Gonna make all that time you spent worth it. Plus, for the eagle-eyed out there, there's a little something hidden away. Good luck, peeps!`,
    collection: "Revered Guardian of the Odyssey",
  },
  {
    imageSrc: nft4,
    urlSlug: "believer-diamond-degen",
    description: `This presented NFT is like a trial run for future unique collections. These NFTs ain't like anything you've ever copped before. Ain't no monkey pics, dogs, rocks or any of that useless stuff you got. Here, with some patience and a slice of luck, you got a shot to stack some serious coins. You gotta hustle to find and piece together the seed phrase from the wallet that's holding your reward. The count starts from the top left corner to the top right and then from left to right.
For any questions, buyers can slide into the DMs of @TradeGuardian.
<br>
The fourth NFT in our collection is no less fresh than the ones before. You gotta scour every nook and cranny and nab all the words of the seed phrase to bag that much-coveted reward. Sometimes, you might feel like you've slipped up - and you'd be right on the money, keep searching!`,
    collection: "Believer Diamond Degen",
  },
  {
    imageSrc: nft5,
    urlSlug: "golden-degen-dick",
    description: `The NFT we're presenting here is like a sneak peek at some mad unique collections coming up. These NFTs ain't your usual buy, ain't no monkey pics, dogs, rocks or any other trash you usually deal with. Here, with some patience and a bit of luck, you got the chance to rake in some heavy coin. You're gonna have to hustle to find and piece together the seed phrase from the wallet where your prize is chillin'. Count starts from top left corner to top right and then from left to right.
For any queries, buyers can holla at @TradeGuardian.
<br>
The fifth NFT in our collection might be a bit less of a brain-bender, but don't think that makes it any less tempting in terms of reward and curiosity. You still gotta work for it to snag that hefty prize. Good luck!`,
    collection: "Golden Degen Dick",
  },
  {
    imageSrc: nft6,
    urlSlug: "silver-soldier-of-the-odyssey",
    description: `This NFT we're serving up is like a trial run of some epic unique collections to come. These NFTs ain't like anything you've ever copped. Ain't no monkey pics, dogs, rocks or any other fluff you usually get. Here, with a bit of patience and some good ol' luck, you got a chance to stack up some serious coin. You gotta hustle to find and piece together the seed phrase from the wallet, where your reward is just sitting tight. The count starts from the top left corner to the top right and then from left to right.
For any questions, buyers can ping @TradeGuardian.
<br>
The final NFT in our collection is one with a twist. Besides the seed phrase, there's something else hidden in there, so keep your eyes peeled. After you find the phrase, take a hot minute, maybe your NFT has a juicy bonus in there. It ain't as easy as it looks at first glance, so keep your game tight! Good luck!`,
    collection: "Silver Soldier of the Odyssey",
  },
];

export default function CollectionPage() {
  useCheckConnection();
  return (
    <>
      <title>Collection</title>
      <H1>Browse Collection</H1>
      <CollectionGrid>
        {collectionPreviewItems.map(({ imageSrc, urlSlug }, i) => (
          <Link href={`/collection/${urlSlug}`} key={urlSlug}>
            <PlaceholderItem
              src={imageSrc}
              key={i}
              alt={urlSlug}
              placeholder="blur"
            />
          </Link>
        ))}
      </CollectionGrid>
    </>
  );
}

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 24px;
  padding-left: 24px;
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

  &:hover {
    cursor: pointer;
    background: var(--color-purple);
    opacity: 0.9;
    transform: scale(1.05);
  }
`;
