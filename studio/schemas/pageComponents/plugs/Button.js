import React from 'react'
import { colorList } from '../../snippets'

export default {
  title: 'Button',
  name: 'button',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Label' },
    { name: 'label_en', type: 'string', title: 'Label En' },
    {
      title: 'Internal link',
      description: 'Use this to link between pages on the website',
      name: 'internalLink',
      type: 'reference',
      to: [
        { type: 'indexPage' },
        { type: 'page' },
        { type: 'artwork' },
        { type: 'artist' }
      ]
      // to: [
      //   {
      //     name: 'artists',
      //     type: 'reference',
      //     to: {
      //       type: 'artist'
      //     }
      //   },
      //   {
      //     name: 'artwork',
      //     type: 'reference',
      //     to: {
      //       type: 'artwork'
      //     }
      //   },
      //   {
      //     name: 'post',
      //     type: 'reference',
      //     to: {
      //       type: 'post'
      //     }
      //   },
      //   {
      //     name: 'pages',
      //     type: 'reference',
      //     to: {
      //       type: 'page'
      //     }
      //   },
      //   {
      //     name: 'Home',
      //     type: 'reference',
      //     to: {
      //       type: 'indexPage'
      //     }
      //   }
      // ]
    },
    {
      title: 'External link',
      name: 'link',
      type: 'url'
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'black'
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'white'
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      options: {
        list: [
          { title: 'Inline', value: 'inline' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'center', value: 'center' }
        ]
      },
      initialValue: 'inline'
    }
  ],
  preview: {
    select: {
      label: 'label'
    },
    prepare(value) {
      return { title: value.label || 'Label' }
    }
  }
}
