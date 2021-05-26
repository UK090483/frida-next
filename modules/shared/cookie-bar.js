// import React, { useEffect, useState } from 'react'
// import { AnimatePresence, m } from 'framer-motion'
// import Cookies from 'js-cookie'

// import { useHasMounted } from '@lib/helpers'
// import CustomLink from '@components/link'

// const barAnim = {
//   show: {
//     y: '0%',
//     transition: {
//       duration: 0.6,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
//   hide: {
//     y: '100%',
//     transition: {
//       duration: 0.6,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// }

// const CookieBar = React.memo(({ data = {} }) => {
//   const { message = 'blaaa', link } = data

//   const hasMounted = useHasMounted()
//   const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

//   if (!hasMounted || !message) return null

//   return (
//     <AnimatePresence>
//       {!acceptedCookies && (
//         <m.div
//           initial="hide"
//           animate="show"
//           exit="hide"
//           variants={barAnim}
//           role="dialog"
//           aria-live="polite"
//           className="fixed left-0 right-0 bottom-0 bg-frida-pink z-90 p-4 w-full "
//         >
//           <div className="grid gap-6 sm:flex items-center p-6 pb-4 sm:p-6 rounded-lg bg-pageText text-pageBG border">
//             <div className="flex-1 sm:pr-8 text-center sm:text-left">
//               <p>
//                 {message.split('\n').map((text, i) => {
//                   // using React.fragment to parse line breaks
//                   return (
//                     <React.Fragment key={i}>
//                       {text}
//                       {message.split('\n')[i + 1] && <br />}
//                     </React.Fragment>
//                   )
//                 })}
//               </p>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-1 flex-shrink-0">
//               {link && (
//                 <CustomLink
//                   className="btn is-text"
//                   link={{ ...{ page: link }, ...{ title: 'Learn More' } }}
//                 />
//               )}
//               <button
//                 onClick={() => onAcceptCookies()}
//                 className="btn is-primary is-inverted"
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         </m.div>
//       )}
//     </AnimatePresence>
//   )
// })

// function useAcceptCookies(cookieName = 'accept_cookies') {
//   const [acceptedCookies, setAcceptedCookies] = useState(true)

//   useEffect(() => {
//     if (!Cookies.get(cookieName)) {
//       setAcceptedCookies(false)
//     }
//   }, [])

//   const acceptCookies = () => {
//     setAcceptedCookies(true)
//     Cookies.set(cookieName, 'accepted', { expires: 365 })
//   }

//   return {
//     acceptedCookies,
//     onAcceptCookies: acceptCookies,
//   }
// }

// export default CookieBar
export {}
