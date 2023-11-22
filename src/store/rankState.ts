import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { getUserNegativeDividends } from "../utils/depositHelper"
import formatUnstakeDate from "@/utils/formatUnstakeDate"

export interface rankState {
  rank: Array<any>
}

const initialState: rankState = {
  rank: [],
}

export const depositFormSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    setRank: (state, action: PayloadAction<Array<any>>) => {
      state.rank = action.payload
    }
  },
})

export const { setRank } = depositFormSlice.actions

export default depositFormSlice.reducer
