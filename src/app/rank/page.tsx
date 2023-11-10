"use client"

import styled from "@emotion/styled"
import Container from "@/components/Container"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Dashboard() {
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
            <p>{user.address}</p>
            <p>{user.negativeDividentsTotal}</p>
          </li>
        ))}
      </ul>
    </ContainerStyled>
  )
}
