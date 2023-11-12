import { configureStore } from "@reduxjs/toolkit"
import account from "./accountState"
import depositForm from "./depositFormState"

const store = configureStore({
  reducer: {
    account,
    depositForm,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
