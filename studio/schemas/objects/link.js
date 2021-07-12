import React from 'react'


export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  validation: Rule => Rule.custom(fields => {
   
    if(fields?.internalLink && fields?.link){
      return 'you can just set one link Source'
    }
    if(!fields?.internalLink && !fields?.link){
      return 'you need to use one Link source: Internal or normal link'
    }
    return true
  }).error(),
  fields: [
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
      },

      {
        title: 'External link',
        name: 'link',
        type: 'url'
      },
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
