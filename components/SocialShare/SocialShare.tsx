// import React, { useState } from 'react'
// import {
//   FacebookShareButton,
//   WhatsappShareButton,
//   TwitterShareButton,
//   EmailShareButton,
// } from 'react-share'
// import Icon from '@components/lib/Icon'
// import styled from 'styled-components'
// import { isBrowser } from 'react-device-detect'

// type SocialShareProps = {
//   url?: string
// }
// const SocialShare: React.FC<SocialShareProps> = ({ url }) => {
//   const location = url
//     ? url
//     : typeof window !== `undefined`
//     ? window.location.href
//     : ''
//   const [open, setOpen] = useState(false)

//   return (
//     <div
//       className="w-72 relative py-2"
//       onClick={() => {
//         !isBrowser && setOpen(!open)
//       }}
//       onMouseEnter={() => {
//         isBrowser && setOpen(true)
//       }}
//       onMouseLeave={() => {
//         isBrowser && setOpen(false)
//       }}
//     >
//       <ShareIcon
//         as={FacebookShareButton}
//         open={open}
//         index={1}
//         url={location}
//         key={'facebook'}
//       >
//         <Icon icon="facebook" size={'s'} bgColor="grey" />
//       </ShareIcon>
//       <ShareIcon
//         as={WhatsappShareButton}
//         open={open}
//         index={2}
//         url={location}
//         key={'whatsapp'}
//       >
//         <Icon icon="whatsApp" size={'s'} bgColor="grey" />
//       </ShareIcon>
//       <ShareIcon
//         as={TwitterShareButton}
//         open={open}
//         index={3}
//         url={location}
//         key={'twitter'}
//       >
//         <Icon icon="twitter" size={'s'} bgColor="grey" />
//       </ShareIcon>
//       <ShareIcon
//         as={EmailShareButton}
//         open={open}
//         index={4}
//         url={location}
//         key={'mail'}
//       >
//         <Icon icon="email" size={'s'} bgColor="grey" />
//       </ShareIcon>
//       <MainIcon open={open} key={'main'}>
//         <Icon icon="share" bgColor="grey" />
//       </MainIcon>
//     </div>
//   )
// }

// export default SocialShare

// const ShareIcon = styled.div<{ open: boolean; as: any; index: number }>`
//   position: absolute;
//   bottom: 20%;
//   transition: transform 0.3s cubic-bezier(0.41, 0.61, 0, 1.51),
//     opacity 0.3s cubic-bezier(0, 1.13, 0, 1);

//   transform: ${({ open, index }) =>
//     open && `translate3d( ${index * 110}% ,10px, 0)`};
//   opacity: ${({ open }) => (open ? 1 : 0)};
//   left: ${({ open }) => (open ? '30px' : 0)};
//   z-index: -1;
//   z-index: ${({ open }) => (open ? 1 : -1)};
// `

// const MainIcon = styled.div<{ open: boolean }>`
//   width: fit-content;
//   transition: transform 0.3s;

//   ${({ open }) => open && 'transform: rotate(360deg) scale(1.1)'}
// `

export {}
