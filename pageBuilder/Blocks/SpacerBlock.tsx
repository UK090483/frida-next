import React from "react"
import { spaceToTailwind } from "../helper/spaceToTailwind"

type SpacerBlockProps = {
  size: string
}
const SpacerBlock: React.FC<SpacerBlockProps> = props => {
  const { size } = props

  return <div className={`${spaceToTailwind(size, "py")}`} />
}

export default SpacerBlock
