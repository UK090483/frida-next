// import * as React from 'react'

// import { theme } from 'tailwind.config'

// const ShowBreakingPoints: React.FC = () => {
//   const [w, setW] = React.useState(0)

//   React.useEffect(() => {
//     if (window) {
//       const checkSize = () => {
//         setW(window.innerWidth)
//       }
//       checkSize()
//       window.onresize = checkSize
//     }
//   }, [])

//   return (
//     <div className="fixed bottom-0 right-0">
//       <div>{`${w}`}</div>
//       <div className="flex w-10 overflow-hidden justify-end items-center   border border-gray-400 rounded  bg-gray-300 text-pink-600 text-sm">
//         {theme &&
//           theme.screens &&
//           Object.entries(theme.screens).map(([name], index) => (
//             <span
//               key={name}
//               className={`px-3 ${
//                 index === 0 ? '' : 'hidden'
//               } ${name}:inline  font-extrabold`}
//             >
//               {name}
//             </span>
//           ))}
//       </div>
//     </div>
//   )
// }

// export default ShowBreakingPoints

export {}
