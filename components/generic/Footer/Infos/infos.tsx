import Section from '@components/container/section'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import { useRouter } from 'next/router'
import React from 'react'

function Infos() {
  const router = useRouter()
  return (
    <Section backgroundColor="red">
      <div className="text-frida-white flex flex-col md:flex-row  items-center justify-evenly  md:justify-between h-52 md:h-24">
        <a
          href="http://schwan-communications.com/"
          target="_blank"
          rel="noreferrer"
          {...mouseLinkProps}
        >
          <p>© 2020 Schwan Communications</p>
        </a>

        <a
          {...mouseLinkProps}
          onClick={() => {
            router.push('/impressum')
          }}
        >
          Impressum & Datenschutz
        </a>

        <a
          {...mouseLinkProps}
          onClick={() => {
            router.push('/agb')
          }}
        >
          AGB
        </a>
      </div>
    </Section>
  )
}

export default Infos
