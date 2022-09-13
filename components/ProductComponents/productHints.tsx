import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { buildInternalLink } from '@lib/helper/buildInternalLink'
import Icon from '@components/Icon'
import { ProductHintResult } from 'PageTypes/Artwork/ArtworkSingle/artworksQueries'
import Link from 'next/link'
import React from 'react'

import { useRouter } from 'next/router'

type ProductHintsProps = {
  items: ProductHintResult[] | null
}

const ProductHints: React.FC<ProductHintsProps> = ({ items }) => {
  const { locale } = useRouter()
  return (
    <div className="flex flex-wrap">
      {items &&
        items.map((item, index) => {
          const { text, text_en, link } = item
          const _text = locale === 'en' && text_en ? text_en : text

          return (
            <Link key={index} href={buildInternalLink(link)}>
              <a
                {...mouseLinkProps}
                className="flex items-center mb-4 bg-frida-grey hover:bg-frida-pink w-fit-content p-1 pl-5 rounded-full mr-2"
              >
                <span className="text-xs-fluid font-bold pr-6 ">{_text}</span>
                <Icon
                  withMouseHover={false}
                  icon="arrowRight"
                  size="s"
                  bgColor="pink"
                />
              </a>
            </Link>
          )
        })}
    </div>
  )
}

export default ProductHints
