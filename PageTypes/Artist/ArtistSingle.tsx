import Button from '@components/buttons/button'
import Carousel from '@components/CardCarousel'
import Photo from '@components/Photo'
import Section from '@components/Section'
import { ImageMetaResult } from '@lib/queries/snippets'
import { ArtistPageResult } from '@pages/artist/[...slug]'
import classNames from 'classnames'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaLocation } from 'types'

interface ArtistSingleProps extends ArtistPageResult {
  lang: FridaLocation
}

const ArtistSingle: React.FC<ArtistSingleProps> = (props) => {
  const { relatedArtworks, lang, content, mainImage } = props

  const heroImage =
    mainImage && mainImage.asset
      ? mainImage
      : relatedArtworks && relatedArtworks[1] && relatedArtworks[1].photo

  if (content && content.length > 0) {
    return (
      <BodyParser
        lang={lang}
        content={content}
        extraComponents={{
          artistHero: <ArtistHero photo={heroImage} />,
          artistInfo: <ArtistInfo {...props} />,
          artistWorks: <ArtistWorks {...props} />,
          artistImages: <ArtistImages {...props} />,
        }}
      />
    )
  }

  return (
    <>
      <ArtistHero photo={heroImage} />
      <ArtistInfo {...props} />
      <ArtistImages {...props} />
      <ArtistWorks {...props} />
    </>
  )
}

export default ArtistSingle

type ArtistHeroProps = {
  photo?: ImageMetaResult
}
const ArtistHero: React.FC<ArtistHeroProps> = ({ photo }) => {
  return (
    <div data-color="white">
      {photo && (
        <div className="h-vh w-full">
          <Photo photo={photo} layout="fill" />
        </div>
      )}
    </div>
  )
}

const ArtistInfo: React.FC<ArtistSingleProps> = (props) => {
  const { lang, description, description_en, webLink, instagramLink, name } =
    props

  const _description =
    lang === 'en' && description_en ? description_en : description
  return (
    <>
      <Section className="pb-20" backgroundColor="white" type="text">
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
    </>
  )
}

const ArtistImages: React.FC<ArtistSingleProps> = (props) => {
  const { relatedArtworks } = props
  return (
    <Section>
      <div className="flex flex-row flex-wrap md:grid  grid-cols-11 grid-rows-5  w-full h-vh py-12">
        {relatedArtworks.slice(2, 4).map((item, index) => {
          return (
            <div
              key={item.slug}
              className={classNames(
                `relative w-full`,
                {
                  'col-start-1 col-span-7  row-start-1 row-span-3': index === 1,
                },
                {
                  'col-start-5 col-span-7 row-start-3 row-span-3': index === 0,
                }
              )}
            >
              {<Photo photo={item.photo} layout="fill" />}
            </div>
          )
        })}
      </div>
    </Section>
  )
}

const ArtistWorks: React.FC<ArtistSingleProps> = (props) => {
  const { relatedArtworks, lang, name } = props

  return (
    <>
      {relatedArtworks && relatedArtworks.length > 0 && (
        <Carousel
          header={lang === 'en' ? `Works by ${name}` : `Arbeiten von ${name}`}
          items={relatedArtworks.map((item) => (
            <ArtworkCard key={item.slug} type="carousel" {...item} />
          ))}
        />
      )}
    </>
  )
}