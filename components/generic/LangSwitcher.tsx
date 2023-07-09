import { useRouter } from 'next/router'
import * as React from 'react'
import { mouseLinkProps } from './Mouse/mouseRemote'
import Link from 'next/link'
import { useToggleMegaNav } from 'contexts/shopContext/useUi'

const LangSwitch: React.FunctionComponent = () => {
  const router = useRouter()
  const toggleNav = useToggleMegaNav()

  return (
    <div className="absolute top-frida_side_big left-frida_side  text-frida-white font-bold">
      Language :
      <Link href={router.asPath} locale="de">
        <a
          {...mouseLinkProps}
          className={`ml-5 ${router.locale === 'de' ? 'text-frida-pink' : ''}`}
          onClick={toggleNav}
        >
          DE
        </a>
      </Link>
      <Link href={router.asPath} locale="en">
        <a
          {...mouseLinkProps}
          className={`ml-5 ${router.locale === 'en' ? 'text-frida-pink' : ''}`}
          onClick={toggleNav}
        >
          EN
        </a>
      </Link>
    </div>
  )
}

export default LangSwitch
