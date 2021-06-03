export default {
  name: 'quote',
  type: 'document',
  title: 'Zitate',
  fields: [
    {
      name: 'author',
      type: 'string',
      title: 'Author Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Author subtitle'
    },
    {
      name: 'subtitle_en',
      type: 'string',
      title: 'Author subtitle En'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Author Bild',
      options: {
        hotspot: true
      }
    },
    {
      name: 'targetImage',
      type: 'image',
      title: 'Bild',
      options: {
        hotspot: true
      }
    },
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      validation: Rule => Rule.required()
    },
    {
      name: 'quote_en',
      type: 'text',
      title: 'Quote En'
    },
    {
      name: 'link',
      type: 'reference',
      title: 'Link',
      to: [
        {
          type: 'artwork',
          title: 'Artwork',
          name: 'artwork'
        },
        {
          type: 'artist',
          title: 'Artist',
          name: 'artist'
        }
      ]
    },
    {
      name: 'references',
      type: 'array',
      title: 'Referenzen',
      description: 'wo wird das zitat gezeigt',
      of: [
        {
          name: 'Artwork',
          type: 'reference',
          title: 'Artwork',
          to: {
            type: 'artwork'
          }
        },
        {
          name: 'Artist',
          type: 'reference',
          title: 'Artist',
          to: {
            type: 'artist'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'name'
    }
  }
}
