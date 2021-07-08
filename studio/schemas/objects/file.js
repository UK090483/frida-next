import React from 'react'


export default {
  title: 'File',
  name: 'fileObject',
  type: 'file',
  fields: [
        {
        name: 'name',
        type: 'string',
        title: 'Name'
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
