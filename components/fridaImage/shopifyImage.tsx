// function getShopifyImage(src: string, size: string) {
//   if (!size) {
//     console.error(
//       "second argument size need to be existend in getShopifyImage.js"
//     )
//   }
//   return src
//     .replace(
//       /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
//       "."
//     )
//     .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
//       return "_" + size + match
//     })
// }

// const getFluidShopifyImage = (
//   src = "",
//   size: string,
//   aspectRatio: number = 1
// ) => {
//   const res = {
//     sizes: `(max-width: 400px) 100vw, 400px`,
//     aspectRatio: getAspectRatio(src),
//     base64: getShopifyImage(src, `20x`),
//     src: getShopifyImage(src, `400x`),
//     srcSet: buildSrcSet(src),
//   }
//   return res
// }

// const getAspectRatio = (src: string) => {
//   const size = src.match(/[0-9]{1,4}x[0-9]{1,4}/)
//   if (!size) return 1
//   const [w, h] = size[0].split("x")

//   return w / h
// }

// const buildSrcSet = (src: string) => {
//   const sizes = [200, 400, 600, 800, 1000, 1200]

//   return sizes.reduce((acc, size) => {
//     return `${acc}${getShopifyImage(src, `${size}x`)} ${size}w, `
//   }, "")
// }
// export { getShopifyImage, getFluidShopifyImage }

export {}
