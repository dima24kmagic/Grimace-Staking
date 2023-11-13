import { EventLog, ethers } from "ethers";
import { useEthersContext } from "./useEthers";
import { useEffect, useState } from "react";

const useRank = () => {
    const { stackingContract } = useEthersContext()
    const [rankData, setRankData] = useState<Array<any>>([])

    const updateRank = async () => {
        if(!stackingContract || rankData.length) {
            return
        }

        console.log('ranks update')

        const result : Array<any> = []
        const newbieEvents = await stackingContract.queryFilter(stackingContract.filters.Newbie)

        for (const newbieEvent of newbieEvents) {
            const userAddress = (newbieEvent as EventLog).args[0]
            const depositsCount = await stackingContract.getUserAmountOfDeposits(userAddress)
            var negativeDividentsTotal = 0
            for (let depositIndex = 0; depositIndex < depositsCount; depositIndex++) {
                const negativeDividents = await stackingContract
                .getUserNegativeDividends(userAddress, depositIndex)

                negativeDividentsTotal += parseFloat(negativeDividents)
            }

            result.push({
                address: userAddress,
                negativeDividentsTotal: ethers.formatEther(negativeDividentsTotal)
            })
          }

        setRankData(result)
    }

    useEffect(() => {updateRank()}, [stackingContract])

    return { updateRank, rankData };
};

export default useRank