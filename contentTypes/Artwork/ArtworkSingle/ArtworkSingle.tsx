import Section from '@components/container/section'
import { ArtworkSingleViewResult } from '@lib/queries/artworksQueries'
import Carousel from 'components/CardCarousel/Carousel'
import ArtworkCard from 'contentTypes/Artwork/ArtworkCard'
import React from 'react'
import Button from 'components/lib/buttons/button'
import { FridaLocation } from 'types'
import ArtworkHero from './ArtworkHero'

interface ArtworkSingleProps extends ArtworkSingleViewResult {
  lang: FridaLocation
  shopifyProduct?: any
  isModal?: boolean
}

const ArtworkSingle: React.FC<ArtworkSingleProps> = ({
  artwork,
  relatedArtworks,
  randomArtworks,
  lang,
  shopifyProduct,
}) => {
  const {
    artistDescription,
    description,
    description_en,
    artistDescription_en,
    artistName,
    artistWebLink,
    instagramLink,
  } = artwork

  const _description =
    lang === 'en' && description_en ? description_en : description

  const _artistDescription =
    lang === 'en' && artistDescription_en
      ? artistDescription_en
      : artistDescription
  return (
    <>
      <ArtworkHero
        lang={lang}
        artwork={artwork}
        shopifyProduct={shopifyProduct}
      />

      {_description && (
        <Section className="py-16" backgroundColor="grey" type="text">
          <h2 className="text-lg-fluid font-bold">
            {lang === 'en' ? `About the Artwork` : `Über das Kunstwerk`}
          </h2>
          <p className="text-base-fluid">{_description}</p>
        </Section>
      )}

      <Section className="py-16" backgroundColor="pink" type="text">
        <h2 className="text-lg-fluid font-bold">
          {lang === 'en' ? `About the Artist` : `Über den Künstler`}
        </h2>
        {_artistDescription && (
          <p className="text-base-fluid">{_artistDescription}</p>
        )}
        <div className="flex">
          {artistWebLink && (
            <Button
              label="Website"
              type="externalLink"
              link={artistWebLink}
              color="red"
              backgroundColor="white"
              className="mr-3"
            />
          )}
          {instagramLink && (
            <Button
              label="Instagram"
              type="externalLink"
              link={instagramLink}
              color={'red'}
              backgroundColor="white"
              className="mr-3"
            />
          )}
        </div>
      </Section>

      {relatedArtworks.length > 0 && (
        <Carousel
          header={
            lang === 'en'
              ? `More Artworks by ${artistName}`
              : `Weitere Werke von ${artistName}`
          }
          items={relatedArtworks.map((item) => (
            <ArtworkCard type="carousel" {...item} />
          ))}
        />
      )}

      {randomArtworks.length > 0 && (
        <Carousel
          bgColor="pink"
          header={lang === 'en' ? `More Artworks` : `Weitere Werke`}
          items={randomArtworks.map((item) => (
            <ArtworkCard type="carousel" {...item} />
          ))}
        />
      )}
    </>
  )
}

export default ArtworkSingle
