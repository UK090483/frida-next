import FridaImage from '@components/fridaImage/FridaImage'
import { ArtistPageResult } from '@lib/queries/artistQueries'
import React from 'react'
import { FridaLocation } from 'types'
import Carousel from 'components/CardCarousel/Carousel'
import ArtworkCard from 'contentTypes/Artwork/ArtworkCard'
import Section from '@components/container/section'

import Button from 'components/lib/buttons/button'

interface ArtistSingleProps extends ArtistPageResult {
  lang: FridaLocation
}

const ArtistSingle: React.FC<ArtistSingleProps> = (props) => {
  const {
    relatedArtworks,
    lang,
    description,
    description_en,
    webLink,
    instagramLink,
    name,
  } = props

  const _description =
    lang === 'en' && description_en ? description_en : description

  return (
    <>
      {relatedArtworks && (
        <FridaImage
          photo={relatedArtworks[1]?.photo}
          layout="fill"
          className="h-vh"
        />
      )}

      <Section className="pb-20" backgroundColor="white">
        <h1 className="header-medium text-frida-pink pt-10 pb-8">
          <span className="text-frida-black">#Meet</span>
          {name}
        </h1>
        {_description && <p className="text-base-fluid">{_description}</p>}
        <div className="flex">
          {webLink && (
            <Button
              label="Website"
              type="externalLink"
              link={webLink}
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

      {relatedArtworks && relatedArtworks.length > 0 && (
        <Carousel
          header={lang === 'en' ? `Works by ${name}` : `Arbeiten von ${name}`}
          items={relatedArtworks.map((item) => (
            <ArtworkCard type="carousel" {...item} />
          ))}
        />
      )}
    </>
  )
}

export default ArtistSingle
