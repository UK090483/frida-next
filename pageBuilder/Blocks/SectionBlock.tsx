import React from "react"
import Section from "../../components/container/section"
import { FridaColors } from "../../types"
import { spaceToTailwind } from "../helper/spaceToTailwind"
import ContentParser from "../ContentParser"

type SectionBlockProps = {
  type: "text" | "full"
  bgColor: FridaColors
  content: any
  content_en?: any
  bottomSpace: string
  topSpace: string
  lang: string
}

const SectionBlock: React.FC<SectionBlockProps> = props => {
  const {
    type,
    bgColor,
    content,
    bottomSpace,
    topSpace,
    lang,
    content_en,
  } = props

  const _content = lang === "en" && content_en ? content_en : content

  return (
    <Section
      className={`${spaceToTailwind(topSpace, "pt")} ${
        bottomSpace ? spaceToTailwind(bottomSpace, "pb") : "pb-0.5"
      }`}
      type={type}
      backgroundColor={bgColor || "white"}
    >
      {content && <ContentParser lang={lang} content={_content} />}
    </Section>
  )
}

export default SectionBlock
