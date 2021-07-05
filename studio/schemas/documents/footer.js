import { CgCardHearts } from 'react-icons/cg'
import { defaultBockContent } from '../snippets'

export default {
  name: 'footer',
  type: 'document',
  title: 'Footer',
  icon: CgCardHearts,
  fields: [
   
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },

    defaultBockContent
  ]
}
