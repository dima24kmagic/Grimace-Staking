"use client"

import React, { useEffect, useState } from "react"
import Page from "@/components/Page"
import StakingTable from "@/components/StakingTable"
import useRank from "@/hooks/useRank"
import { useAppSelector } from "@/store/hooks"
import useTable from "@/hooks/useTable"

const rowsPerPage = 10

export default () => {
  const accountAddress = useAppSelector(state => state.account.address)
  const { rank, myRankNumber, updateRank } = useRank()
  const [page, setPage] = useState<number>(0)
  const { slice } = useTable({
    data: rank,
    page,
    rowsPerPage,
  })

  useEffect(() => {
    if (page === 0 && myRankNumber > 0) {
      setPage(Math.ceil(myRankNumber / rowsPerPage))
    }
  }, [myRankNumber])

  useEffect(() => {
    updateRank()
  }, [accountAddress])

  return (
    <Page
      heading="Leaderboard"
    >
      <div className="max-w-[min(1000px,100%)] mx-auto">
        <StakingTable
          rows={slice}
          rowsTotal={rank.length}
          pagesTotal={Math.ceil(rank.length / rowsPerPage)}
          currentPage={page}
          onPageSelect={i => setPage(i)}
        />
      </div>
    </Page>
  )
}