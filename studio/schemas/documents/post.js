export default {
  type: 'document',
  name: 'post',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'title_en',
      type: 'string',
      title: 'Title en',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: Rule => Rule.required(),
      description: 'erreichbar unter meetFrida/posts/....',
      options: {
        source: 'title_en',
        maxLength: 96
      }
    },
    {
      name: 'headerImage',
      type: 'image',
      title: 'Header Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      }
    },
    {
      name: 'previewImage',
      type: 'image',
      title: 'Preview Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'postCategory'
          }
        }
      ]
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'categories' },
        { type: 'carouselHero' },
        { type: 'section' },
        { type: 'artworks' },
        { type: 'supporter' },
        { type: 'artists' }
      ]
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'excerpt_en',
      type: 'text',
      title: 'Excerpt En',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'title'
    }
  }
}
