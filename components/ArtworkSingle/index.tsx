import React from 'react'
import ArtistLinks from './ArtistLinks/artistLinks'
import ArtworkHero from './ArtworkHero'
import RelatedArtworks from './relatedArtworks/RealatetArtworks'
import Section from '@components/container/section'
type ArtworkSingleProps = {
  artwork: any
  relatedArtworks: any[]
  randomArtworks: any[]
  quotes: any[]
  shopifyProduct: any
  isModal: boolean
}

const ArtworkSingle: React.FC<ArtworkSingleProps> = ({
  artwork,
  relatedArtworks,
  randomArtworks,
  quotes,
  shopifyProduct,
}) => {
  const { artistDescription, description } = artwork

  return (
    <>
      <ArtworkHero artwork={artwork} shopifyProduct={shopifyProduct} />

      {description && (
        <Section className="py-16" backgroundColor="grey" type="text">
          <h2 className="text-lg-fluid font-bold">Über das Kunstwerk</h2>
          <p className="text-base-fluid">{description}</p>
        </Section>
      )}

      <Section className="py-16" backgroundColor="pink" type="text">
        <h2 className="text-lg-fluid font-bold">Über den Künstler</h2>
        {artistDescription && (
          <p className="text-base-fluid">{artistDescription}</p>
        )}
        <ArtistLinks artwork={artwork} />
      </Section>

      {/* {quotes.map(quote => (
        <ArtworkQuote key={quote.id} quote={quote} />
      ))} */}
      {relatedArtworks.length > 0 && (
        <RelatedArtworks
          artworks={relatedArtworks}
          header={'Weitere Werke des Künstlers'}
          bgColor="grey"
        />
      )}
      <RelatedArtworks
        artworks={randomArtworks}
        header={'Diese Werke könnten Dir auch gefallen'}
        bgColor={'pink'}
      />
      {/* <Spacer /> */}
    </>
  )
}

export default ArtworkSingle

// const Spacer = styled.div`
//   height: 100px;
//   background-color: ${({ theme }) => theme.colors.pink};
//   @media ${({ theme }) => theme.device.laptopM} {
//     height: 0;
//   }
// `

// const TextSection = styled.div`
//   padding: 50px 20px;
//   max-width: 1000px;
//   margin: 0 auto;
// `
