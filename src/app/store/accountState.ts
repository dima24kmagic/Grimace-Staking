import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  address: string | null,
  balance: number | null
}

const initialState: AccountState = {
    address: null,
    balance: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload
    },
    setBalance: (state, action: PayloadAction<number | null>) => {
      state.balance = action.payload
    }
  }
})

export const { setAccountAddress, setBalance } = accountSlice.actions

export default accountSlice.reducer