import { twMerge } from "tailwind-merge"

export type PageProps = React.ComponentProps<"div"> & {
  heading: React.ReactNode
  subheading?: React.ReactNode
}

export default ({
  className,
  children,
  heading,
  subheading,
  ...rest
}: PageProps) => (
  <div
    {...rest}
    className={twMerge(
      "container px-3",
      className,
    )}
  >
    <div className="flex flex-col items-end text-right mb-8">
      <h1 className="uppercase font-medium text-[2rem] md:text-[3rem] leading-none">
        {heading}
      </h1>
      {subheading && (
        <p className="uppercase text-right">
          {subheading}
        </p>
      )}
    </div>
    {children}
  </div>
)
