import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  address: string | null,
  balance: string | null
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
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload
    }
  }
})

export const { setAccountAddress, setBalance } = accountSlice.actions

export default accountSlice.reducer