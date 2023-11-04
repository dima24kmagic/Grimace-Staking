"use client"

import React from "react"
import styled from "@emotion/styled"
import BitGetBanner from "@/components/banners/BitGet"
import GrimaceSwapBanner from "@/components/banners/GrimaceSwap"
import Container from "@/components/Container"
import FormInitial from "@/components/forms/FormInitial"
import { useConnectMetamask } from "@/app/hooks/useConnectMetamask"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Home() {
  const { handleConnect } = useConnectMetamask()

  return (
    <ContainerStyled>
      <FormInitial onConnectClick={handleConnect} />
      <BitGetBanner />
      <GrimaceSwapBanner />
    </ContainerStyled>
  )
}
