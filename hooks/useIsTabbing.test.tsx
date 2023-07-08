//@ts-nocheck
import { render, screen as s, fireEvent } from '@testing-library/react'
import useIsTabbing from './useIsTabbing'

const TestComponent = () => {
  useIsTabbing()
  return <div></div>
}

describe('useIsTaping', () => {
  it('should do nothing', () => {
    render(<TestComponent />)
  })

  it('should add isTabbing Class to body if tabbed', () => {
    render(<TestComponent />)
    fireEvent.keyDown(window, { key: 'Tab' })
    expect(document.body).toHaveClass('is-tabbing')
  })

  it('should return eventlistener after tabbed', () => {
    render(<TestComponent />)
    fireEvent.keyDown(window, { key: 'Tab' })

    document.body.classList.remove('is-tabbing')

    fireEvent.keyDown(window, { key: 'Tab' })
    expect(document.body).not.toHaveClass('is-tabbing')
  })
})
