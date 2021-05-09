import Header from '@components/generic/header/Header'
import Icon from '@components/lib/Icon'
import { useContextualRouting } from 'next-use-contextual-routing'
import { useRouter } from 'next/router'
import * as React from 'react'
import ModalEl from 'react-modal'
import useSWR from 'swr'
const { CONFIG_BUILD_ID } = process.env
import ArtworkSingle from '@components/ArtworkSingle'

import { m, AnimatePresence, Variants } from 'framer-motion'
//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

const variants: Variants = {
  hidden: {
    x: '100%',
    transition: { duration: 1, ease: 'linear', when: 'beforeChildren' },
  },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: 'easeInOut', when: 'beforeChildren' },
  },
}

const Modal: React.FunctionComponent = () => {
  const router = useRouter()
  const { returnHref } = useContextualRouting()
  const { data: modalData, error } = useSWR(
    !!router.query.artworkSlug
      ? `/_next/data/${CONFIG_BUILD_ID}/de${router.query.artworkSlug}.json`
      : null,
    fetcher
  )
  return (
    <ModalEl
      portalClassName={`frida_portal  ${
        !!router.query.artworkSlug ? 'frida_portal_open' : 'frida_portal_closed'
      }`}
      overlayClassName="frida_portal_overlay"
      className={`w-full h-full overflow-x-hidden overflow-y-scroll isolate relative `}
      isOpen={!!router.query.artworkSlug}
      // isOpen={true}
      // closeTimeoutMS={2000}
      // onRequestClose={() =>
      //   router.push(returnHref, returnHref, { shallow: true })
      // }
      contentLabel="Post modal"
      ariaHideApp={false}
    >
      <m.div
        className={'bg-frida-white '}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <Header
          initialColor="red"
          lang="de"
          title={
            modalData?.pageProps?.data.artwork.artistName || 'Frida is loading'
          }
          nav={false}
          navItems={[]}
        >
          <div
            onClick={() =>
              router.push(returnHref, returnHref, { shallow: true })
            }
            className="pointer-events-auto"
          >
            <Icon icon="x"></Icon>
          </div>
        </Header>

        {modalData?.pageProps.data && (
          <ArtworkSingle {...modalData.pageProps.data} />
        )}
      </m.div>
    </ModalEl>
  )
}

export default Modal
