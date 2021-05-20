import React from 'react'
import { AiOutlineBorderOuter } from 'react-icons/ai'
import { colorList, sizesList } from '../snippets'
export default {
  type: 'object',
  name: 'section',
  title: 'Section',
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
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'content',
      type: 'defaultRichText',
      title: 'Content'
    },
    {
      name: 'content_en',
      type: 'defaultRichText',
      title: 'Content En'
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Medium Wide', value: 'medium-wide' },
          { title: 'Narrow', value: 'text' },
          { title: 'Hero', value: 'hero' }
        ]
      },
      initialValue: 'normal'
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [...colorList()]
      }
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
    },
    {
      title: 'Background Image',
      name: 'bgImage',
      type: 'figure',
      fieldset: 'bgImage'
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
