import React from 'react'

import Layout from '@components/layout'
import { getStaticPage, modules } from '@lib/api'

import { Module } from '@modules/index'

const ErrorPage = () => {
  return <div>404</div>
}

// export async function getStaticProps({ preview, previewData }) {
//   const pageData = await getStaticPage(
//     `
//     *[_type == "errorPage"] | order(_updatedAt desc)[0]{
//       modules[]{
//         ${modules}
//       },
//       seo
//     }
//   `,
//     {
//       active: preview,
//       token: previewData?.token,
//     }
//   )

//   return {
//     props: {
//       data: pageData,
//     },
//   }
// }

export default ErrorPage
