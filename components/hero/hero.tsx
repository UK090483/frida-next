import React from "react"
import { FridaColors } from "../../types"
import Section from "../container/section"

type HeroProps = {
  backgroundColor: FridaColors
  height?: string
  bgImage?: React.ReactNode
}

const Hero: React.FC<HeroProps> = ({
  children,
  backgroundColor,
  height = "full",
  bgImage,
}) => {
  return (
    <Section type="full" backgroundColor={backgroundColor}>
      <div className={`h-screen pt-20 px-10 md:px-20 flex items-center`}>
        {/* {bgImage && <BackgroundImage image={bgImage} />} */}
        <div> {children}</div>
      </div>
    </Section>
  )
}

export default Hero
