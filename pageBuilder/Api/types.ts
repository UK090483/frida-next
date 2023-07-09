export type Resources = 'artworks' | 'artists'
export type count = number | 'all'

export type getResourcesProps = {
  type: Resources
  count: count
}
