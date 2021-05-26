export default function resolveProductionUrl(document) {
  switch (document._type) {
    case 'page':
      return `http://localhost:3000/${document.slug.current}?preview=true`
    case 'indexPage':
      return `http://localhost:3000?preview=true`
    case 'artwork':
      return `http://localhost:3000/artwork/${document.slug.current}?preview=true`
    case 'post':
      return `http://localhost:3000/post/${document.slug.current}?preview=true`
    case 'artist':
      return `http://localhost:3000/artist/${document.slug.current}?preview=true`

    default:
      return undefined
  }
}
