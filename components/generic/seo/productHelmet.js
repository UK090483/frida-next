import React from "react"
// import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
// import { GatsbySeo, ProductJsonLd } from "gatsby-plugin-next-seo"
// import { getFluidImage, urlFor } from "../../fridaImage/sanityImage"

function ProductHelmet({ path, artwork, product }) {
  const { site } = useStaticQuery(
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

  const { title, description, image, price } = artwork
    ? prepareArtwork(artwork)
    : prepareProduct(product)

  const { siteUrl } = site.siteMetadata

  return (
    <React.Fragment>
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
        <meta name="image" content={image.url} />
        <link rel="canonical" href={siteUrl + path} />
        {/* OpenGraph tags */}

        <meta property="og:url" content={siteUrl + path} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image.url} />
        {image.width && (
          <meta property="og:image:width" content={image.width} />
        )}
        {image.height && (
          <meta property="og:image:height" content={image.height} />
        )}
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={price} />

        <meta property="product:price:currency" content="EUR" />
        <meta property="product:availability" content="in stock" />

        {/* <meta property="fb:app_id" content={seo.social.fbAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image.url} />
      </Helmet>
    </React.Fragment>
  )
}

const description = title => `Kaufen Sie "${title}" jetz auf #MeetFrida.art`

const prepareArtwork = artwork => {
  const { artworkName, artistName, medium, stil, price } = artwork

  const title = `${artworkName} von ${artistName}: ${medium},${stil}`

  return {
    title,
    description: description(title),
    price,
    image: getArtworkImage(artwork),
  }
}
const prepareProduct = product => {
  const { title: raw_title, variants } = product

  const title = `${raw_title}`

  return {
    title,
    description: description(title),
    price: variants[0] ? variants[0].price : 0,
    image: getProductImage(product),
  }
}

const getArtworkImage = artwork => {
  const {
    artworkName,
    artistName,
    image: { imageAssetId },
  } = artwork

  // const fluidImg = urlFor(imageAssetId).width(1200).url()
  // const aspectRatio = getFluidImage(imageAssetId, {}).aspectRatio

  const preparedImage = {
    // url: fluidImg,
    width: 1200,
    height: 1200,
    alt: `Kunstwerk "${artworkName}" von ${artistName}`,
  }
  return preparedImage
}

const getProductImage = product => {
  const { images, title } = product

  const preparedImage = {
    url: images[0] ? images[0].src : "",
    width: null,
    height: null,
    alt: `${title}`,
  }
  return preparedImage
}

// SEO.defaultProps = {
//   lang: `de`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
//   path: PropTypes.string.isRequired,
// }

export default ProductHelmet
