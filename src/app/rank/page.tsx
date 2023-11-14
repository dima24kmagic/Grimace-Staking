"use client"

import styled from "@emotion/styled"
import Container from "@/components/Container"
import useRank from "@/hooks/useRank"
import useTable from "@/hooks/useTable"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Rank() {
  const {rankData} = useRank()
  const {slice} = useTable({
    data: rankData,
    page: 1,
    rowsPerPage: 10
  })

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
    </ContainerStyled>
  )
}
