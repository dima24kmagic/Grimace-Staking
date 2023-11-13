import DepositFormConnected from "./DepositFormConnected"
import DepositFormDisconnected from "./DepositFormDisconnected"
import { useAppSelector } from "@/store/hooks"

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
