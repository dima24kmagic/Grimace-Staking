import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface Deposit {
  id: number
  days: number
  planIndex: number
  amount: number
  amountToWithdraw: number
  start: string
  finish: string
  isTaken: boolean
  withdrawable: boolean
  finishDateSeconds: number
}

export interface AccountState {
  address: string | null
  balance: string | null
  deposits: Array<Deposit>
  depositsLoaded: boolean
}

const initialState: AccountState = {
  address: null,
  balance: null,
  deposits: [],
  depositsLoaded: false
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
    setDepositsLoaded: (state, action: PayloadAction<boolean>) => {
      state.depositsLoaded = action.payload
    },
  },
})

export const { setAccountAddress, setBalance, setDeposits, setDepositsLoaded } = accountSlice.actions

export default accountSlice.reducer
