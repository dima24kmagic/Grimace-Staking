import clsx from "clsx"

export default ({ className, ...rest }: React.ComponentProps<"hr">) => (
  <hr
    className={clsx(
      "block h-[1px] bg-[#454545] border-none grow",
      className,
    )}
    {...rest}
  />
)
