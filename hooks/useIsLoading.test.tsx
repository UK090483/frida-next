import { renderHook, render, screen as s } from '@testing-library/react'
import { MittEmitter } from 'next/dist/shared/lib/mitt'
import { NextRouter } from 'next/router'
import { createMockRouter } from 'test-utility/nextRouterMock'
import useIsLoading from './useIsLoading'

const initTitle = 'testTitle'
const loadingTitle = '...loading'
const TestRender = (router: NextRouter) => {
  useIsLoading(router)
  return (
    <>
      <title>{initTitle}</title>
    </>
  )
}
const customRender = (router: NextRouter = createMockRouter({})) => {
  render(<TestRender {...router} />)
}

describe('useIsLoading', () => {
  it('should do nothing initial  ', () => {
    customRender()
    expect(document.title).toBe(initTitle)
    s.debug()
  })

  it('should set title loading on routeChangeStart ', () => {
    const on = jest.fn()
    on.mockImplementation((name, cb) => {
      name === 'routeChangeStart' && cb('testRoute', { shallow: false })
    })
    const events = { on, off: jest.fn() } as unknown as MittEmitter<any>
    const router = createMockRouter({ events })
    customRender(router)
    expect(document.title).toBe(loadingTitle)
  })
  it('should ignore if shallow route ', () => {
    const on = jest.fn()
    on.mockImplementation((name, cb) => {
      name === 'routeChangeStart' && cb('testRoute', { shallow: true })
    })
    const events = { on, off: jest.fn() } as unknown as MittEmitter<any>
    const router = createMockRouter({ events })
    customRender(router)
    expect(document.title).toBe(initTitle)
  })
})
