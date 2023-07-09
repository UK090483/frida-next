import ConditionalWrapper from '@components/ConditionalWrapper'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { FridaColors } from 'types'
import Frida from '@components/Frida'
import { mouseLinkProps, setMouse } from './Mouse/mouseRemote'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { isBrowser } from 'framer-motion'

type PageTitleProps = {
  title: string
  color: FridaColors
  link: boolean
  initialColor: FridaColors | 'white/pink'
  id: string
}
const useIsomorphUseLayout = isBrowser ? useLayoutEffect : useEffect
const PageTitle: React.FC<PageTitleProps> = ({
  title = 'no title',
  link,
  initialColor = 'white',
  id,
}) => {
  const ref = useRef<null | HTMLAnchorElement>(null)
  // const observers = useRef<IntersectionObserver[]>([])
  const [bgCurrent, setBgCurrent] = React.useState<string | null>(null)
  const [counter, setCounter] = React.useState(0)

  useIsomorphUseLayout(() => {
    let observers: IntersectionObserver[] = []
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        // console.log({
        //   e: entries[0].target,
        //   color: entries[0].target.getAttribute('data-color'),
        // })

        setBgCurrent(entries[0].target.getAttribute('data-color'))
      }
    }
    document.querySelectorAll('[data-color]').forEach((i) => {
      //console.log(i)
      if (i) {
        const observer = new IntersectionObserver(observerCallback, {
          root: null,
          rootMargin: '0px -10% -95% -10%',
          threshold: 0,
        })
        observer.observe(i)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => {
        observer.disconnect()
      })
    }
  }, [counter])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCounter((state) => state + 1)
    }, 1000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [id])

  return (
    <ConditionalWrapper
      condition={link}
      wrapperTrue={(children) => {
        return (
          <Link href="/" passHref>
            <a
              className={classNames(
                'font-bold text-md-fluid  transform -translate-y-2'
              )}
              ref={ref}
              onMouseEnter={() => {
                setMouse('link', true)
              }}
              onMouseLeave={() => {
                setMouse('link', false)
              }}
            >
              {children}
            </a>
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
          textColor={
            bgCurrent
              ? getColor(bgCurrent).textColor
              : initialColor === 'white/pink'
              ? 'pink'
              : 'white'
          }
          color={
            bgCurrent
              ? getColor(bgCurrent).color
              : initialColor === 'white/pink'
              ? 'white'
              : 'black'
          }
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
    case 'grey':
      return {
        color: 'black',
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
