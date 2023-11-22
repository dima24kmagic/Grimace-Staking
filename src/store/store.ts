import { configureStore } from "@reduxjs/toolkit"
import account from "./accountState"
import depositForm from "./depositFormState"
import rank from "./rankState"

const store = configureStore({
  reducer: {
    account,
    depositForm,
    rank,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
