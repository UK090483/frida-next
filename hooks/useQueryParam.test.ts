import { screen as s, renderHook } from '@testing-library/react'
import {
  createMockRouter,
  MockRouterProps,
} from '../test-utility/nextRouterMock'
import useQueryParam, { useQueryParamProps } from './useQueryParam'

const testRender = (props?: {
  router?: MockRouterProps
  props?: Partial<useQueryParamProps>
}) => {
  return renderHook((_props?: Partial<useQueryParamProps>) =>
    useQueryParam({
      router: createMockRouter({ ...props?.router, ..._props?.router }),
      ...props?.props,
    })
  )
}

const testData = {
  params: { testParam1: 'testParam1Val', testParam2: 'testParam2Val' },
}

describe('useQueryParam', () => {
  it('should have right exports', () => {
    const { result } = testRender()
    expect(typeof result.current.getParam).toBe('function')
    expect(typeof result.current.setParam).toBe('function')
  })

  it('should get Param', () => {
    const { result } = testRender({
      router: createMockRouter({
        query: testData.params,
      }),
    })
    expect(result.current.getParam('not existent')).toBeUndefined()
    expect(result.current.getParam('testParam1')).toBe(
      testData.params.testParam1
    )
  })

  it('should set Param', () => {
    const testRouter = createMockRouter({
      query: testData.params,
    })
    const { result } = testRender({
      router: testRouter,
    })
    result.current.setParam('testParamSet', 'setParamSetValue')
    expect(testRouter.push).toHaveBeenCalledTimes(1)
    expect(testRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: {
          testParam1: 'testParam1Val',
          testParam2: 'testParam2Val',
          testParamSet: 'setParamSetValue',
        },
      },
      undefined,
      { shallow: true }
    )
  })

  it('should ignore params', () => {
    const testRouter = createMockRouter({
      query: testData.params,
    })
    const { result } = testRender({
      router: testRouter,
      props: { ignore: ['testParam2'] },
    })
    result.current.setParam('testParamSet', 'setParamSetValue')
    expect(testRouter.push).toHaveBeenCalledTimes(1)
    expect(testRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: {
          testParam1: 'testParam1Val',
          testParamSet: 'setParamSetValue',
        },
      },
      undefined,
      { shallow: true }
    )
  })
})
