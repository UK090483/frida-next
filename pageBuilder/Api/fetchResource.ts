import { getResourcesProps } from './types'

type fetchResourceProps = {
  url?: string
} & getResourcesProps

async function fetchResource<T>({ type, count, url = '' }: fetchResourceProps) {
  const fetchResult = await fetch(`${url}/api/${type}?count=${count}`)
  return (await fetchResult.json()) as T[]
}

export default fetchResource
