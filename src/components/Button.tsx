import { twMerge } from "tailwind-merge"

export default ({
  className,
  children,
  ...rest
}: React.ComponentProps<"button">) => (
  <button
    {...rest}
    className={twMerge(
      "uppercase text-lg leading-none py-3 px-12 rounded-xl bg-gradient-to-r from-purple-950 to-purple-600",
      className,
    )}
  >
    {children}
  </button>
)
