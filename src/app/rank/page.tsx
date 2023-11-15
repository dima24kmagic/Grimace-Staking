"use client"

import React, { useState } from "react"
import Page from "@/components/Page"
import StakingTable from "@/components/StakingTable"

export default () => {
  const [pagesTotal, _] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Page
      heading="Leaderboard"
      subheading={(
        <span className="text-lg uppercase">
          Rank by: amount
        </span>
      )}
    >
      <div className="max-w-[min(1000px,100%)] mx-auto">
        <StakingTable
          rows={[
            { no: 1, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 95, address: "0xd23dsaf9uhu2312falkC4fe7" },
            { no: 2, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 45, address: "0xd23dsaf9uhu2312falkC4fe7" },
            { no: 3, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 35, address: "0xd23dsaf9uhu2312falkC4fe7" },
            { no: 4, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 15, address: "0xd23dsaf9uhu2312falkC4fe7" },
            { no: 5, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 5, address: "0xd23dsaf9uhu2312falkC4fe3", highlighted: true },
            { no: 6, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 3, address: "0xd23dsaf9uhu2312falkC4fe7" },
            { no: 7, unstakeDate: new Date("2023-02-10T10:40:23.000Z"), grimaceAmount: 1, address: "0xd23dsaf9uhu2312falkC4fe7" },
          ]}
          rowsTotal={147}
          pagesTotal={pagesTotal}
          currentPage={currentPage}
          onPageSelect={i => setCurrentPage(i)}
        />
      </div>
    </Page>
  )
}
