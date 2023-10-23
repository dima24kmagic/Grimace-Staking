import useAuctionDetails from "@/app/hooks/useAuction/useAuctionDetails";
import useAuctionPlaceBid from "@/app/hooks/useAuction/useAuctionPlaceBid";

const useAuction = ({ nftID }: { nftID: number }) => {
  const { auctionDetails, isLoading, setAuctionDetails } = useAuctionDetails({
    nftID,
  });
  const { isBidsLoading, isPendingBid, placeBid, bidsHistory } =
    useAuctionPlaceBid({
      nftID,
    });

  const handlePlaceBid = async () => {
    await placeBid(auctionDetails, setAuctionDetails);
  };

  return {
    isLoading,
    placeBid: handlePlaceBid,
    auctionDetails,
    isPendingBid,
    isBidsLoading,
    bidsHistory,
  };
};

export default useAuction;
