import type { ComponentProps, ReactNode } from "react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { useRouter } from "next/navigation"

export type BannerProps = {
  heading: ReactNode
  subheading: ReactNode
  imageData: StaticImageData
  imageAlt: string,
  url: string
} & ComponentProps<"button">

function Banner({
  heading,
  subheading,
  imageAlt,
  imageData,
  className,
  url,
  ...rest
}: BannerProps) {

  const router = useRouter()

  return (
    <button
      onClick={() => { router.push(url)}}
      className={twMerge(
        "flex justify-between items-center p-2 border-4 border-solid",
        className,
      )}
      {...rest}
    >
      <Image
        alt={imageAlt}
        src={imageData}
        className="w-auto h-[60px] md:h-[90px]"
      />
      <div className="flex flex-col text-right items-end">
        <h4 className="text-xl md:text-2xl whitespace-nowrap font-light">
          {heading}
        </h4>
        <h5 className="uppercase font-light text-sm md:text-lg opacity-60 whitespace-nowrap">
          {subheading}
        </h5>
      </div>
    </button>
  )
}

export default Banner
