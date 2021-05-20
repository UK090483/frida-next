export default function resolveProductionUrl(document) {
  switch (document._type) {
    case 'page':
      return `http://localhost:3000/${document.slug.current}?preview`
    case 'indexPage':
      return `http://localhost:3000?preview`
    case 'artwork':
      return `http://localhost:3000/artwork/${document.slug.current}?preview`
    case 'post':
      return `http://localhost:3000/post/${document.slug.current}?preview`

    default:
      return undefined
  }
}
