import * as React from 'react'

import { theme } from 'tailwind.config'

export interface IShowBreakingPointsProps {}

const ShowBreakingPoints: React.FC<IShowBreakingPointsProps> = () => {
  return (
    <div className="flex w-10 overflow-hidden justify-end items-center  fixed bottom-0 right-0 border border-gray-400 rounded  bg-gray-300 text-pink-600 text-sm">
      {theme &&
        theme.screens &&
        Object.entries(theme.screens).map(([name], index) => (
          <span
            key={name}
            className={` px-3 ${
              index === 0 ? '' : 'hidden'
            } ${name}:inline  font-extrabold`}
          >
            {name}
          </span>
        ))}
    </div>
  )
}

export default ShowBreakingPoints
