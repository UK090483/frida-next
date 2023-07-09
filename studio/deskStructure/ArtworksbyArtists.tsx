import S from '@sanity/desk-tool/structure-builder'

export default S.listItem({
  id: 'artwork-by-artist',
  title: 'Artwork by Artist',

  child: (props, p) => {
    return S.documentTypeList('artist').child((artistId, p) => {
      return S.documentList()
        .title('Artwork by Artist')
        .filter('artist._ref == $artistId ')
        .params({ type: 'artwork', artistId })
    })
  }
})
