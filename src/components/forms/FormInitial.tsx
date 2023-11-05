import FormConnected from "./FormConnected"
import FormDisconnected from "./FormDisconnected"

export type FormInitialProps = {
  onConnectClick?: () => Promise<void>,
  account: string | null
}

function FormInitial({
  onConnectClick,
  account
}: FormInitialProps) {
  return (
    <div>
      { account ? 
        <FormConnected/> : <FormDisconnected onConnectClick={onConnectClick}/>
      }
    </div>
  )
}

export default FormInitial
