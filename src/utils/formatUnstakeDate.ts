export default function formatUnstakeDate(d: Date): string {
  const date = d.getDate()
  const month = d.toLocaleString("default", { month: "short" })
  const year = d.getFullYear()
  const hh = d.getHours().toFixed().padStart(2, "0")
  const mm = d.getMinutes().toFixed().padStart(2, "0")
  const ss = d.getSeconds().toFixed().padStart(2, "0")

  return `${date} ${month} ${year} at ${hh}:${mm}:${ss}`
}
