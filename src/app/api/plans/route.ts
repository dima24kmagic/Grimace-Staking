import type { EventLog } from "ethers"
import { Contract, ethers } from "ethers"
import { NextResponse } from "next/server"
import cache from "memory-cache"
import StackingContract from "@/contracts/Stacking.json"

export const plansCacheKey = "plans"

export async function getPlans(){
  const cachedResult = cache.get(plansCacheKey)
  if (cachedResult) {
    return cachedResult
  }

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT)
  const stackingContract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)
  const plansCount = Number.parseInt(process.env.NEXT_PUBLIC_STAKING_PLANS_COUNT ?? "4")
  const penaltyPercent = await stackingContract!.PENALTY_PERCENT()
  const percentDivider = 100
  const ewp = Number.parseInt(penaltyPercent) / percentDivider
  
  const result = new Array<any>()
  for (let index = 0; index < plansCount; index++) {
    const planInfo = await stackingContract!.getPlanInfo(index)
    result.push({
      id: index,
      percent: Number.parseInt(planInfo.percent) / percentDivider,
      days: Number.parseInt(planInfo.time),
      ewp,
    })
  }

  cache.put(plansCacheKey, result)

  return result;
}

export async function GET() {
  const result = await getPlans()
  return NextResponse.json(result, { status: 200 })
}
