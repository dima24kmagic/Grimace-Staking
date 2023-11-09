import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Plan {
  percent: number,
  ewp: number,
  days: number
}

export interface DepositFormState {
  amountString: string | null,
  amount: number | null,
  amountToWithdraw: number | null,
  plans: Array<Plan>,
  selectedPlanIndex: number | null,
  selectedPlan: Plan | null,
  unstakeDate: string | null,
  step: number
}

const initialState: DepositFormState = {
  amountString: null,
  amount: null,
  plans: [],
  selectedPlanIndex: null,
  selectedPlan: null,
  unstakeDate: null,
  amountToWithdraw: null,
  step: 1
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
    setAmountString: (state, action: PayloadAction<string | null>) => {
      state.amountString = action.payload

      if(!state.amountString) return
      
      const val = parseFloat(state.amountString)
      if(isNaN(val)){
        state.amount = null
      }
      else{
        state.amount = val
      }
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
      state.amountString = null
      state.amount = null
      state.selectedPlanIndex = null
      state.selectedPlan = null
      state.unstakeDate = null
      state.amountToWithdraw = null
      state.step = 1
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },
  }
})

export const { setStep, setAmountString, setPlans, selectPlan, clearDepositForm } = depositFormSlice.actions

export default depositFormSlice.reducer