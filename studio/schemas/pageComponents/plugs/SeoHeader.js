import { colorList } from '../../snippets'

export default {
  title: 'SeoHeader',
  name: 'seoHeader',
  type: 'object',
  fields: [
    { name: 'text', type: 'text', title: 'Text' },
    {
      name: 'headerType',
      type: 'string',
      title: 'Header Type',
      initialValue: 'H1',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {
            title: 'H1 (just one perpage)',
            value: 'H1'
          },
          {
            title: 'H2 ',
            value: 'H2'
          },
          {
            title: 'H3 ',
            value: 'H3'
          }
        ]
      }
    },
    {
      name: 'headerStyle',
      type: 'string',
      title: 'Header Type',
      initialValue: 'Header-big',
      validation: Rule => Rule.required(),
      options: {
        list: ['Header-big', 'Header-medium', 'Header-small', 'SubHeader']
      }
    },
    {
      name: 'headerColor',
      type: 'string',
      title: 'Header Color',
      initialValue: 'black',
      validation: Rule => Rule.required(),
      options: {
        list: [...colorList()]
      }
    }
  ],
  preview: {
    select: {
      text: 'text',
      headerType: 'headerType',
      headerStyle: 'headerStyle'
    },
    prepare({ text, headerType, headerStyle }) {
      return { title: `${headerType}/${headerStyle}/${text || ''}` }
    }
  }
}
