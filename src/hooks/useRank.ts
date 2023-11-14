import { useEffect, useState } from "react";

const useRank = () => {
    const [rankData, setRankData] = useState<Array<any>>([])

    const updateRank = async () => {
        var response = await fetch('/api/rank')
        setRankData(await response.json())
    }

    useEffect(() => {updateRank()}, [])

    return { updateRank, rankData };
};

export default useRank