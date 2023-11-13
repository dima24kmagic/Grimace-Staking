import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { Plan } from "../store/depositFormState"
import { selectPlan, setPlans } from "../store/depositFormState"
import { useEthersContext } from "./useEthers"

const usePlans = () => {
  const { stackingContract } = useEthersContext()
  const dispatch = useAppDispatch()
  const plansCount = Number.parseInt(process.env.NEXT_PUBLIC_STAKING_PLANS_COUNT ?? "4")
  const plans = useAppSelector(state => state.depositForm.plans)

  const updatePlans = async () => {
    if (!stackingContract) {
      return plans
    }

    if (plans.length) {
      dispatch(selectPlan(2))
      return plans
    }

    console.log('plans update')

    const penaltyPercent = await stackingContract!.PENALTY_PERCENT()
    const percentDivider = 100
    const ewp = Number.parseInt(penaltyPercent) / percentDivider

    const result = new Array<Plan>()
    for (let index = 0; index < plansCount; index++) {
      const planInfo = await stackingContract!.getPlanInfo(index)
      result.push({
        id: index,
        percent: Number.parseInt(planInfo.percent) / percentDivider,
        days: Number.parseInt(planInfo.time),
        ewp,
      })
    }

    dispatch(setPlans(result))
    dispatch(selectPlan(2))

    return result
  }

  return { updatePlans, plans }
}

export default usePlans
