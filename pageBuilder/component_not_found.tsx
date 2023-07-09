import React from 'react'
import isDevelopment from 'utility/isDevelopment'
type ComponentNotFoundProps = {
  blok: any
}
const ComponentNotFound: React.FC<ComponentNotFoundProps> = ({ blok }) => {
  if (!isDevelopment) {
    return null
  }

  console.log(blok)

  return (
    <div
      style={{ backgroundColor: 'red' }}
      className="h-96 flex justify-center items-center  border-2 "
    >
      Component {blok.type} is not defined. Add it to components.js
    </div>
  )
}

export default ComponentNotFound

export {}
