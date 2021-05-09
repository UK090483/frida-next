import React from 'react'
import BigButton from '../../lib/buttons/bigButton'

const BigButtons: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div
      className={`transform-gpu transition-transform  ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BigButton></BigButton>
    </div>
  )
}

export default BigButtons
