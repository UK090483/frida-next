import { body } from 'pageBuilder/pageBuilderQueries'
import { siteQuery } from './cache'

export const pageQuery = `
...,
'slug':slug.current,
footer->{${body}},
${body}
${siteQuery}
`
