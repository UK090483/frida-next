/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Photo from '@components/Photo'
import Link from 'next/link'
import { QuoteResult } from 'pageBuilder/Blocks/QuotesBlock'
import React from 'react'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { useRouter } from 'next/router'
import ConditionalWrapper from '@lib/helper/ConditionalWraper'

interface QuoteProps extends QuoteResult {
  isSwiping?: boolean
}

const Quote: React.FC<QuoteProps> = (props) => {
  const {
    quote,
    quote_en,
    authorImage,
    author,
    subtitle,
    targetImage,
    subtitle_en,
    link,
    isSwiping = false,
  } = props

  const { locale } = useRouter()
  const _subtitle = locale === 'en' && subtitle_en ? subtitle_en : subtitle
  const _quote = locale === 'en' && quote_en ? quote_en : quote

  return (
    <ConditionalWrapper
      condition={!!link}
      wrapperFalse={(children) => (
        <div className="bg-frida-black h-full grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 px-frida_side md:px-12 py-12 group ">
          {children}
        </div>
      )}
      wrapperTrue={(children) => (
        <Link href={`/${link?.type}/${link?.slug}`} passHref>
          <a
            onClick={(e) => {
              isSwiping && e.preventDefault()
            }}
            draggable="false"
            {...mouseLinkProps}
            className="bg-frida-black h-full grid grid-cols-1  md:grid-cols-3 gap-0 md:gap-6 px-frida_side md:px-12 py-12 group "
          >
            {children}
          </a>
        </Link>
      )}
    >
      <div className="w-full col-span-2   md:pr-12 items-center  pb-8">
        <p className="text-frida-pink text-normal font-bold">{_quote}</p>
        <div className="text-frida-white text-base-fluid font-bold mb-0">
          {author}
        </div>
        <p className="text-frida-white text-sm-fluid"> {_subtitle}</p>
      </div>

      <div className="w-full h-full min-h-[300px] md:min-h-[400px]  relative flex items-end ">
        <div className="absolute h-full w-2/3  right-0 top-0 transform transition-transform group-hover:translate-x-6 ">
          <Photo photo={authorImage} layout="contain" />
        </div>

        <div className="w-1/2 h-2/3  transform transition-transform group-hover:-translate-x-6 ">
          <Photo photo={targetImage} layout="contain" />
        </div>
      </div>
    </ConditionalWrapper>
  )
}

export default Quote
