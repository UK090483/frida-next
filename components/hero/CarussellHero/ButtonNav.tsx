import * as React from "react"
import { mouseLinkProps } from "../../generic/Mouse/mouseRemote"
import Icon from "../../lib/Icon"

type ButtonNavProps = {
  setNext: () => void
  setPrev: () => void
}

const ButtonNav: React.FC<ButtonNavProps> = ({ setNext, setPrev }) => {
  return (
    <div className="flex justify-between w-28 absolute bottom-7 right-5">
      <Icon {...mouseLinkProps} icon="arrowLeft" onClick={setPrev} />
      <Icon {...mouseLinkProps} icon="arrowRight" onClick={setNext} />
    </div>
  )
}

export default ButtonNav
