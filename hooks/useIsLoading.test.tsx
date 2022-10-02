import { renderHook, act } from '@testing-library/react'
import { MittEmitter } from 'next/dist/shared/lib/mitt'
import { createMockRouter } from 'test-utility/nextRouterMock'
import useIsLoading from './useIsLoading'

describe('useIsLoading', () => {
  it('should return initial false ', () => {
    const { result } = renderHook(() => useIsLoading(createMockRouter({})))
    expect(result.current).toBe(false)
  })

  it('should set loading true routeChangeStart ', () => {
    const on = jest.fn()
    on.mockImplementation((name, cb) => {
      name === 'routeChangeStart' && cb('testRoute')
    })
    const events = { on, off: jest.fn() } as unknown as MittEmitter<any>
    const router = createMockRouter({ events })
    const { result } = renderHook(() => useIsLoading(router))

    expect(result.current).toBe(true)
  })

  it('should set loading false routeChangeComplete ', () => {
    const on = jest.fn()
    on.mockImplementation((name, cb) => {
      name === 'routeChangeStart' && cb('testRoute')
      name === 'routeChangeComplete' && cb('testRoute')
    })
    const events = { on, off: jest.fn() } as unknown as MittEmitter<any>
    const router = createMockRouter({ events })
    const { result } = renderHook(() => useIsLoading(router))

    expect(result.current).toBe(false)
  })
})
