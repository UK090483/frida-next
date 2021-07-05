import { FiRepeat } from 'react-icons/fi'
import { colorList } from '../snippets'
export default {
  title: 'Marquee',
  name: 'marquee',
  type: 'object',
  icon: FiRepeat,
  fieldsets: [
    {
      title: '',
      name: 'options',
      options: { columns: 2 }
    },
    {
      title: 'Colors',
      name: 'colors',
      options: { columns: 2 }
    }
  ],
  fields: [
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          title: 'Text',
          name: 'simple',
          type: 'object',
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              title: 'Text En',
              name: 'text_en',
              type: 'string'
            }
          ],
          preview: {
            select: {
              text: 'text'
            },
            prepare({ text }) {
              return {
                title: text
              }
            }
          }
        },
        {
          title: 'Photo',
          name: 'photo',
          type: 'figure',
         
        }
        
      ],
      validation: Rule => Rule.min(1).required()
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'black',
      fieldset: 'colors'
    },
    {
      title: 'Color Hover',
      name: 'colorHover',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'black',
      fieldset: 'colors'
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'white',
      fieldset: 'colors'
    },
    {
      title: 'Background Color Hover',
      name: 'bgColorHover',
      type: 'string',
      options: {
        list: [...colorList()]
      },
      initialValue: 'white',
      fieldset: 'colors'
    },
    {
      title: 'Speed',
      name: 'speed',
      type: 'number',
      description: 'Pick a number between 0-1 (0.5 is the default)',
      validation: Rule =>
        Rule.min(0)
          .max(1)
          .precision(1)
    },
    {
      title: 'Reverse direction?',
      name: 'reverse',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      title: 'Pause on hover?',
      name: 'pauseable',
      type: 'boolean',
      fieldset: 'options'
    }
  ],
  preview: {
    select: {
      text: 'text'
    },
    prepare({ text }) {
      return {
        title: 'Marquee',
        subtitle: text
      }
    }
  }
}
