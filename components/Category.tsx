import React from 'react'
import Section from '@components/Section'
import Link from 'next/link'
import cx from 'classnames'
import { ConditionalWrapper } from '@lib/helpers'
import { buildInternalLink } from '@lib/helper/buildInternalLink'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { FridaLocation } from 'types'

type CategoryItem = {
  images: React.ReactNode[]
  label?: string
  label_en?: string
  size?: 's' | 'm' | 'l'
  sizeMobile?: 's' | 'm' | 'l'
  internalLink?: { slug: string; type: string } | null
  urlParams?: string
  path?: string
}

type CategoryProps = {
  items: CategoryItem[]
  lang: FridaLocation
}

const Category: React.FC<CategoryProps> = ({ items, lang }) => {
  return (
    <Section type="full" backgroundColor="white">
      <div className="grid gap-4 lg:gap-20 grid-cols-12  grid-flow-row px-frida_side md:px-frida_7% pt-4 pb-4 lg:pb-20">
        {items.map((item, index) => {
          const {
            size = 'm',
            sizeMobile = 'm',
            internalLink,
            urlParams = '',
            label,
            label_en,
          } = item
          const _label = lang === 'en' && label_en ? label_en : label
          return (
            <ConditionalWrapper
              key={index}
              condition={!!internalLink}
              wrapper={(children: React.ReactChildren) => {
                return (
                  <Link
                    href={`${buildInternalLink(internalLink)}${urlParams}`}
                    passHref
                  >
                    <a
                      {...mouseLinkProps}
                      className={cx(
                        'h-vw-50 md:h-vw-30 lg:h-vw/5 relative row-span-3 ',
                        { ' md:col-span-3': size === 's' },
                        { ' md:col-span-6': size === 'm' },
                        { ' md:col-span-9 ': size === 'l' },
                        { 'col-span-3 ': sizeMobile === 's' },
                        { 'col-span-6': sizeMobile === 'm' },
                        { 'col-span-12 ': sizeMobile === 'l' }
                      )}
                    >
                      {children}
                    </a>
                  </Link>
                )
              }}
            >
              <div
                className={cx(
                  'h-vw/2 md:h-vw/3 lg:h-vw/5 relative row-span-3 ',
                  { ' md:col-span-3': size === 's' },
                  { ' md:col-span-6': size === 'm' },
                  { ' md:col-span-9 ': size === 'l' },
                  { 'col-span-3 ': sizeMobile === 's' },
                  { 'col-span-6': sizeMobile === 'm' },
                  { 'col-span-12 ': sizeMobile === 'l' }
                )}
              >
                {item.images && item.images[0] && item.images[0]}

                {_label && (
                  // <div className="py-2 px-6 text-base-fluid rounded-full font-extrabold text-frida-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-frida-white whitespace-nowrap">
                  //   {_label}
                  // </div>
                  <button className="button is-responsive  absolute bg-frida-white border-frida-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {_label}
                  </button>
                )}
              </div>
            </ConditionalWrapper>
          )
        })}
      </div>
    </Section>
  )
}

export default Category
