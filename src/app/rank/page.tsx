"use client"

import React, { useState } from "react"
import { Menu } from "@headlessui/react"
import clsx from "clsx"
import Page from "@/components/Page"
import StakingTable from "@/components/StakingTable"
import ChevronBottomIcon from "@/components/icons/ChevronBottomIcon"

export default () => {
  const [pagesTotal, _] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [rankBy, setRankBy] = useState<"amount" | "date">("amount")

  return (
    <Page
      heading="Leaderboard"
      subheading={(
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg uppercase">
            {"Rank by: "}
          </span>
          <RankingSelect
            options={["amount", "date"]}
            selected={rankBy}
            onSelect={option => setRankBy(option as any)}
          />
        </div>
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

type RankingSelectProps = {
  selected: string
  options: string[]
  onSelect: (newOption: string) => void
}

const RankingSelect: React.FC<RankingSelectProps> = ({
  selected,
  options,
  onSelect,
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="uppercase text-lg">
        {selected}
        {" "}
        <ChevronBottomIcon />
      </Menu.Button>
      <Menu.Items className="flex flex-col gap-2 absolute right-0 bottom-0 translate-y-[100%] bg-dark rounded-md drop-shadow-lg outline-none p-2 border-2 border-solid border-hint">
        {options.map(option => (
          <Menu.Item key={option}>
            {({ active }) => (
              <a
                href="#"
                onClick={() => onSelect(option)}
                className={clsx(
                  "text-lg leading-none",
                  active && "text-purple",
                )}
              >
                {option}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
