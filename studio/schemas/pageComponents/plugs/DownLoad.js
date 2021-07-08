import React from 'react'
import { colorList } from '../../snippets'

export default {
  title: 'Download',
  name: 'download',
  type: 'object',
  validation: Rule => Rule.custom(fields => {
   
    if(fields.image && fields.file){
      return 'you can just set Image OR File... Erase the one you do not use'
    }
    if(!fields.image && !fields.file){
      return 'you need to use one download source: Image or File'
    }
    return true
  }).error(),
 
  fields: [
        {
        name: 'label',
        type: 'string',
        title: 'Label',
       
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
        name: 'image',
        type: 'image',
        title: 'Image'
      },
      {
        name: 'file',
        type: 'file',
        title: 'File'
      },
  ],
  preview: {
    select: {
      label: 'label'
    },
    prepare(value) {
      return { title: value.label || 'Download' }
    }
  }
}
