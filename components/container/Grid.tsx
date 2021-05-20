import React from 'react'
import Masonry from 'react-masonry-css'

interface GridProps {}
const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1700: 2,
        1300: 1,
      }}
      columnClassName="max-w-md mx-auto"
      className="flex section_padding "
    >
      {children}
    </Masonry>
  )
}

export default Grid
