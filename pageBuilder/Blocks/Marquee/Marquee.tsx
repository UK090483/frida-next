import Marquee from 'components/marquee'
import React from 'react'

import { MarqueeBlockQueryResult } from './Marquee.query'

const MarqueeBlock: React.FC<MarqueeBlockQueryResult> = (props) => {
  return <Marquee data={{ ...props }} />
}
export default MarqueeBlock
