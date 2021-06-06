import { FiExternalLink } from 'react-icons/fi'

export default {
  title: 'Hint',
  name: 'productHint',
  type: 'object',
  icon: FiExternalLink,
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
        title: 'Text En',
        name: 'text_en',
        type: 'string'
      },
    {
      title: 'link',
      name: 'link',
      type: 'reference',
      to: [{ type: 'page' },{type:'product'},{type:'productVariant'},{type:'artwork'}],
      validation: Rule => Rule.required()
    }
  ]
}
