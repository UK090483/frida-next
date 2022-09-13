import { Resources, count } from './types'
import { useEffect, useState } from 'react'
import fetchResource from './fetchResource'
import { ArtistCardResult } from 'PageTypes/Artist/ArtistCard.query'
import { ArtworkCardResult } from 'PageTypes/Artwork/ArtworkCard.query'

interface IUseResourceProps {
  count?: count
  type: Resources
}

function useResource<T>(
  props: IUseResourceProps
): [T[], Record<string, unknown>] {
  const { count = 8, type } = props

  const [items, setItems] = useState<T[] | null>(null)

  useEffect(() => {
    fetchResource<T>({ type, count }).then((res) => {
      setItems(res)
    })
  }, [type, count])
  return [items ? items : [], {}]
}

export const useArtworks = (props: Omit<IUseResourceProps, 'type'> = {}) => {
  return useResource<ArtworkCardResult>({ ...props, type: 'artworks' })
}

export const useArtists = (props: Omit<IUseResourceProps, 'type'> = {}) => {
  return useResource<ArtistCardResult>({ ...props, type: 'artists' })
}
