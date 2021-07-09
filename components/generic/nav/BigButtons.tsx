import React from 'react'
import BigButton from '../../buttons/bigButton'

const BigButtons: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div
      className={`transform-gpu transition-transform  ${
        open ? 'translate-y-0' : 'translate-y-60'
      }`}
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BigButton></BigButton>
    </div>
  )
}

export default BigButtons
