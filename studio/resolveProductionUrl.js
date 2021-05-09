const isDraft = id => id.includes('drafts')

export default function resolveProductionUrl(document) {
  if (document._type === 'page' || document._type === 'indexPage') {
    let id = document._id

    // if (isDraft(id)) {
    //   id = document._id.split('drafts.')[1]
    // }
    return `http://localhost:3000/api/preview?type=${document._type}&token=HULL&slug=${document.slug.current}`

    // return `http://localhost:3000/sanityprev?type=page&id=${document._id}${
    //   isDraft(document._id) ? '&isDraft=true' : ''
    // }`
  }
  return undefined
}
