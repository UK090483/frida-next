import * as React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

interface IPageTransitionProps {
  onEnter?: () => void
  pageKey: string
}

const PageTransition: React.FunctionComponent<IPageTransitionProps> = ({
  children,
  onEnter,
  pageKey,
}) => {
  const nodeRef = React.useRef(null)

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        onEnter={() => {
          onEnter && onEnter()
        }}
        key={pageKey}
        nodeRef={nodeRef}
        addEndListener={(done: any) => {
          //@ts-ignore
          nodeRef.current?.addEventListener('transitionend', done, false)
        }}
        classNames="fade"
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  )
}
export default PageTransition
