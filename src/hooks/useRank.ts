import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setRank } from "@/store/rankState"

const useRank = () => {
  const accountAddress = useAppSelector(state => state.account.address)
  const rank = useAppSelector(state => state.rank.rank)
  const dispatch = useAppDispatch()
  const [myRankNumber, setMyRankNumber] = useState<number>(0)

  const updateRank = async () => {
    const response = await fetch("/api/rank")
    const result = await response.json()

    if (!accountAddress || !result.length) {
      dispatch(setRank(result))
      return result
    }

    const myRank = result.filter((item) => {
      return item.address.toLowerCase() === accountAddress.toLowerCase()
    })[0]

    const number = myRank?.number

    if (number) {
      myRank.highlighted = true
      setMyRankNumber(number)
    }

    dispatch(setRank(result))
    return result
  }

  return { updateRank, rank, myRankNumber }
}

export default useRank
