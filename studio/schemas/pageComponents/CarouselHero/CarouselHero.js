import { FiMaximize2 } from 'react-icons/fi'

export default {
  name: 'carouselHero',
  type: 'object',
  title: 'Carousel Hero',
  icon: FiMaximize2,
  fields: [
    {
      name: 'carouselHeroItems',
      type: 'array',
      title: 'Carousel items',
      description: 'Add, edit, and reorder Items',
      of: [{ type: 'carouselHeroItem' }]
    }
  ],
  preview: {
    select: {
      carouselHeroItems: 'carouselHeroItems'
    },
    prepare(selection) {
      const { carouselHeroItems } = selection

      return {
        title: 'Carousel Hero',
        subtitle: `${carouselHeroItems ? carouselHeroItems.length : '0'} items`
      }
    }
  }
}
