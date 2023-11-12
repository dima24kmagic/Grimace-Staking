import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface Deposit {
  days: number
  planIndex: number
  amount: number
  amountToWithdraw: number
  start: string
  finish: string
  isTaken: boolean
}

export interface AccountState {
  address: string | null
  balance: string | null
  deposits: Array<Deposit>
}

const initialState: AccountState = {
  address: null,
  balance: null,
  deposits: [],
}

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload
    },
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload
    },
    setDeposits: (state, action: PayloadAction<Array<Deposit>>) => {
      state.deposits = action.payload
    },
  },
})

export const { setAccountAddress, setBalance, setDeposits } = accountSlice.actions

export default accountSlice.reducer
