import React from 'react'
import Section from '@components/Section'
import BigButton from '@components/buttons/bigButton'
import Newsletter from 'components/Forms/NewsletterForm'
import { useRouter } from 'next/router'
import { mouseLinkProps } from './Mouse/mouseRemote'
import Link from 'next/link'

type FooterProps = {
  imprintSlug?: string | null | undefined
  agbSlug?: string | null | undefined
}

const Footer: React.FC<FooterProps> = (props) => {
  const { imprintSlug, agbSlug } = props
  const router = useRouter()

  return (
    <div>
      <Section backgroundColor="white">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-full py-12 lg:pr-frida_7%">
            <p className="text-lg-fluid font-bold">
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
            GET IN TOUCH WITH FRIDA
          </div>
        </div>
      </Section>
      <BigButton></BigButton>
      <Section backgroundColor="red">
        <div className="text-frida-white flex flex-col md:flex-row  items-center justify-evenly  md:justify-between h-52 md:h-24">
          <a
            href="http://schwan-communications.com/"
            target="_blank"
            rel="noreferrer"
            {...mouseLinkProps}
          >
            © 2020 Schwan Communications
          </a>
          <Link href={`/${imprintSlug ? imprintSlug : ''}`} passHref>
            <a {...mouseLinkProps}>Impressum & Datenschutz</a>
          </Link>
          <Link href={`/${agbSlug ? agbSlug : ''}`} passHref>
            <a {...mouseLinkProps}>AGB</a>
          </Link>
        </div>
      </Section>
    </div>
  )
}

export default Footer
