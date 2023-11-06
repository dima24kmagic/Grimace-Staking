import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Plan {
  percent: number,
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

const getUserNegativeDividends = (amount: number, plan : Plan, finish: Date) => {  
  const share = (amount * plan.percent) / 100;
  const from = new Date()
  const days = (finish.getTime() - from.getTime()) / 86400000

  return (share * days) / 365;
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
        var date = new Date()
        date.setDate(date.getDate() + state.selectedPlan.days)
        state.unstakeDate = date.toString()
        state.amountToWithdraw = state.amount 
          - getUserNegativeDividends(state.amount, state.selectedPlan, date)
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