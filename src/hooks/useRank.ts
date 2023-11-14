import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const useRank = () => {
    const accountAddress = useAppSelector(state => state.account.address)
    const [rankData, setRankData] = useState<Array<any>>([])
    const [myRankNumber, setMyRankNumber] = useState<number>(0)

    const updateRank = async () => {
        var response = await fetch('/api/rank')
        const result = await response.json()

        setRankData(result)
        return result
    }

    useEffect(() => {
        updateRank().then((rankData) => {
            if(!accountAddress || !rankData.length){
                return
            }
            
            const number = rankData.filter((item) => { return item.address.toLowerCase() === accountAddress.toLowerCase()})[0]?.number;
            
            if(number){
                setMyRankNumber(number)
            }
        })
    }, [accountAddress])

    return { updateRank, rankData , myRankNumber};
};

export default useRank