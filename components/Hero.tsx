import Image, { StaticImageData } from "next/image"
import { CSSProperties } from "react"
import defaultMobileImage from "../public/illustrations/default_hero_mobile.png"
import defaultDesktopImage from "../public/illustrations/default_hero_desktop.png"

export type HeroProps = {
  /** Static import of mobile image */
  mobileImage?: StaticImageData
  /** Static import of desktop image */
  desktopImage?: StaticImageData
  /** Text content */
  children: React.ReactNode
  /** Large, centered hero style used on the homepage */
  large?: boolean
}

/** Illustrated hero component used at the top of all pages */
const Hero = ({
  mobileImage = defaultMobileImage,
  desktopImage = defaultDesktopImage,
  children,
  large,
}: HeroProps) => {
  return (
    <section
      className="full-width-bg relative pt-[var(--header-area)] text-white h-[900px] lg:h-[1000px] xl:h-[1100px] 2xl:h-[1200px]"
    >
      {large ? (
        <div className="full-width-bg__inner flex flex-col items-center justify-center py-20 text-center">
          {children}
        </div>
      ) : (
        <div className="full-width-bg__inner grid py-20 lg:grid-cols-12 lg:justify-center lg:gap-x-gutter">
          <div className="col-span-12 lg:col-span-7 xl:col-span-5 xl:col-start-2">
            {children}
          </div>
        </div>
      )}

      <div className="absolute inset-0 -z-10 md:ml-[-25%] lg:ml-0">
        <Image
          src={mobileImage}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center bottom"
          placeholder="blur"
          priority={true}
        />
      </div>
      
    </section>
  )
}
export default Hero
