import slugValidation from './slugValidation'

type pageBaseProps = {
  withExcerpt?: boolean
  group?: string
}

export default (props?: pageBaseProps) => [
  {
    title: 'Title',
    name: 'title',
    type: 'string',
    validation: Rule =>
      Rule.required()
        .max(20)
        .warning('Should be under 20 characters'),
    ...(props?.group ? { group: props?.group } : {})
  },
  {
    name: 'excerpt',
    type: 'text',
    title: 'Excerpt',
    description:
      'This ends up on summary pages, on Google, when people share your post in social media.',
    ...(props?.group ? { group: props?.group } : {})
  },
  {
    name: 'title_en',
    type: 'string',
    title: 'Title en',
    validation: Rule =>
      Rule.required()
        .max(20)
        .warning('Should be under 20 characters'),
    ...(props?.group ? { group: props?.group } : {})
  },
  {
    name: 'excerpt_en',
    type: 'text',
    title: 'Excerpt En',
    description:
      'This ends up on summary pages, on Google, when people share your post in social media.',
    ...(props?.group ? { group: props?.group } : {})
  },
  {
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    validation: Rule => [Rule.required(), slugValidation(Rule)],
    ...(props?.group ? { group: props?.group } : {})
  },
  {
    name: 'pageHeader',
    type: 'pageHeader',
    title: 'Header'
  }
]
