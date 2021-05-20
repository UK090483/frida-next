import { useRouter } from 'next/router'
import * as React from 'react'
import { mouseLinkProps } from './Mouse/mouseRemote'
import Link from 'next/link'
interface ILangSwitchProps {}

const LangSwitch: React.FunctionComponent<ILangSwitchProps> = (props) => {
  const router = useRouter()

  return (
    <Link
      href={router.asPath}
      locale={`${router.locale === 'de' ? 'en' : 'de'}`}
    >
      <a
        {...mouseLinkProps}
        className="w-12 h-12 p-1.5  rounded-full flex justify-center items-center text-xs-fluid font-bold"
      >
        {router.locale === 'de' ? 'EN' : 'DE'}
      </a>
    </Link>
  )
}

export default LangSwitch
