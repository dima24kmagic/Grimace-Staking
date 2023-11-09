import { useEthersContext } from "./useEthers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setBalance } from "../store/accountState";

const useUpdateBalance = () => {
    const { tokenContract, ethers } = useEthersContext()
    const dispatch = useAppDispatch()
    const accountAddress = useAppSelector(state => state.account.address)

    const updateBalance = async () => {
        if (!accountAddress){
            dispatch(setBalance(null))
            return
        }

        const balance = await tokenContract!.balanceOf(accountAddress)
        dispatch(setBalance(ethers.formatEther(balance)))
    }

    return { updateBalance };
};

export default useUpdateBalance
