import * as React from 'react'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'
import Icon from '../Icon'

type ButtonNavProps = {
  setNext: () => void
  setPrev: () => void
  className?: string
}

const ButtonNav: React.FC<ButtonNavProps> = ({ setNext, setPrev }) => {
  return (
    <div className="flex justify-between w-20 md:w-28 pointer-events-auto">
      <Icon {...mouseLinkProps} icon="arrowLeft" onClick={setPrev} />
      <Icon {...mouseLinkProps} icon="arrowRight" onClick={setNext} />
    </div>
  )
}

export default ButtonNav
