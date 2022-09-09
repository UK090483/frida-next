import fetchResource from './fetchResource'
import { getResourcesProps } from './types'

const isDev = process.env.NODE_ENV === 'development'

const defaultUrl = isDev
  ? 'http://localhost:3000'
  : 'https://' + process.env.VERCEL_URL

async function getServerResource<T>(props: getResourcesProps) {
  try {
    console.log('refetch resource')
    return await fetchResource<T>({ ...props, url: defaultUrl })
  } catch (error) {
    console.log('failed fetch')
    return []
  }
}

export default getServerResource
