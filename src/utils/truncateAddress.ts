export default function truncateAddress(fullAddress: string): string {
  return `${fullAddress.substring(0, 6)}...${fullAddress.substring(fullAddress.length - 4)}`
}
