import React from 'react'
import { sizesList } from '../../snippets'

export default {
  title: 'Space',
  name: 'spacer',
  type: 'object',
  fields: [
    {
      title: 'Space',
      name: 'space',
      type: 'string',
      
      options: {
        list: [...sizesList()]
      }
    },
  ],
  preview: {
    select: {
      space: 'space'
    },
    prepare({space}) {
      return { title: `Space ${space}` }
    }
  }
}
