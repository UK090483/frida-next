import Photo from '@components/Photo'
import Link from 'next/link'
import React from 'react'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import ConditionalWrapper from '@components/ConditionalWrapper'
import { QuoteResult } from 'pageBuilder/Blocks/QuotesBlock/QuotesBlock.query'

interface QuoteProps extends QuoteResult {
  isSwiping?: boolean
}

const Quote: React.FC<QuoteProps> = (props) => {
  const {
    quote,
    authorImage,
    author,
    subtitle,
    targetImage,
    link,
    isSwiping = false,
  } = props

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
        <p className="text-frida-pink text-normal font-bold">{quote}</p>
        <div className="text-frida-white text-base-fluid font-bold mb-0">
          {author}
        </div>
        <p className="text-frida-white text-sm-fluid"> {subtitle}</p>
      </div>

      <div className="w-full h-full min-h-[300px] md:min-h-[400px]  relative flex items-end ">
        <div className="absolute h-full w-2/3  right-0 top-0 transform transition-transform group-hover:translate-x-6 ">
          <Photo photo={authorImage} layout="contain" maxWidth={320} />
        </div>

        <div className="w-1/2 h-2/3  transform transition-transform group-hover:-translate-x-6 ">
          <Photo photo={targetImage} layout="contain" maxWidth={320} />
        </div>
      </div>
    </ConditionalWrapper>
  )
}

export default Quote
