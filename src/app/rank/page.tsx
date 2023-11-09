"use client"

import React from "react"
import styled from "@emotion/styled"
import Container from "@/components/Container"
const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Dashboard() {
  return (
    <ContainerStyled>
      <h1>Leaderboard</h1>
    </ContainerStyled>
  )
}
