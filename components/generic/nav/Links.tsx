/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '../Mouse/mouseRemote'
import { m } from 'framer-motion'
import { useToggleMegaNav } from 'contexts/shopContext/useUi'
import { NavItems } from './Nav'
import { useRouter } from 'next/router'

const Links: React.FC<{
  open: boolean
  items: NavItems[]
}> = ({ open, items }) => {
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

  const { locale } = useRouter()

  return (
    <nav>
      <m.ul
        initial={'closed'}
        animate={open ? 'open' : 'closed'}
        variants={container}
        {...mouseLinkProps}
        onClick={() => {
          toggleNav()
        }}
        className="relative pt-20 pl-8 list-none md:pl-32"
      >
        {items.map((route, index) => {
          const label =
            locale === 'en' && route.label_en ? route.label_en : route.label

          return (
            <m.li
              key={index}
              className={`text-frida-white text-xl-fluid md:text-md-fluid  font-bold text-fill-menu `}
              variants={item}
            >
              {route.internalLink ? (
                <Link href={`/${route.internalLink}`} passHref>
                  <a tabIndex={open ? 0 : -1}>{label}</a>
                </Link>
              ) : (
                route.link && (
                  <a tabIndex={open ? 0 : -1} href={route.link}>
                    {label}
                  </a>
                )
              )}
            </m.li>
          )
        })}
      </m.ul>
    </nav>
  )
}

export default React.memo(Links)
