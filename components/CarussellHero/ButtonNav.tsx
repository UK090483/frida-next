import * as React from 'react'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'
import Icon from '../Icon'

type ButtonNavProps = {
  setNext: () => void
  setPrev: () => void
}

const ButtonNav: React.FC<ButtonNavProps> = ({ setNext, setPrev }) => {
  return (
    <div className=" h-s h-screen absolute top-0 flex items-end right-0 pointer-events-none">
      <div className="flex justify-between w-20 md:w-28 mb-3 mr-3 pointer-events-auto">
        <Icon {...mouseLinkProps} icon="arrowLeft" onClick={setPrev} />
        <Icon {...mouseLinkProps} icon="arrowRight" onClick={setNext} />
      </div>
    </div>
  )
}

export default ButtonNav
