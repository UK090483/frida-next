import React from 'react'
import Section from '@components/Section'
import BigButton from '@components/buttons/bigButton'
import Newsletter from 'components/Forms/NewsletterForm'
import { useRouter } from 'next/router'
import { mouseLinkProps } from './Mouse/mouseRemote'
import Link from 'next/link'
import { buildInternalLink } from '@lib/helper/buildInternalLink'
import { FridaLocation } from 'types'

type FooterProps = {
  imprintSlug?: string | null | undefined
  agbSlug?: string | null | undefined

  nav?: any[]
  lang: FridaLocation
}

const Footer: React.FC<FooterProps> = (props) => {
  const { nav } = props
  const router = useRouter()

  return (
    <div>
      <Section backgroundColor="white">
        <div className="flex flex-wrap lg:flex-nowrap horizontal-padding">
          <div className="w-full  lg:pr-frida_7%">
            <p className="font-bold text-lg-fluid">
              {router.locale === 'en' ? 'Stay up to date' : 'Bleib up to date'}
            </p>
            <p className="text-base-fluid">
              {router.locale === 'en'
                ? "Register now for Frida's newsletter and don't miss a thing - exclusive discounts, new items, current projects and much more!"
                : 'Jetzt für Fridas Newsletter anmelden und nichts verpassen - exklusive Rabatte, neue Postionen, aktuelle Projekte und vieles mehr!'}
            </p>
          </div>
          <div className="w-full my-12 lg:my-auto ">
            <Newsletter />
          </div>
        </div>
      </Section>
      <Section backgroundColor="red">
        <div style={{ padding: '50px 0' }}>
          <div className={'text-xl-fluid text-frida-white font-bold'}>
            FOLLOW FRIDA ON SOZIAL MEDIA
          </div>
        </div>
      </Section>
      <BigButton></BigButton>
      <Section backgroundColor="red">
        <div className="flex flex-col items-center text-frida-white md:flex-row justify-evenly md:justify-between h-52 md:h-24">
          {nav &&
            nav.map((l, index) => {
              return (
                <CustomLink
                  key={index}
                  internalLink={l.internalLink}
                  link={l.link}
                  label={l.label}
                  label_en={l.label_en}
                />
              )
            })}
        </div>
      </Section>
    </div>
  )
}

export default Footer

type CustomLinkPros = {
  className?: string
  internalLink?: { type: string; slug: string }
  link?: string
  label?: string
  label_en?: string
}
const CustomLink: React.FC<CustomLinkPros> = (props) => {
  const { className, label, link, internalLink } = props
  const _internalLink = internalLink && buildInternalLink(internalLink)

  if (_internalLink) {
    return (
      <Link href={_internalLink} passHref>
        <a {...mouseLinkProps} className={className}>
          {label}
        </a>
      </Link>
    )
  }

  return (
    <a
      {...mouseLinkProps}
      target="_blank"
      rel="noreferrer"
      href={link || '/'}
      className={className}
    >
      {label}
    </a>
  )
}
