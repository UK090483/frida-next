export const buildInternalLink = (
  link: { type: string; slug: string } | null | undefined
) => {
  if (!link) return '/'
  const { type, slug } = link

  if (type === 'artwork') {
    return `/artwork/${slug}`
  }

  if (type === 'page') {
    return `/${slug}`
  }

  return '/'
}
