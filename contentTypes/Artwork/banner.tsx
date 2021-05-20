import React from 'react'
import { Marqy } from 'marqy'

const Banner: React.FC = () => {
  return (
    <div className="bg-frida-pink">
      <Marqy speed={1} direction={false ? 'right' : 'left'} pauseOnHover={true}>
        {[<div key={'fist'}>Hinz&Kunzt – Straßen-KunztEdition </div>]}
      </Marqy>
    </div>
  )
}

export default Banner
