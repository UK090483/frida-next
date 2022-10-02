import { renderHook, act } from '@testing-library/react'

import useAnimationPresence, {
  useAnimationPresenceProps,
} from './useAnimationPresence'

const customRender = (props?: Partial<useAnimationPresenceProps>) => {
  return renderHook<
    ReturnType<typeof useAnimationPresence>,
    Partial<useAnimationPresenceProps>
  >((_props) =>
    useAnimationPresence({
      shouldRender: true,
      ...props,
      ..._props,
    })
  )
}

describe('useAnimationPresence()', () => {
  it('should have right initial render state true ', () => {
    const { result } = customRender()
    expect(result.current.render).toBe(true)
  })
  it('should have right initial state true ', () => {
    const { result } = customRender()
    expect(result.current.state).toBe('init')
    setTimeout(() => {
      expect(result.current.state).toBe('in')
    }, 100)
  })
  it('should have right initial render state false ', () => {
    const { result } = customRender({ shouldRender: false })
    expect(result.current.render).toBe(false)
  })
  it('should have right initial state true ', () => {
    const { result } = customRender({ shouldRender: false })
    expect(result.current.state).toBe('init')
  })

  it('should set out state ', () => {
    const { result, rerender } = customRender()
    rerender({ shouldRender: false })
    expect(result.current.state).toBe('out')
  })
  it('should render while out state is running ', () => {
    const { result, rerender } = customRender()
    rerender({ shouldRender: false })
    expect(result.current.render).toBe(true)
  })

  it('should  not render when out transition done ', async () => {
    const { result, rerender } = customRender()
    rerender({ shouldRender: false })
    act(() => {
      result.current.transitionDone()
    })
    expect(result.current.render).toBe(false)
  })

  it.only('should set state to "init" when out transition done ', async () => {
    const { result, rerender } = customRender()
    rerender({ shouldRender: false })
    act(() => {
      result.current.transitionDone()
    })
    expect(result.current.state).toBe('init')
  })
})
