import React from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share'
import Icon from '@components/Icon'

type SocialShareProps = {
  url?: string
  className?: string
}
const SocialShare: React.FC<SocialShareProps> = ({ url, className }) => {
  const location = url
    ? url
    : typeof window !== `undefined`
    ? window.location.href
    : ''

  return (
    <div className={`${className}`}>
      <Icon icon="share" bgColor="grey" />
      {/* <button className={` w-72 group  relative`}>
        <div className="flex h-12 align-bottom absolute w-72 top-6 left-14  delay-100 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
          <SBWrap className="w-10 left-0 ">
            <FacebookShareButton
              url={location}
              className="pointer-events-auto hide-cursor"
            >
              <Icon icon="facebook" size="s" bgColor="grey" />
            </FacebookShareButton>
          </SBWrap>
          <SBWrap className="w-20 left-0 delay-75">
            <TwitterShareButton url={location} className="pointer-events-auto">
              <Icon icon="twitter" size="s" bgColor="grey" />
            </TwitterShareButton>
          </SBWrap>
          <SBWrap className="w-32 -left-2 delay-100">
            <WhatsappShareButton url={location} className="pointer-events-auto">
              <Icon icon="whatsApp" size="s" bgColor="grey" />
            </WhatsappShareButton>
          </SBWrap>
          <SBWrap className="w-40 left-0 delay-150">
            <EmailShareButton url={location} className="pointer-events-auto">
              <Icon icon="email" size="s" bgColor="grey" />
            </EmailShareButton>
          </SBWrap>
        </div>
        <Icon icon="share" bgColor="grey" />
      </button> */}
    </div>
  )
}

export default SocialShare

type ShareButtonWrapProps = {
  className: string
}
const SBWrap: React.FC<ShareButtonWrapProps> = (props) => {
  const { children, className } = props
  return (
    <div
      className={`${className} w-10 absolute  flex justify-end transition-transform  transform-gpu -translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 pointer-events-none`}
    >
      {children}
    </div>
  )
}
