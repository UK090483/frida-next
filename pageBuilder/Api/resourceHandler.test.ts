import { SanityClient } from '@sanity/client'

import { NextApiRequest, NextApiResponse } from 'next'
import getResourceHandler from './resourceHandler'

const testReturn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => ({
  id: i,
}))
const sanityMock = {
  fetch: jest.fn().mockResolvedValue(testReturn),
} as unknown as SanityClient

const testReq = (props?: any) => ({ ...props } as NextApiRequest)
const resultFunction = jest.fn()
const testRes = () =>
  ({
    status: () => ({ json: resultFunction }),
  } as unknown as NextApiResponse)

const getTestFn = () => {
  return getResourceHandler({
    query: 'testQuery',
    type: 'testType',
    sanity: sanityMock,
  })
}
const testSanityFetch = `*[_type == 'testType']{testQuery}`

const resToArray = (arr: any[]) => {
  return Object.values(arr).map((i) => i.id)
}

const hasDuplicateValues = (arr: unknown[]) => {
  return [...new Set(arr)].length !== arr.length
}

const isRandomized = (arr1: unknown[], arr2: unknown[]) => {
  return JSON.stringify(arr1) !== JSON.stringify(arr2)
}

describe('resource Handler', () => {
  let handler = getTestFn()
  beforeEach(() => {
    handler = getTestFn()
    jest.clearAllMocks()
  })

  it('should fetch data', async () => {
    await handler(testReq(), testRes())
    expect(sanityMock.fetch).toHaveBeenCalledTimes(1)
    expect(sanityMock.fetch).toHaveBeenCalledWith(testSanityFetch)
  })
  it('should cache fetched data', async () => {
    await handler(testReq(), testRes())
    expect(sanityMock.fetch).toHaveBeenCalledTimes(1)
    expect(sanityMock.fetch).toHaveBeenCalledWith(testSanityFetch)
    await handler(testReq(), testRes())
    expect(sanityMock.fetch).toHaveBeenCalledTimes(1)
  })
  it('should clear cache data', async () => {
    await handler(testReq(), testRes())
    expect(sanityMock.fetch).toHaveBeenCalledTimes(1)
    expect(sanityMock.fetch).toHaveBeenCalledWith(testSanityFetch)
    await handler(testReq({ query: { clearCash: 'true' } }), testRes())
    await handler(testReq(), testRes())
    expect(sanityMock.fetch).toHaveBeenCalledTimes(2)
  })

  it('testUtility test :-)', () => {
    expect(hasDuplicateValues([1, 2, 3, 4])).toBeFalsy()
    expect(hasDuplicateValues([1, 2, 3, 4, 4])).toBeTruthy()
    expect(isRandomized([1, 2, 3], [1, 2, 3])).toBeFalsy()
    expect(isRandomized([1, 2, 3], [1, 3, 2])).toBeTruthy()
  })

  const testCases = [
    { input: undefined, result: 8 },
    { input: ['a', 'b'], result: 8 },
    { input: 'not parsable', result: 8 },
    { input: 1, result: 1 },
    { input: 4, result: 4 },
    { input: '6', result: 6 },
    {
      input: testReturn.length + 12,
      result: testReturn.length,
      info: '// not more items found ',
    },
    { input: 'all', result: testReturn.length, info: '// gets all items ' },
  ]

  it.each(testCases)(
    'query.count:$input should return $result items $info',
    async ({ input, result }) => {
      await handler(testReq({ query: { count: input } }), testRes())
      const res = resultFunction.mock.calls[0][0]
      expect(res.length).toBe(result)
    }
  )

  it.each(testCases)(
    'query.count:$input should return unique randomized items',
    async ({ input, result }) => {
      await handler(testReq({ query: { count: input } }), testRes())
      const res = resultFunction.mock.calls[0][0]
      expect(hasDuplicateValues(resToArray(res))).toBeFalsy()
      expect(
        isRandomized(
          resToArray(testReturn).slice(0, result),
          resToArray(res).slice(0, result)
        )
      ).toBeTruthy()
    }
  )

  it.each(testCases)(
    'query.count:$input | query.randomize = false should return $input unRandomized values',
    async ({ input, result }) => {
      await handler(
        testReq({ query: { count: input, random: 'false' } }),
        testRes()
      )
      const res = resultFunction.mock.calls[0][0]
      expect(
        isRandomized(
          resToArray(testReturn).slice(0, result),
          resToArray(res).slice(0, result)
        )
      ).toBeFalsy()
    }
  )
})
