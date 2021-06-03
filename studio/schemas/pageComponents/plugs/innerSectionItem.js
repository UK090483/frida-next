import React from 'react'
import { AiOutlineBorderOuter } from 'react-icons/ai'
import { colorList, sizesList } from '../../snippets'
export default {
  type: 'object',
  name: 'innerSectionItem',
  title: 'innerSectionItem',
  fieldsets: [
    {
      name: 'space',
      title: 'Space',
      options: { collapsible: true, collapsed: true, columns: 2 }
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      options: { collapsible: true, collapsed: true }
    }
  ],
  icon: () => <AiOutlineBorderOuter />,
  fields: [
    {
      name: 'content',
      type: 'innerRichText',
      title: 'Content'
    },

    {
      title: 'Top Space',
      name: 'topSpace',
      type: 'string',
      fieldset: 'space',
      options: {
        list: [...sizesList()]
      }
    },
    {
      title: 'Bottom Space',
      name: 'bottomSpace',
      type: 'string',
      fieldset: 'space',
      options: {
        list: [...sizesList()]
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content'
    },
    prepare(selection) {
      const { title, content } = selection
      const block = (content || []).find(block => block._type === 'block')

      return {
        title: `Section : ${title || 'unnamed'}`,
        // subtitle: `${content ? content.length : "0"} Items`,
        subtitle: block
          ? block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
        media: null
      }
    }
  }
}
