import type { Plan } from "../store/depositFormState"

export const getUserNegativeDividends = (
  amount: number,
  plan: Plan,
  finish: Date,
  from: Date,
) => {
  const share = (amount * plan.percent) / 100
  const days = (finish.getTime() - from.getTime()) / 86400000

  const result = (share * days) / 365
  return result
}
