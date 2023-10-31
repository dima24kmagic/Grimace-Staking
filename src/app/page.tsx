"use client"

import React from "react"
import styled from "@emotion/styled"
import BitGetBanner from "@/components/banners/BitGet"
import GrimaceSwap from "@/components/banners/GrimaceSwap"
import Container from "@/components/Container"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Home() {
  return (
    <ContainerStyled>
      <BitGetBanner />
      <GrimaceSwap />
    </ContainerStyled>
  )
}
