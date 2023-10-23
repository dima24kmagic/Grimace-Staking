import { useEffect, useState } from "react";
import { useWeb3Context } from "@/app/hooks/useWeb3";
import { toast } from "react-toastify";

export interface IBid {
  id: string;
  amount: number | BigInt;
  address: string;
  timestamp: number;
}

const useBidsHistory = (tokenId: number) => {
  const { nftContract } = useWeb3Context();

  const [isLoading, setIsLoading] = useState(true);
  const [bidsHistory, setBidsHistory] = useState<IBid[]>([]);

  useEffect(() => {
    const fetchBidsHistory = async () => {
      try {
        setIsLoading(true);
        const bids = await getBidsHistory({ nftContract, tokenId });
        setBidsHistory(bids);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch bids history:", error);
        toast.error("Failed to get bids history");
        setIsLoading(false);
      }
    };

    if (tokenId !== null && nftContract) {
      fetchBidsHistory();
    }
  }, [nftContract, tokenId]);

  const getBidsHistory = async ({ nftContract, tokenId }) => {
    const bids = await nftContract.methods.getBidHistory(tokenId).call();
    const parsedBids: IBid[] = bids.map(
      (bid, index) =>
        ({
          id: index,
          amount: Number(bid.bidAmount),
          address: bid.bidder,
          timestamp: Number(bid.timestamp),
        } as IBid)
    );
    parsedBids.reverse();
    return parsedBids;
  };

  // Function to push a new bid to the bids history state
  const pushBid = (bid: IBid) => {
    setBidsHistory((prevBids) => [bid, ...prevBids]);
  };

  return {
    isLoading,
    bidsHistory,
    pushBid,
  };
};

export default useBidsHistory;
