import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'

export const seoQuery = buildSeoQuery({
  metaTitle: { derived: `name + ' by ' + artist->anzeigeName,` },
  metaDesc: {
    derived: `"Artwork for sale " + '"'+ name + '"' + ' by '+ artist->anzeigeName,`,
  },
  shareDesc: {
    derived: `"Artwork " + '"'+ name + '"' + ' by '+ artist->anzeigeName,`,
  },
  shareTitle: { derived: `name+' by ' + artist->anzeigeName,` },
  shareGraphic: { derived: 'image ,' },
  url: { derived: `'artwork/' +slug.current ` },
})
