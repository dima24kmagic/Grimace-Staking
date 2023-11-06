import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Plan {
  persent: number,
  ewp: number,
  days: number
}

export interface DepositFormState {
  amount: number | null,
  amountToWithdraw: number | null,
  plans: Array<Plan>,
  selectedPlanIndex: number | null,
  selectedPlan: Plan | null,
  unstakeDate: string | null
}

const initialState: DepositFormState = {
  amount: null,
  plans: [],
  selectedPlanIndex: null,
  selectedPlan: null,
  unstakeDate: null,
  amountToWithdraw: null
}

export const depositFormSlice = createSlice({
  name: 'depositForm',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number | null>) => {
      state.amount = action.payload
    },
    setPlans: (state, action: PayloadAction<Array<Plan>>) => {
      state.plans = action.payload
    },
    selectPlan: (state, action: PayloadAction<number | null>) => {
      state.selectedPlanIndex = action.payload
      if(action.payload && state.amount){
        state.selectedPlan = state.plans[action.payload!]
        state.amountToWithdraw = state.amount * (100 - state.selectedPlan.persent) / 100
        var currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + state.selectedPlan.days)
        state.unstakeDate = currentDate.toString()
      }
    },
    clearDepositForm: (state) => {
      state.amount = null
      state.selectedPlanIndex = null
      state.selectedPlan = null
      state.unstakeDate = null
      state.amountToWithdraw = null
    }
  }
})

export const { setAmount, setPlans, selectPlan, clearDepositForm } = depositFormSlice.actions

export default depositFormSlice.reducer