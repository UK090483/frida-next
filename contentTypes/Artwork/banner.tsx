import React from 'react'

import Marquee from 'react-fast-marquee'

const Banner: React.FC = () => {
  return (
    <div className="bg-frida-pink ">
      <Marquee
        gradient={false}
        speed={100}
        direction={false ? 'right' : 'left'}
        pauseOnHover={true}
      >
        {[<div key={'fist'}>Hinz&Kunzt – Straßen-KunztEdition </div>]}
      </Marquee>
    </div>
  )
}

export default Banner
