import Section from '@components/Section'
import { ArtworkSingleViewResult } from 'PageTypes/Artwork/ArtworkSingle/artworksQueries'
import Carousel from '@components/CardCarousel'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import React from 'react'
import Button from '@components/buttons/button'
import ArtworkHero from './ArtworkHero'
import Quotes from '@components/Quote/Quotes'
import { useArtworks } from 'pageBuilder/Api/useResource'
import { useRouter } from 'next/router'

interface ArtworkSingleProps extends ArtworkSingleViewResult {
  isModal?: boolean
}

const ArtworkSingle: React.FC<ArtworkSingleProps> = (props) => {
  const {
    relatedArtworks,
    randomArtworks,
    artistDescription,
    artistSlug,
    description,
    artistName,
    artistWebLink,
    instagramLink,
    quotes,
  } = props

  const { locale } = useRouter()
  const [fetchedArtworks] = useArtworks()

  const moreArtworks =
    fetchedArtworks.length > 0 ? fetchedArtworks : randomArtworks

  return (
    <>
      <ArtworkHero artwork={props} />
      {description && (
        <Section
          data-testid={'artwork__description'}
          className="horizontal-padding"
          backgroundColor="grey"
          type="text"
        >
          <h2 className="font-bold text-lg-fluid">
            {locale === 'en' ? `About the Artwork` : `Über das Kunstwerk`}
          </h2>
          <p className="whitespace-pre-line text-base-fluid">{description}</p>
        </Section>
      )}

      <Section
        data-testid={'artwork__artistDescription'}
        className="horizontal-padding"
        backgroundColor="pink"
        type="text"
      >
        <h2 className="font-bold text-lg-fluid">
          {locale === 'en' ? `About the Artist` : `Über den Künstler`}
        </h2>
        {artistDescription && (
          <p className="whitespace-pre-line text-base-fluid">
            {artistDescription}
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
            locale === 'en'
              ? `More Artworks by ${artistName}`
              : `Weitere Werke von ${artistName}`
          }
          items={relatedArtworks.map((item) => (
            <ArtworkCard key={item.slug} type="carousel" {...item} />
          ))}
        />
      )}

      {moreArtworks.length > 0 && (
        <Carousel
          bgColor="pink"
          header={locale === 'en' ? `More Artworks` : `Weitere Werke`}
          items={moreArtworks.map((item) => (
            <ArtworkCard key={item.slug} type="carousel" {...item} />
          ))}
        />
      )}
    </>
  )
}

export default ArtworkSingle
