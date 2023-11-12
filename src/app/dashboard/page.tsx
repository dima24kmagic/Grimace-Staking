"use client"

import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { useAppSelector } from "@/store/hooks"
import usePlans from "@/hooks/usePlans"
import useDeposits from "@/hooks/useDeposits"
import Container from "@/components/Container"

const ContainerStyled = styled(Container)`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default function Dashboard() {
  const { deposits, updateDeposits } = useDeposits()
  const { updatePlans, plans } = usePlans()
  const accountAddress = useAppSelector(state => state.account.address)

  useEffect(() => {
    updatePlans().then(() => updateDeposits())
  }, [accountAddress, plans])

  return (
    <ContainerStyled>
      <h1>Dashboard</h1>

      <ul>
        {deposits.map((dep, index) => (
          <li key={index}>
            <p>{dep.amount}</p>
            <p>{dep.amountToWithdraw}</p>
            <p>{dep.finish.toString()}</p>
          </li>
        ))}
      </ul>
    </ContainerStyled>
  )
}
