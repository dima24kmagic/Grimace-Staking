import type { EventLog, Log } from "ethers"
import { Contract, ethers } from "ethers"
import { NextResponse } from "next/server"
import cache from "memory-cache"
import StackingContract from "@/contracts/Stacking.json"

const cacheKey = "rank"
const blockLimit = Number.parseInt(process.env.NEXT_PUBLIC_BLOCK_LIMIT_FOR_EVENTS ?? "5000")
const startBlock = Number.parseInt(process.env.NEXT_PUBLIC_START_BLOCK ?? "-5000")

export async function DELETE() {
  cache.del(cacheKey)
  return NextResponse.json({}, { status: 200 })
}

export async function GET() {
  const cachedResult = cache.get(cacheKey)
  if (cachedResult) {
    return NextResponse.json(cachedResult, { status: 200 })
  }

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT)
  const stackingContract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)

  const newbieEvents = new Array<Log | EventLog>
  const currentBlockNumber = await provider.getBlockNumber()
  for (let index = startBlock; index <= currentBlockNumber; index += blockLimit) {
    const events = await stackingContract.queryFilter(stackingContract.filters.Newbie, index, index + blockLimit - 1)
    newbieEvents.push(...events)
  }

  const result = new Array<any>()

  for (const newbieEvent of newbieEvents) {
    const userAddress = (newbieEvent as EventLog).args[0]
    const depositsCount = await stackingContract.getUserAmountOfDeposits(userAddress)
    let negativeDividentsTotal = 0
    for (let depositIndex = 0; depositIndex < depositsCount; depositIndex++) {
      const negativeDividents = await stackingContract
        .getUserNegativeDividends(userAddress, depositIndex)

      negativeDividentsTotal += Number.parseFloat(negativeDividents)
    }

    result.push({
      address: userAddress,
      negativeDividentsTotal: ethers.formatEther(negativeDividentsTotal),
      negativeDividentsTotalNumber: Number.parseFloat(ethers.formatEther(negativeDividentsTotal)),
    })
  }

  result.sort((a, b) => {
    return b.negativeDividentsTotalNumber - a.negativeDividentsTotalNumber
  })

  let index = 1
  result.forEach((i) => {
    i.number = index++
  })

  cache.put(cacheKey, result)

  return NextResponse.json(result, { status: 200 })
}
