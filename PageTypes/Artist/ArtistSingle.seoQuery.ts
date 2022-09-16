import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'

export const seoQuery = buildSeoQuery({
  metaTitle: {
    derived: `anzeigeName,`,
  },
  shareTitle: {
    derived: `'Jetzt Artworks von ' + anzeigeName + ' auf MeetFrida entdecken',`,
  },
  shareDesc: {
    derived: `'Jetzt Artworks von ' + anzeigeName + ' auf MeetFrida entdecken',`,
  },
  shareGraphic: {
    derived: 'mainImage,',
  },
  url: {
    derived: `'artist/' + slug.current`,
  },
})
