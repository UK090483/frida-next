import { FiSearch } from 'react-icons/fi'
import { colorList } from '../snippets'
export default {
  title: 'Search',
  name: 'search',
  type: 'object',
  icon: FiSearch,

  fields: [
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [...colorList(['red', 'black'])]
      }
    }
  ],
  preview: {
    select: {
      text: 'text'
    },
    prepare({ text }) {
      return {
        title: 'Search'
      }
    }
  }
}
