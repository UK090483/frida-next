import Section from '@components/Section'
import { ArtworkSingleViewResult } from 'PageTypes/Artwork/ArtworkSingle/artworksQueries'
import Carousel from '@components/CardCarousel'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import React from 'react'
import Button from '@components/buttons/button'
import { FridaLocation } from 'types'
import ArtworkHero from './ArtworkHero'
import Quotes from '@components/Quote/Quotes'

interface ArtworkSingleProps extends ArtworkSingleViewResult {
  lang: FridaLocation
  isModal?: boolean
}

const ArtworkSingle: React.FC<ArtworkSingleProps> = (props) => {
  const {
    relatedArtworks,
    randomArtworks,
    lang,
    artistDescription,
    artistSlug,
    description,
    description_en,
    artistDescription_en,
    artistName,
    artistWebLink,
    instagramLink,
    quotes,
  } = props

  const _description =
    lang === 'en' && description_en ? description_en : description

  const _artistDescription =
    lang === 'en' && artistDescription_en
      ? artistDescription_en
      : artistDescription
  return (
    <>
      <ArtworkHero lang={lang} artwork={props} />

      {_description && (
        <Section
          className="horizontal-padding"
          backgroundColor="grey"
          type="text"
        >
          <h2 className="font-bold text-lg-fluid">
            {lang === 'en' ? `About the Artwork` : `Über das Kunstwerk`}
          </h2>
          <p className="whitespace-pre-line text-base-fluid">{_description}</p>
        </Section>
      )}

      <Section
        className="horizontal-padding"
        backgroundColor="pink"
        type="text"
      >
        <h2 className="font-bold text-lg-fluid">
          {lang === 'en' ? `About the Artist` : `Über den Künstler`}
        </h2>
        {_artistDescription && (
          <p className="whitespace-pre-line text-base-fluid">
            {_artistDescription}
          </p>
        )}
        <div className="flex flex-col flex-wrap items-center pt-16 md:flex-row">
          {artistSlug && (
            <Button
              size="s"
              label="Artist Page"
              type="link"
              link={`/artist/${artistSlug}`}
              color="black"
              backgroundColor="pink"
              position="auto"
              className="mb-4 mr-0 md:mb-0 md:mr-3"
            />
          )}
          {artistWebLink && (
            <Button
              size="s"
              label="Website"
              type="externalLink"
              link={artistWebLink}
              color="black"
              position="auto"
              backgroundColor="pink"
              className="mb-4 mr-0 md:mb-0 md:mr-3"
            />
          )}
          {instagramLink && (
            <Button
              size="s"
              label="Instagram"
              type="externalLink"
              link={instagramLink}
              color={'black'}
              position="auto"
              backgroundColor="pink"
              className="mb-2 mr-0 md:mb-0 md:mr-3"
            />
          )}
        </div>
      </Section>
      {quotes.length > 0 && <Quotes items={quotes} />}

      {relatedArtworks.length > 0 && (
        <Carousel
          header={
            lang === 'en'
              ? `More Artworks by ${artistName}`
              : `Weitere Werke von ${artistName}`
          }
          items={relatedArtworks.map((item) => (
            <ArtworkCard
              key={item.slug}
              type="carousel"
              {...item}
              lang={lang}
            />
          ))}
        />
      )}

      {randomArtworks.length > 0 && (
        <Carousel
          bgColor="pink"
          header={lang === 'en' ? `More Artworks` : `Weitere Werke`}
          items={randomArtworks.map((item) => (
            <ArtworkCard
              key={item.slug}
              type="carousel"
              {...item}
              lang={lang}
            />
          ))}
        />
      )}
    </>
  )
}

export default ArtworkSingle
