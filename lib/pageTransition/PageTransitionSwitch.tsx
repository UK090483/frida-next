import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  SwitchTransition,
  CSSTransition,
  Transition,
} from 'react-transition-group'

import isBrowser from 'utility/isBrowser'

interface IPageTransitionProps {
  onEnter?: () => void
}

const PageTransition: React.FunctionComponent<IPageTransitionProps> = ({
  children,
  onEnter = () => {},
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <SwitchTransition mode="out-in">
      {/* <CSSTransition
        //@ts-ignore
        key={children?.key}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          nodeRef.current &&
            nodeRef.current.addEventListener(
              'transitionend',
              () => {
                done()
                onEnter()
              },
              false
            )
        }}
        classNames="fade"
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition> */}
      <Fade
        //@ts-ignore
        key={children?.key}
      >
        {children}
      </Fade>
    </SwitchTransition>
  )
}
export default PageTransition

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const Fade: React.FC<{ in?: boolean }> = ({ in: inProp, children }) => {
  console.log(inProp)

  const nodeRef = useRef<HTMLDivElement>(null)
  return (
    <Transition
      addEndListener={(done: () => void) => {
        nodeRef.current &&
          nodeRef.current.addEventListener('transitionend', done, false)
      }}
      nodeRef={nodeRef}
      in={inProp}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            //@ts-ignore
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}
