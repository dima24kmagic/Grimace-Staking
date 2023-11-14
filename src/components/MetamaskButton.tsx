import { useState } from "react"
import clsx from "clsx"
import AccountIcon from "@/components/icons/AccountIcon"
import truncateAddress from "@/utils/truncateAddress"

const MetamaskButton = () => {
  // TODO: add MetaMask connection logic
  const [connectedAddress, setConnectedAddress] = useState<string>("")
  const handleClick = () => setConnectedAddress("0xabcdef1234567890")

  const connected = Boolean(connectedAddress)
  const text = connectedAddress
    ? truncateAddress(connectedAddress)
    : "Connect"

  return (
    <button
      title={connectedAddress || "Connect to MetaMask"}
      onClick={handleClick}
      className={clsx(
        "flex items-center border-solid border-[3px] rounded-[30px]",
        connected
          ? "text-purple border-purple bg-purple-950"
          : "text-orange border-orange",
      )}
    >
      <AccountIcon className="text-[32px] scale-125" />
      <span className="py-1 pl-3 pr-5 uppercase text-white">
        {text}
      </span>
    </button>
  )
}

export default MetamaskButton
