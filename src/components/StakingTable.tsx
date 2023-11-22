import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import ChevronLeftIcon from "./icons/ChevronLeftIcon"
import ChevronRightIcon from "./icons/ChevronRightIcon"
import formatUnstakeDate from "@/utils/formatUnstakeDate"

export type StakingTableProps = {
  rows: RowProps[]
  rowsTotal: number
  currentPage: number
  pagesTotal: number
  onPageSelect?: (selectedPage: number) => void
}

export default ({
  rows,
  rowsTotal,
  currentPage,
  pagesTotal,
  onPageSelect,
}: StakingTableProps) => (
  <div className="flex flex-col items-stretch">
    <div className="block overflow-x-auto whitespace-nowrap">
      <table className="mb-6 w-full">
        <thead>
          <tr className="text-left text-base text-hint uppercase">
            <td>№</td>
            <td>Unstake date</td>
            <td>Amount</td>
            <td className="text-right">Address</td>
          </tr>
        </thead>
        <tbody className="text-lg font-light">
          {rows.map(row => <Row key={row.no} {...row} />)}
        </tbody>
      </table>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between">
      <span className="text-hint text-base uppercase mb-2 md:mb-0">
        {rowsTotal}
        {" "}
        holders
      </span>
      <div>
        <PaginationControls
          page={currentPage}
          pagesTotal={pagesTotal}
          onPageSelect={onPageSelect}
        />
      </div>
    </div>
  </div>
)

export type RowProps = {
  no: number
  unstakeDate: Date
  grimaceAmount: number
  address: string
  highlighted?: boolean
}

const Row = ({
  no,
  unstakeDate,
  grimaceAmount,
  address,
  highlighted = false,
}: RowProps) => (
  <tr
    className={clsx(
      "border-b border-solid border-[#333]",
      highlighted && "bg-gradient-to-r from-purple-900 to-purple-600",
    )}
  >
    <td className="py-1 pr-4">{no}</td>
    <td className="py-1 pr-4">
      <time dateTime={unstakeDate.toISOString()}>
        {formatUnstakeDate(unstakeDate)}
      </time>
    </td>
    <td className="py-1 pr-4">
      {grimaceAmount}
      {" "}
      GRIMACE
    </td>
    <td className="text-right" title={address}>
      {`${address.slice(0, 8)}...${address.slice(-6)}`}
    </td>
  </tr>
)

type PaginationControlsProps = {
  page: number
  pagesTotal: number
  onPageSelect?: (selectedPage: number) => void
}

const PaginationControls = ({
  page,
  pagesTotal,
  onPageSelect,
}: PaginationControlsProps) => {
  const handlePrevClick = () => onPageSelect?.(page - 1)
  const handleNextClick = () => onPageSelect?.(page + 1)
  const handlePageClick = (selected: number) => () => onPageSelect?.(selected)

  pagesTotal = pagesTotal < 1 ? 1 : pagesTotal

  const pageNumbers: number[][] = []
  if (pagesTotal <= 7) {
    pageNumbers.push([1, 2, 3, 4, 5, 6, 7])
  } else if (page <= 4) {
    pageNumbers.push([1, 2, 3, 4, 5])
    pageNumbers.push([pagesTotal])
  } else if (page >= pagesTotal - 3) {
    pageNumbers.push([1])
    pageNumbers.push([pagesTotal - 4, pagesTotal - 3, pagesTotal - 2, pagesTotal - 1, pagesTotal])
  } else {
    pageNumbers.push([1])
    pageNumbers.push([page - 1, page, page + 1])
    pageNumbers.push([pagesTotal])
  }

  return (
    <div className="flex gap-1 font-bold">
      <PaginationButton
        className="px-1"
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </PaginationButton>
      {pageNumbers.map((groupPageNumbers, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-hint">...</span>}
          {groupPageNumbers.map(pageNumber => (
            <PaginationButton
              key={pageNumber}
              active={pageNumber === page}
              onClick={handlePageClick(pageNumber)}
            >
              {pageNumber}
            </PaginationButton>
          ))}
        </React.Fragment>
      ))}
      <PaginationButton
        className="px-1"
        onClick={handleNextClick}
        disabled={page === pagesTotal}
      >
        <ChevronRightIcon />
      </PaginationButton>
    </div>
  )
}

const PaginationButton = ({
  className,
  children,
  active,
  disabled,
  ...rest
}: React.ComponentProps<"button"> & { active?: boolean }) => (
  <button
    className={twMerge(
      "flex items-center border border-solid border-white rounded-md px-2 select-none",
      "px-2",
      active ? "text-dark bg-white" : "text-white bg-dark",
      disabled && "opacity-50 cursor-not-allowed",
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
)
