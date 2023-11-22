import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectPlan, setPlans } from "../store/depositFormState"

const usePlans = () => {
  const dispatch = useAppDispatch()
  const plans = useAppSelector(state => state.depositForm.plans)

  const updatePlans = async () => {
    if (plans.length) {
      dispatch(selectPlan(2))
      return plans
    }

    const response = await fetch("/api/plans")
    const result = await response.json()

    dispatch(setPlans(result))
    dispatch(selectPlan(2))

    return result
  }

  return { updatePlans, plans }
}

export default usePlans
