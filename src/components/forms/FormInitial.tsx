import DepositFormConnected from "./DepositFormConnected"
import DepositFormDisconnected from "./DepositFormDisconnected"
import { useAppSelector, useAppDispatch } from '../../app/store/hooks'

function FormInitial() {
  const accountAddress = useAppSelector(state => state.account.address)

  return (
    <div>
      { accountAddress ? 
        <DepositFormConnected/> : <DepositFormDisconnected />
      }
    </div>
  )
}

export default FormInitial
