import { useAppSelector } from "../../app/store/hooks"
import DepositFormConnected from "./DepositFormConnected"
import DepositFormDisconnected from "./DepositFormDisconnected"

function FormInitial() {
  const accountAddress = useAppSelector(state => state.account.address)

  return (
    <div>
      { accountAddress
        ? <DepositFormConnected />
        : <DepositFormDisconnected />}
    </div>
  )
}

export default FormInitial
