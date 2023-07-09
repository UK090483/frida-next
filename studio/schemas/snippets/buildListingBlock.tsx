type buildListingBlockProps = {
  title: string
  name: string
  listOptions: { title: string; value: string }[]
  customItemTypes: string[]
  hideStyleOnType: (type: string) => boolean
  hideCustomItemsOnType?: (type: string) => boolean
}

const buildListingBlock = ({
  title,
  name,
  listOptions,
  customItemTypes,
  hideStyleOnType,
  hideCustomItemsOnType = () => false
}: buildListingBlockProps) => {
  return {
    title,
    name,
    type: 'object',

    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        title: 'Type',
        name: 'type',
        type: 'string',
        options: {
          list: listOptions,
          layout: 'radio'
        }
      },
      {
        title: 'CustomItems',
        name: 'customItems',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: customItemTypes.map(i => ({ type: i }))
          }
        ],
        hidden: ({ parent }) => {
          return hideCustomItemsOnType(parent.type)
        }
      },
      {
        name: 'label',
        type: 'string',
        title: 'Label',
        hidden: ({ parent }) => {
          return hideStyleOnType(parent.type)
        }
      },
      {
        name: 'label_en',
        type: 'string',
        title: 'Label En',
        hidden: ({ parent }) => {
          return hideStyleOnType(parent.type)
        }
      },
      {
        title: 'Background Color',
        name: 'bgColor',
        type: 'string',
        options: {
          list: [
            { title: 'White (default)', value: 'white' },
            { title: 'Grey', value: 'grey' }
          ]
        },

        hidden: ({ parent }) => {
          return hideStyleOnType(parent.type)
        }
      }
    ],
    preview: {
      select: {
        type: 'type',
        name: 'name'
      },
      prepare({ type, name }) {
        return {
          title: `Exhibitions ${type}`,
          subtitle: name
        }
      }
    }
  }
}

export default buildListingBlock
