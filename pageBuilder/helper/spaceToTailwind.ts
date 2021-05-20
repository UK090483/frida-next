const spaceToTailwind = (
  space: null | undefined | string,
  prefix: string,
  alternative?: string
) => {
  if (!space) return alternative || ''

  switch (space) {
    case 's':
      return `${prefix}-10`
    case 'm':
      return `${prefix}-20`

    case 'l':
      return `${prefix}-32`
    case 'xl':
      return `${prefix}-44`
    case 'xxl':
      return `${prefix}-60`

    default:
      return alternative
  }
}

export { spaceToTailwind }
