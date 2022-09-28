const slugValidation = (Rule: any) => {
  return Rule.custom(slug => {
    if (!slug) return true
    if (slug.current.indexOf(' ') >= 0)
      return 'no spaces allowed (use - for binding words)'
    if (slug.current.indexOf('/') >= 0)
      return 'no backslashes "/" allowed (use - for binding words)'

    if (slug.current.match(/[A-Z]/g)) {
      return 'no Capital Letters allowed'
    }
    return true
  }).error()
}

export default slugValidation
