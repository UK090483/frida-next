export const defaultBockContent = {
  name: 'content',
  type: 'array',
  title: 'Page sections',
  description: 'Add, edit, and reorder sections',
  of: [
    { type: 'section' },
    { type: 'carouselHero' },
    { type: 'artworks' },
    { type: 'artists' },
    { type: 'exhibitions' },
    { type: 'posts' },
    { type: 'categories' },
    { type: 'products' },
    { type: 'marquee' },
    { type: 'quotes' },
    { type: 'search' }
  ]
}

export function colorList(skip) {
  const list = [
    { title: 'Black', value: 'black' },
    { title: 'White', value: 'white' },
    { title: 'Pink', value: 'pink' },
    { title: 'Red', value: 'red' },
    { title: 'Grey', value: 'grey' }
  ]
  if (!Array.isArray(skip)) return list

  return list.filter(listItem => !skip.includes(listItem.value))
}

export function sizesList(skip) {
  const list = [
    { title: 's', value: 's' },
    { title: 'm', value: 'm' },
    { title: 'l', value: 'l' },
    { title: 'xl', value: 'xl' },
    { title: 'xxl', value: 'xxl' }
  ]
  if (!Array.isArray(skip)) return list

  return list.filter(listItem => !skip.includes(listItem.value))
}
