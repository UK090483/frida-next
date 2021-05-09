import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default function PageHelmet({ path, title }) {
  const { site, fridalogo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        fridalogo: file(relativePath: { eq: "meetfridaLogo.png" }) {
          size
          childImageSharp {
            original {
              src
              height
              width
            }
          }
        }
      }
    `
  )

  const { siteUrl, description } = site.siteMetadata

  const preparedImage = {
    url: siteUrl + fridalogo.childImageSharp.original.src,
    width: fridalogo.childImageSharp.original.width,
    height: fridalogo.childImageSharp.original.height,
    alt: "#meetFrida Logo",
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: "de",
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={preparedImage.url} />
      <link rel="canonical" href={siteUrl + path} />
      {/* OpenGraph tags */}

      <meta property="og:url" content={siteUrl + path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={preparedImage.url} />
      <meta property="og:image:width" content={"1200"} />
      <meta property="og:image:height" content={preparedImage.height} />
      <meta property="og:type" content="website" />

      {/* <meta property="fb:app_id" content={seo.social.fbAppID} />

  {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:creator" content={seo.social.twitter} /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={preparedImage.url} />
    </Helmet>
  )
}
