import FridaImage from '@components/fridaImage/FridaImage'
import React from 'react'
import { FridaLocation } from 'types'
import Carousel from '@components/Carousel'
import ArtworkCard from 'contentTypes/Artwork/ArtworkCard'
import Section from '@components/Section'
import Button from '@components/buttons/button'
import { ArtistPageResult } from '@pages/artist/[...slug]'

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
          className="h-vh w-full"
        />
      )}

      <Section className="pb-20" backgroundColor="white">
        <h1 className="header-medium text-frida-pink pt-10 pb-8">
          <span className="text-frida-black">#Meet</span>
          {name}
        </h1>
        {_description && <p className="text-base-fluid">{_description}</p>}
        <div className="flex flex-wrap justify-center md:justify-start  ">
          {webLink && (
            <Button
              label="Website"
              type="externalLink"
              link={webLink}
              color="red"
              backgroundColor="white"
              className=" md:mb-0 md:mr-3"
            />
          )}
          {instagramLink && (
            <Button
              label="Instagram"
              type="externalLink"
              link={instagramLink}
              color="red"
              backgroundColor="white"
              className=" md:mr-3"
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
