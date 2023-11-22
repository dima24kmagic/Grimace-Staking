import type { EventLog } from "ethers"
import { Contract, ethers } from "ethers"
import { NextResponse } from "next/server"
import cache from "memory-cache"
import StackingContract from "@/contracts/Stacking.json"
import { getPlans, plansCacheKey } from "../plans/route"
import { NextApiRequest } from "next"
import { Deposit } from "@/store/accountState"
import formatUnstakeDate from "@/utils/formatUnstakeDate"
import { getUserNegativeDividends } from "@/utils/depositHelper"

const cacheKeyPrefix = "dashboard:"

export async function DELETE(req, res){
  const accountAddress = req.nextUrl.searchParams.get('address')
  const cacheKey = cacheKeyPrefix + accountAddress
  cache.del(cacheKey)
  return NextResponse.json({}, {status:200})
}

export async function GET(req, res) {
  const accountAddress = req.nextUrl.searchParams.get('address')
  const cacheKey = cacheKeyPrefix + accountAddress
  const cachedResult = cache.get(cacheKey)
  if (cachedResult) {
    return NextResponse.json(cachedResult, { status: 200 })
  }

  const plans = await getPlans()

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT)
  const stackingContract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, StackingContract.abi, provider)

  const depositsCount = await stackingContract.getUserAmountOfDeposits(accountAddress)

  const result = new Array<Deposit>()
  for (let index = 0; index < depositsCount; index++) {
    const depInfo = await stackingContract.getUserDepositInfo(accountAddress, index)
    const start = new Date(Number.parseInt(depInfo.start) * 1000)
    const finish = new Date(Number.parseInt(depInfo.finish) * 1000)

    const deposit: Deposit = {
      id: index,
      planIndex: Number.parseInt(depInfo.plan),
      days: plans[Number.parseInt(depInfo.plan)].days,
      amount: Number.parseInt(ethers.formatEther(depInfo.amount)),
      start: formatUnstakeDate(start),
      finish: formatUnstakeDate(finish),
      finishDateSeconds: finish.getTime() / 1000,
      isTaken: depInfo.isTaken,
      amountToWithdraw: 0,
      withdrawable: finish < new Date(),
    }
    deposit.amountToWithdraw = deposit.amount
      - getUserNegativeDividends(deposit.amount, plans[deposit.planIndex], finish, start)
    result.push(deposit)
  }

  cache.put(cacheKey, result)

  return NextResponse.json(result, { status: 200 })
}
