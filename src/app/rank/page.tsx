"use client"

import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Container from "@/components/Container"
import useRank from "@/hooks/useRank"
import useTable from "@/hooks/useTable"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const rowsPerPage = 10

export default function Rank() {
  const { rankData, myRankNumber } = useRank()
  const [page, setPage] = useState<number>(0)
  const [pageNumbers, setPpageNumbers] = useState<Array<number>>([1, 2, 3, 4, 5])
  const { slice } = useTable({
    data: rankData,
    page,
    rowsPerPage,
  })

  useEffect(() => {
    if (page <= 3) {
      setPpageNumbers([1, 2, 3, 4, 5])
    } else {
      setPpageNumbers([page - 2, page - 1, page, page + 1, page + 2])
    }
  }, [page])

  useEffect(() => {
    if (page === 0 && myRankNumber > 0) {
      setPage(Math.ceil(myRankNumber / rowsPerPage))
    }
  }, [myRankNumber])

  return (
    <ContainerStyled>
      <h1>Leaderboard</h1>
      <ul>
        {slice.map((user, index) => (
          <li key={index}>
            <p>{user.number}</p>
            <p>{user.address}</p>
            <p>{user.negativeDividentsTotal}</p>
          </li>
        ))}
      </ul>
      <div>
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1)
          }}
        >
          prev
        </button>
        {pageNumbers.map((p, index) => (
          <button
            key={index}
            disabled={p === page}
            onClick={() => {
              setPage(p)
            }}
          >
            {p}
          </button>
        ))}
        <button onClick={() => {
          setPage(page + 1)
        }}
        >
          next
        </button>
      </div>
    </ContainerStyled>
  )
}
