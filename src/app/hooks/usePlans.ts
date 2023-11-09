import { useEthersContext } from "./useEthers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Plan, selectPlan, setPlans } from "../store/depositFormState";

const usePlans = () => {
    const { stackingContract } = useEthersContext()
    const dispatch = useAppDispatch()
    const plansCount = parseInt(process.env.NEXT_PUBLIC_STAKING_PLANS_COUNT ?? '4')
    const plans = useAppSelector(state => state.depositForm.plans)

    const updatePlans = async () => {
        if(!stackingContract) return

        if(plans.length) {
            dispatch(selectPlan(2))
            return
        }
        
        const penaltyPercent = await stackingContract!.PENALTY_PERCENT()
        const percentDivider = 100
        const ewp = parseInt(penaltyPercent) / percentDivider

        const result = new Array<Plan>
        for (let index = 0; index < plansCount; index++) {
            const planInfo = await stackingContract!.getPlanInfo(index)
            result.push({
                percent: parseInt(planInfo.percent) / percentDivider,
                days: parseInt(planInfo.time),
                ewp: ewp
            })
        }
        
        dispatch(setPlans(result))
        dispatch(selectPlan(2))
    }

    return { updatePlans, plans };
};

export default usePlans
