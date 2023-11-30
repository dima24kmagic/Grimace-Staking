import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import ChevronLeftIcon from "./icons/ChevronLeftIcon"
import ChevronRightIcon from "./icons/ChevronRightIcon"

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
            <td>Total dividends</td>
            <td className="text-right">Address</td>
          </tr>
        </thead>
        <tbody className="text-lg font-light">
          {rows.map(row => <Row key={row.number} {...row} />)}
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
  number: number
  negativeDividentsTotal: number
  address: string
  highlighted?: boolean
}

const Row = ({
  number,
  negativeDividentsTotal,
  address,
  highlighted = false,
}: RowProps) => (
  <tr
    className={clsx(
      "border-b border-solid border-[#333]",
      highlighted && "bg-gradient-to-r from-purple-900 to-purple-600",
    )}
  >
    <td className="py-1 pr-4">{number}</td>
    <td className="py-1 pr-4">
      -
      {negativeDividentsTotal}
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
  const [pageNumbers, setPageNumbers] = useState<number[][]>([])

  useEffect(() => {
    pagesTotal = pagesTotal < 1 ? 1 : pagesTotal

    if(page < 4){
      setPageNumbers([[1, 2, 3, 4, 5]])
    } else {
      setPageNumbers([[page - 2, page - 1, page, page + 1, page + 2]])
    }
  }, [page, pagesTotal])

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
              disabled={pageNumber>pagesTotal}
            >
              {pageNumber}
            </PaginationButton>
          ))}
        </React.Fragment>
      ))}
      <PaginationButton
        className="px-1"
        onClick={handleNextClick}
        disabled={page>=pagesTotal}
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
