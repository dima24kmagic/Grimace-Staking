import clsx from "clsx"
import AccountIcon from "@/components/icons/AccountIcon"
import truncateAddress from "@/utils/truncateAddress"

const MetamaskButton = ({
  account,
  handleConnect,
}: {
  account: string | null
  handleConnect: () => Promise<void>
}) => {
  const text = account
    ? truncateAddress(account)
    : "Connect"

  return (
    <button
      title={account || "Connect to MetaMask"}
      onClick={handleConnect}
      className={clsx(
        "flex items-center border-solid border-[3px] rounded-[30px]",
        account
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
