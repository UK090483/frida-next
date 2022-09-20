export default {
  title: 'Artworks',
  name: 'artworks',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'label', type: 'string', title: 'Label' },
    { name: 'label_en', type: 'string', title: 'Label En' },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Grey', value: 'grey' }
        ]
      },
      initialValue: 'white'
    },

    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Masonry', value: 'masonry' }
        ],
        layout: 'radio'
      },
      initialValue: 'carousel'
    },
    {
      title: 'Order',
      name: 'order',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'LastEdited first', value: 'lastEdited' },
          { title: 'Rating', value: 'rating' }
        ]
      }
    },
    {
      name: 'filter',
      type: 'array',
      of: [
        {
          name: 'artistFilter',
          type: 'reference',
          to: {
            type: 'artist'
          }
        },
        {
          name: 'mediumFilter',
          type: 'reference',
          to: {
            type: 'medium'
          }
        },
        {
          name: 'stilFilter',
          type: 'reference',
          to: {
            type: 'stil'
          }
        }
      ]
    },
    {
      name: 'count',
      type: 'string',
      title: 'Number of Items',
      options: {
        list: [
          { title: 'All (don`t us to often)', value: 'all' },
          { title: '20', value: '20' }
        ],
        layout: 'radio'
      },

      initialValue: '20'
    }
  ],
  preview: {
    select: {
      type: 'type',
      name: 'name'
    },
    prepare({ type, name }) {
      return {
        title: `Artworks ${type}`,
        subtitle: name
      }
    }
  }
}

// export default {
//   title: 'Artworks',
//   name: 'artworks',
//   type: 'object',

//   fields: [
//     {
//       name: 'name',
//       type: 'string',
//       title: 'Name'
//     },
//     {
//       title: 'Type',
//       name: 'type',
//       type: 'string',
//       options: {
//         list: [
//           {
//             title: 'Carousel (default) Last edited',
//             value: 'carousel_lastEdited'
//           },
//           { title: 'Carousel Custom', value: 'carousel_custom' },
//           { title: 'Full with Filter ', value: 'full' }
//         ],
//         layout: 'radio'
//       },
//       initialValue: 'carousel'
//     },
//     {
//       title: 'CustomItems',
//       name: 'customItems',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{ type: 'artwork' }]
//         }
//       ],
//       hidden: ({ parent }) => {
//         return parent.type !== 'carousel_custom'
//       }
//     },
//     {
//       name: 'label',
//       type: 'string',
//       title: 'Label',
//       hidden: ({ parent }) => {
//         return parent.type === 'full'
//       }
//     },
//     {
//       name: 'label_en',
//       type: 'string',
//       title: 'Label En',
//       hidden: ({ parent }) => {
//         return parent.type === 'full'
//       }
//     },
//     {
//       title: 'Background Color',
//       name: 'bgColor',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'White (default)', value: 'white' },
//           { title: 'Grey', value: 'grey' }
//         ]
//       },

//       hidden: ({ parent }) => {
//         return parent.type === 'full'
//       }
//     }
//   ],
//   preview: {
//     select: {
//       type: 'type',
//       name: 'name'
//     },
//     prepare({ type, name }) {
//       return {
//         title: `Artworks ${type}`,
//         subtitle: name
//       }
//     }
//   }
// }
