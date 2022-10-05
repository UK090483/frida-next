import useTween from 'hooks/useTween'
import useTweenCss from 'hooks/useTweenedCss'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import isBrowser from 'utility/isBrowser'

interface IPageTransitionProps {
  onEnter?: () => void
}

const useIsomorphUseLayout = isBrowser ? useLayoutEffect : useEffect

const PageTransition: React.FunctionComponent<IPageTransitionProps> = ({
  children,
  onEnter = () => {},
}) => {
  const cash = useRef<null | React.ReactNode>(null)
  const firstRender = useRef(true)
  const [isIn, setIsIn] = useState(true)

  const refNode = useRef(null)
  const handleTransitionEnd = () => {
    if (!isIn) {
      onEnter()

      setIsIn(true)
      cash.current = children
    }
  }

  useTweenCss({ tween: isIn, refNode, done: handleTransitionEnd })

  useIsomorphUseLayout(() => {
    if (firstRender.current) {
      firstRender.current = false
      cash.current = children
      return
    }

    //@ts-ignore
    if (children?.key === cash.current?.key) {
      return
    }

    setIsIn(false)
  }, [children])

  return (
    <div ref={refNode} data-testid="pageSwitchWrapCSS">
      {isIn ? children : cash.current}
    </div>
  )
}
export default PageTransition
