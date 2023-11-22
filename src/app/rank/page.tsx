"use client"

import React, { useEffect, useState } from "react"
import Page from "@/components/Page"
import StakingTable from "@/components/StakingTable"
import useRank from "@/hooks/useRank"

const rowsPerPage = 10

export default () => {
  const { rankData, myRankNumber } = useRank()
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    if (page === 0 && myRankNumber > 0) {
      setPage(Math.ceil(myRankNumber / rowsPerPage))
    }
  }, [myRankNumber])

  return (
    <Page
      heading="Leaderboard"
      subheading={(
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg uppercase">
            {"Rank by: "}
          </span>
        </div>
      )}
    >
      <div className="max-w-[min(1000px,100%)] mx-auto">
        <StakingTable
          rows={rankData}
          rowsTotal={rankData.length}
          pagesTotal={Math.ceil(rankData.length / rowsPerPage)}
          currentPage={page}
          onPageSelect={i => setPage(i)}
        />
      </div>
    </Page>
  )
}