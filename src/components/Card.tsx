import { twMerge } from "tailwind-merge"

export default ({ children, className, ...rest }: React.ComponentProps<"div">) => (
  <div
    {...rest}
    className={twMerge(
      "border-[3px] border-solid border-purple-900 flex flex-col items-start px-4 py-3 md:px-10 md:py-6",
      className,
    )}
  >
    {children}
  </div>
)
