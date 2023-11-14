import DepositFormConnected from "./DepositFormConnected"
import DepositFormDisconnected from "./DepositFormDisconnected"
import Card from "@/components/Card"
import { useAppSelector } from "@/store/hooks"

function FormInitial() {
  const accountAddress = useAppSelector(state => state.account.address)

  return (
    <Card>
      { accountAddress
        ? <DepositFormConnected />
        : <DepositFormDisconnected />}
    </Card>
  )
}

export default FormInitial
