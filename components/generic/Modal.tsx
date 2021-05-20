import ArtistSingle from 'contentTypes/Artist/ArtistSingle'
import ArtworkSingle from 'contentTypes/Artwork/ArtworkSingle/ArtworkSingle'
import Header from '@components/generic/header/Header'
import Icon from '@components/lib/Icon'
import PostSingle from 'contentTypes/Post/PostSingle'
import { ModalPageData, useModalContext } from '@lib/modalContext'
import * as React from 'react'
import ModalEl from 'react-modal'

import ProductSingle from 'contentTypes/Product/ProductSingle'
import { useRouter } from 'next/router'

const Modal: React.FC = () => {
  const { open, closeModal, firstPageData, secondPageData } = useModalContext()

  return (
    <ModalEl
      portalClassName={`fixed inset-0  ${
        open ? 'frida_portal_open' : 'frida_portal_closed'
      }`}
      overlayClassName="absolute inset-0 bg-frida-pink bg-opacity-50 "
      className={`absolute inset-0 `}
      isOpen={open}
      closeTimeoutMS={500}
      contentLabel="Post modal"
      ariaHideApp={false}
    >
      <ModalContent closeModal={closeModal} {...firstPageData} />
      <ModalContent closeModal={closeModal} {...secondPageData} />
    </ModalEl>
  )

  // return (
  //   <div
  //     className={`${open ? 'fixed inset-0  z-30 opacity-100' : 'opacity-0'} `}
  //   >
  //     <ModalContent closeModal={closeModal} {...firstPageData} />
  //     <ModalContent closeModal={closeModal} {...secondPageData} />
  //   </div>
  // )
}

export default Modal

interface ModalContentProps extends ModalPageData {
  closeModal: () => void
}

const ModalContent: React.FC<ModalContentProps> = (props) => {
  const { type, data, dir, closeModal, state } = props
  const { locale } = useRouter()

  const getElement = () => {
    if (!data) return <></>
    if (type === 'artist') {
      return <ArtistSingle {...data} lang={locale} />
    }
    if (type === 'artwork') {
      return <ArtworkSingle {...data} lang={locale} />
    }
    if (type === 'post') {
      return <PostSingle {...data} lang={locale} widthLayout={false} />
    }
    if (type === 'product') {
      return <ProductSingle {...data} lang={locale} />
    }
  }

  const getTitle = (data: any) => {
    if (!data) return 'nodata '
    if (type === 'artist') {
      return data.name
    }
    if (type === 'artwork') {
      return data.artwork?.artistName
    }
    if (type === 'post') {
      return 'post'
    }
    if (type === 'product') {
      return 'shop'
    }
  }

  console.log()
  return (
    <>
      <div
        className={`${
          state ? 'absolute top-0 overflow-y-scroll w-screen h-screen' : ''
        }  ${dir === 'in' ? 'animate-slideIn ' : ''} ${
          dir === 'out' ? 'animate-slideOut' : ''
        }`}
      >
        {data && (
          <Header
            initialColor="pink"
            lang="de"
            title={getTitle(data)}
            nav={false}
            navItems={[]}
          >
            <div onClick={closeModal} className="pointer-events-auto">
              <Icon icon="x"></Icon>
            </div>
          </Header>
        )}
        {getElement()}
      </div>
    </>
  )
}
