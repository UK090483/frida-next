import React from 'react'
import { AiOutlineBorderOuter } from 'react-icons/ai'
export default {
  type: 'object',
  name: 'section',
  title: 'Section',
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
          { title: 'Text', value: 'text' },
          { title: 'Hero', value: 'hero' }
        ]
      }
    },
    {
      title: 'Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Pink', value: 'pink' },
          { title: 'Red', value: 'red' },
          { title: 'Black', value: 'black' }
        ],
        layout: 'radio'
      }
    },

    {
      title: 'Top Space',
      name: 'topSpace',
      type: 'string',
      options: {
        list: [
          { title: 's', value: 's' },
          { title: 'm', value: 'm' },
          { title: 'l', value: 'l' },
          { title: 'xl', value: 'xl' },
          { title: 'xxl', value: 'xxl' }
        ]
      }
    },
    {
      title: 'Bottom Space',
      name: 'bottomSpace',
      type: 'string',
      options: {
        list: [
          { title: 's', value: 's' },
          { title: 'm', value: 'm' },
          { title: 'l', value: 'l' },
          { title: 'xl', value: 'xl' },
          { title: 'xxl', value: 'xxl' }
        ]
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
