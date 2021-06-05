
const url ='http://localhost:3000/api/preview?token=HULL'

export default function resolveProductionUrl(document) {
  switch (document._type) {
    case 'page':
      return `${url}&slug=${document.slug.current}&type=page`
    case 'indexPage':
      return `${url}&slug=''`
    case 'artwork':
      return `${url}&slug=${document.slug.current}&type=artwork`
    case 'post':
      return `${url}&slug=${document.slug.current}&type=post`
    case 'artist':
      return `${url}&slug=${document.slug.current}&type=artist`
    default:
      return undefined
  }
}
