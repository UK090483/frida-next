import ConditionalWrapper from '@components/helper/ConditionalWraper'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { FridaColors } from 'types'
import Frida from '../../Frida'
import { mouseLinkProps, setMouse } from '../Mouse/mouseRemote'

type PageTitleProps = {
  title: string
  color: FridaColors
  link: boolean
  initialColor: FridaColors
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  link,
  initialColor = 'white',
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */

  const ref = useRef<null | HTMLDivElement>(null)
  const observers = useRef<IntersectionObserver[]>([])
  const [bgCurrent, setBgCurrent] = React.useState<string | null>(null)

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        //@ts-ignore
        setBgCurrent(entries[0].target.dataset.color)
      }
    }

    document.querySelectorAll('[data-color]').forEach((i) => {
      if (i) {
        const observer = new IntersectionObserver(observerCallback, {
          root: null,
          rootMargin: '0px 0px -95% 0px',
          threshold: 0,
        })
        observer.observe(i)

        observers.current.push(observer)
      }
    })

    return () => {
      observers.current.forEach((observer) => {
        observer.disconnect()
      })
    }
  }, [])

  return (
    <ConditionalWrapper
      condition={link}
      wrapperTrue={(children) => {
        return (
          <Link href="/">
            <div
              className="text-lg-fluid font-bold"
              ref={ref}
              onMouseEnter={() => {
                setMouse('link', true)
              }}
              onMouseLeave={() => {
                setMouse('link', false)
              }}
            >
              {children}
            </div>
          </Link>
        )
      }}
      wrapperFalse={(children) => {
        return <div className="text-lg-fluid font-bold">{children}</div>
      }}
    >
      <div {...mouseLinkProps} className={'pointer-events-auto'}>
        <Frida
          text={title}
          textColor={bgCurrent ? getColor(bgCurrent).textColor : initialColor}
          color={bgCurrent ? getColor(bgCurrent).color : 'black'}
        ></Frida>
      </div>
    </ConditionalWrapper>
  )
}

const getColor = (
  color: string
): { color: FridaColors; textColor: FridaColors } => {
  switch (color) {
    case 'pink':
      return {
        color: 'black',
        textColor: 'white',
      }
    case 'white':
      return {
        color: 'black',
        textColor: 'pink',
      }
    case 'black':
      return {
        color: 'white',
        textColor: 'pink',
      }
    default:
      return {
        color: 'black',
        textColor: 'white',
      }
  }
}

export default PageTitle
