import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import { postCardQuery, PostCardResult } from 'PageTypes/Post/PostQueries'

export const postsBlockQuery = (locale = '') => `
_type == "posts" => {
  'items': *[_type == 'post'] | order(releaseDate desc){
    ${postCardQuery(locale)}
  }
}
`
export interface PostsGalleryResult extends PageBuilderBlockBase {
  _type: 'posts'
  items: PostCardResult[]
}
