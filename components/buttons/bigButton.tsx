import React from 'react'
import { mouseLinkProps } from '../generic/Mouse/mouseRemote'

const BigButtons: React.FC<{ tabable?: boolean }> = ({ tabable }) => {
  return (
    <div className={`flex flex-wrap md:flex-nowrap`} {...mouseLinkProps}>
      <BigButton
        tabable={tabable}
        label={'Instagram'}
        link={'https://www.instagram.com/meetfrida.art/'}
      ></BigButton>
      <BigButton
        tabable={tabable}
        label={'Facebook'}
        link={'https://www.facebook.com/meetfrida.art'}
      ></BigButton>
    </div>
  )
}

type BigButtonProps = {
  label: string
  link: string
  tabable?: boolean
}

const BigButton: React.FC<BigButtonProps> = ({ label, link, tabable }) => {
  return (
    <a
      tabIndex={tabable ? 0 : -1}
      className="flex items-center justify-center w-full font-bold h-14 md:h-36 text-xl-fluid bg-frida-red text-frida-white hover:text-frida-pink text-fill-bigButton hover:bg-frida-pink "
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {label}
    </a>
  )
}

export default BigButtons
