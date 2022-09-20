import buildListingBlock from '../snippets/buildListingBlock'

const li = buildListingBlock({
  title: 'Exhibitions',
  name: 'exhibitions',
  listOptions: [
    { title: 'Carousel Custom', value: 'custom' },
    { title: 'Full with Filter ', value: 'full' }
  ],
  customItemTypes: ['exhibition'],
  hideStyleOnType: type => type === 'full',
  hideCustomItemsOnType: type => type === 'full'
})

export default li
