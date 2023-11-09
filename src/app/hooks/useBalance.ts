import { useEthersContext } from "./useEthers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setBalance } from "../store/accountState";

const useBalance = () => {
    const { tokenContract, ethers } = useEthersContext()
    const dispatch = useAppDispatch()
    const accountAddress = useAppSelector(state => state.account.address)
    const balance = useAppSelector(state => state.account.balance)

    const updateBalance = async () => {
        if(!tokenContract) return

        if (!accountAddress){
            dispatch(setBalance(null))
            return
        }

        const balance = await tokenContract.balanceOf(accountAddress)
        dispatch(setBalance(ethers.formatEther(balance)))
    }

    return { updateBalance, balance };
};

export default useBalance
