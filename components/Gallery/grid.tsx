import React from 'react'
import Masonry from 'react-masonry-css'

const Grid: React.FC = ({ children }) => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1160: 2,
        820: 1,
      }}
      columnClassName="max-w-md mx-auto"
      className="flex   xl:px-frida_7% "
      role="list"
    >
      {children}
    </Masonry>
  )
}

export default Grid
