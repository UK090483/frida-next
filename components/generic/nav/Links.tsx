import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '../Mouse/mouseRemote'
import useBodyScrollStop from '@components/helper/useBodyScrollStop'
import { m } from 'framer-motion'
import { FridaLocation } from 'types'
import { useToggleMegaNav } from '@lib/context'

const Links: React.FC<{
  open: boolean
  items: {
    internalLink: null | string
    link: null | string
    label: null | string
    label_en: null | string
  }[]
  lang: FridaLocation
}> = ({ open, items, lang }) => {
  const { enableBodyScroll } = useBodyScrollStop()
  const toggleNav = useToggleMegaNav()

  const container = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const item = {
    open: {
      opacity: 1,
      x: 0,
      transition: { ease: [0.17, 0.67, 0.83, 0.67] },
    },
    closed: {
      opacity: 0,
      x: '100%',
      transition: { ease: [0.17, 0.67, 0.83, 0.67] },
    },
  }

  return (
    <nav>
      <m.ul
        initial={'closed'}
        animate={open ? 'open' : 'closed'}
        variants={container}
        {...mouseLinkProps}
        onClick={() => {
          enableBodyScroll()
          toggleNav('toggle')
        }}
        className="relative pt-20 pl-8 md:pl-32"
      >
        {items.map((route, index) => {
          const label =
            lang === 'en' && route.label_en ? route.label_en : route.label

          return (
            <m.li
              key={index}
              className={`text-frida-white text-xl-fluid font-bold text-fill-menu `}
              variants={item}
            >
              {route.internalLink ? (
                <Link href={`/${route.internalLink}`}>{label}</Link>
              ) : (
                route.link && <a href={route.link}>{label}</a>
              )}
            </m.li>
          )
        })}
      </m.ul>
    </nav>
  )
}

export default React.memo(Links)
