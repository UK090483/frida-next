// import { navigate } from "gatsby"
// import React, { useContext } from "react"
// import shopContext from "../../context/shopifyContext"
// import ShopIcon from "../../assets/shop_icon.svg"
// import { mouseLinkProps } from "../generic/Mouse/mouseRemote"

// export default function CheckOutLink() {
//   const shop = useContext(shopContext)

//   const {
//     store: { lineItems },
//   } = shop

//   return (
//     <>
//       {lineItems.length > 0 && (
//         <div
//           onMouseDown={() => {
//             navigate("/checkout")
//           }}
//           {...mouseLinkProps}
//           className="bg-frida-white w-12 h-12 rounded-full p-1 pointer-events-auto "
//         >
//           <ShopIcon></ShopIcon>

//           <div className="absolute top-4 left-0 right-0 bottom-0 flex justify-center  items-center">
//             {shop.store.lineItems.length}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

export {}
