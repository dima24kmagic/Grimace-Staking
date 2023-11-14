import { EventLog, Contract, ethers } from "ethers"
import StackingContract from "@/contracts/Stacking.json"
import { NextResponse } from "next/server"
import cache from "memory-cache"

const cashKey = 'rank'
const startBlock = Number.parseInt(process.env.NEXT_PUBLIC_START_BLOCK ?? '-10000')
 
export async function GET(req) {
  const cachedResult = cache.get(cashKey)
  if(cachedResult){
    return NextResponse.json(cachedResult, { status: 200 });
  }

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT)
  const stackingContract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)
  const newbieEvents = await stackingContract.queryFilter(stackingContract.filters.Newbie, startBlock)

  const result = new Array<any>()

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
          negativeDividentsTotal: ethers.formatEther(negativeDividentsTotal),
          negativeDividentsTotalNumber: Number.parseFloat(ethers.formatEther(negativeDividentsTotal))
      })
  }

  result.sort(( a, b ) => { return b.negativeDividentsTotalNumber - a.negativeDividentsTotalNumber })

  var index = 1;
  result.forEach((i) => {
    i.number = index++
  })

  cache.put(cashKey, result)
  
  return NextResponse.json(result, { status: 200 });
}