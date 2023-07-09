import { SanityClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type getResourceHandlerProps = {
  type: string
  query: string
  sanity: SanityClient
}

const DEFAULT_COUNT = 8

function getResourceHandler<T>({
  type,
  query,
  sanity,
}: getResourceHandlerProps) {
  let items: T[] | null = null
  const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const random = !(req?.query?.random === 'false')

    const clearCash = req?.query?.clearCash === 'true'

    if (clearCash) {
      items = null
      return res.status(200).json({})
    }

    if (!items) {
      items = await sanity.fetch<T[]>(`*[_type == '${type}']{${query}}`)
    }

    const count = parseCount(req?.query?.count, items)

    if (random) {
      return res.status(200).json(getRandomItems<T>(items, count))
    }
    return res.status(200).json(items.slice(0, count))
  }

  return handler
}

export default getResourceHandler

function getRandomItems<T>(items: T[], count = 8): T[] {
  if (items.length < count) {
    count = items.length
  }
  const result: T[] = []
  const used: number[] = []
  function getRanNum(): number {
    const ranNum = Math.floor(Math.random() * items.length)
    if (used.includes(ranNum)) {
      return getRanNum()
    }
    used.push(ranNum)
    return ranNum
  }
  for (let index = 0; index < count; index++) {
    result.push(items[getRanNum()])
  }
  return result
}

function parseCount(
  count: string | string[] | undefined,
  items: unknown[]
): number {
  if (Array.isArray(count)) {
    return DEFAULT_COUNT
  }
  if (count === 'all') {
    return items.length
  }
  if (typeof count === 'string' || typeof count === 'number') {
    const num = parseInt(count)
    return isNaN(num) ? DEFAULT_COUNT : num
  }

  return DEFAULT_COUNT
}
