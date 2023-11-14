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
  const { deposits, updateDeposits, handleWithdraw } = useDeposits()
  const { updatePlans } = usePlans()
  const accountAddress = useAppSelector(state => state.account.address)

  useEffect(() => {
    if (!accountAddress) {
      return
    }
    updatePlans().then(plans => updateDeposits(plans))
  }, [accountAddress])

  return (
    <ContainerStyled>
      <h1>Dashboard</h1>

      <ul>
        {deposits.filter(dep => !dep.isTaken).map((dep, index) => (
          <li key={index}>
            <p>{dep.amount}</p>
            <p>{dep.amountToWithdraw}</p>
            <p>{dep.finish.toString()}</p>
            <button onClick={() => {
              handleWithdraw(dep.id)
            }}
            >
              {dep.withdrawable ? "withdrawal" : "early unstake"}
            </button>
          </li>
        ))}
      </ul>
    </ContainerStyled>
  )
}
