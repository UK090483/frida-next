import { body } from 'pageBuilder/pageBuilderQueries'

export const pageQuery = `
...,
'slug':slug.current,
footer->{${body}},
${body}
`
