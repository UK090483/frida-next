import Button from '@components/buttons/button'
import Carousel from '@components/CardCarousel'
import Photo from '@components/Photo'
import Section from '@components/Section'
import { ImageMetaResult } from 'pageBuilder/queries/snippets'

import classNames from 'classnames'
import ArtworkCard from 'PageTypes/Artwork/ArtworkCard'
import BodyParser from 'pageBuilder/BodyParser'
import React from 'react'
import { FridaColors } from 'types'
import Quotes from '@components/Quote/Quotes'
import { useRouter } from 'next/router'
import { ArtistPageResult } from './ArtistSingle.query'

type ArtistSingleProps = ArtistPageResult

const ArtistSingle: React.FC<ArtistSingleProps> = (props) => {
  const { relatedArtworks, content, mainImage, initBgColor, quotes } = props

  const _initBgColor = initBgColor ? initBgColor : 'white'

  const heroImage =
    mainImage && mainImage.asset
      ? mainImage
      : relatedArtworks && relatedArtworks[0] && relatedArtworks[0].photo

  if (content && content.length > 0) {
    return (
      <BodyParser
        content={content}
        extraComponents={{
          artistHero: (
            <ArtistHero photo={heroImage} initBgColor={_initBgColor} />
          ),
          artistInfo: <ArtistInfo {...props} />,
          artistWorks: <ArtistWorks {...props} />,
          artistImages: <ArtistImages {...props} />,
        }}
      />
    )
  }

  return (
    <>
      <ArtistHero photo={heroImage} initBgColor={_initBgColor} />
      <ArtistInfo {...props} />
      {/* <ArtistImages {...props} /> */}
      <ArtistWorks {...props} />
      {quotes.length > 0 && <Quotes items={quotes} />}
    </>
  )
}

export default ArtistSingle

type ArtistHeroProps = {
  photo?: ImageMetaResult
  initBgColor: FridaColors
}
const ArtistHero: React.FC<ArtistHeroProps> = ({ photo, initBgColor }) => {
  return (
    <div data-testid={'artist_hero'} data-color={initBgColor}>
      {photo && (
        <div className="relative hero">
          <Photo photo={photo} layout="fill" />
        </div>
      )}
    </div>
  )
}

const ArtistInfo: React.FC<ArtistSingleProps> = (props) => {
  const { description, webLink, instagramLink, name } = props

  return (
    <>
      <Section className="py-16 md:py-28" backgroundColor="white" type="text">
        <h1
          className={`${
            name && name.length < 10 ? 'header-medium' : 'header-small'
          }  text-frida-pink pt-10 pb-8`}
        >
          <span className="text-frida-black">Meet</span>
          {name}
        </h1>
        {description && (
          <p
            data-testid={'artist__description'}
            className="whitespace-pre-line text-base-fluid"
          >
            {description}
          </p>
        )}
        <div className="flex flex-col flex-wrap items-center justify-center pt-16 md:flex-row md:justify-start">
          {webLink && (
            <Button
              size="s"
              label="Website"
              type="externalLink"
              link={webLink}
              color="black"
              backgroundColor="white"
              className="mb-3 md:mb-0 md:mr-3"
            />
          )}
          {instagramLink && (
            <Button
              size="s"
              label="Instagram"
              type="externalLink"
              link={instagramLink}
              color="black"
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
  const { relatedArtworks, imageGallery } = props

  const _gallery = imageGallery
    ? imageGallery
    : relatedArtworks.map((i) => i.photo).slice(1, 3)

  return (
    <Section type="text" className="horizontal-padding">
      <div className="flex flex-row flex-wrap w-full h-screen grid-cols-11 grid-rows-5 py-12 md:grid ">
        {_gallery.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames(
                `relative w-full border-8 ring-8 ring-frida-white border-frida-white`,
                {
                  'col-start-1 col-span-4  row-start-4 row-span-2': index === 3,
                },
                {
                  'col-start-6 col-span-6  row-start-1 row-span-2': index === 2,
                },
                {
                  'col-start-1 col-span-7  row-start-1 row-span-3': index === 1,
                },
                {
                  'col-start-5 col-span-7 row-start-3 row-span-3': index === 0,
                }
              )}
            >
              {<Photo photo={item} layout="fill" maxWidth={700} />}
            </div>
          )
        })}
      </div>
    </Section>
  )
}

const ArtistWorks: React.FC<ArtistSingleProps> = (props) => {
  const { relatedArtworks, name } = props

  const { locale } = useRouter()
  return (
    <>
      {relatedArtworks && relatedArtworks.length > 0 && (
        <Carousel
          header={locale === 'en' ? `Works by ${name}` : `Arbeiten von ${name}`}
          items={relatedArtworks.map((item) => (
            <ArtworkCard key={item.slug} type="carousel" {...item} />
          ))}
        />
      )}
    </>
  )
}
