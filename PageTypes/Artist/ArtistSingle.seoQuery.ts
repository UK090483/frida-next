import { buildSeoQuery } from 'pageBuilder/Seo/seoQuery'

export const seoQuery = buildSeoQuery({
  metaTitle: {
    derived: `'Jetzt Artworks von ' + anzeigeName + ' auf MeetFrida entdecken',`,
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
