const spaceToTailwind = (space: string, prefix: string) => {
  switch (space) {
    case "s":
      return `${prefix}-10`
    case "m":
      return `${prefix}-20`

    case "l":
      return `${prefix}-32`
    case "xl":
      return `${prefix}-44`
    case "xxl":
      return `${prefix}-60`

    default:
      return ""
  }
}

export { spaceToTailwind }
