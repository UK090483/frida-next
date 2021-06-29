
import { BsPeopleCircle } from 'react-icons/bs'

export default {
  name: 'artist',
  type: 'document',
  title: 'Artist',
  icon: BsPeopleCircle,
  fieldsets: [
    {name: 'images', title: 'Images', options:{collapsible:true,collapsed:true} }
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'anzeigeName',
      type: 'string',
      title: 'AnzeigeName',
      validation: Rule => Rule.required().max(20)
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'erreichbar unter meetFrida/artist/....',
      options: {
        source: 'anzeigeName',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name:'prevImage',
      type :'defaultImage',
      title:'Preview Image',
      fieldset: 'images'
    },
    {
      name:'mainImage',
      type :'defaultImage',
      title:'Main Image',
      fieldset: 'images'
    },
    {
      name:'imageGallery',
      type :'array',
      title:'Gallery',
      fieldset: 'images',
      of:[{type:'defaultImage'}]
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: Rule => Rule.required()
    },

    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: Rule => Rule.required()
    },
    {
      name: 'description_en',
      type: 'text',
      title: 'Description En'
    },
    {
      name: 'instagramLink',
      type: 'url',
      title: 'instagram Link'
    },
    {
      name: 'webLink',
      type: 'url',
      title: 'Web Link'
    },
  
    {
      name: 'content',
      type: 'array',
      title: 'Custom Page Build',
      description:
        'Add, edit, and reorder sections (if this is empty, the default template will be used)',
      of: [
        {
          type: 'object',
          name: 'artistHero',
          title: 'Artist:Hero',
          fields: [{ type: 'string', name: 'artistInfo', title: 'Artist:Info' }]
        },
        {
          type: 'object',
          name: 'artistInfo',
          title: 'Artist:Info',
          fields: [{ type: 'string', name: 'artistInfo', title: 'Artist:Info' }]
        },
        {
          type: 'object',
          name: 'artistWorks',
          title: 'Artist:Works',
          fields: [{ type: 'string', name: 'artistInfo', title: 'Artist:Info' }]
        },
        {
          type: 'object',
          name: 'artistImages',
          title: 'Artist:Images',
          fields: [{ type: 'string', name: 'artistInfo', title: 'Artist:Info' }]
        },
        { type: 'section' },
        { type: 'carouselHero' },
        { type: 'artworks' },
        { type: 'artists' },
        { type: 'posts' },
        { type: 'categories' },
        { type: 'products' },
        { type: 'marquee' },
        { type: 'quotes' }
      ]
    }
  ],
  preview: {
    select: {
      anzeigeName: 'anzeigeName',
      slug:'slug',
      mainImage:'mainImage'
      
    },
    prepare({ anzeigeName,slug,mainImage }) {
      return {
        title: anzeigeName,
        subtitle: slug ? slug.current :'',
        media: mainImage
      }
    }
  }
  // preview: {
  //   select: {
  //     title: 'anzeigeName',
  //     subtitle: 'name'
  //   }
  // }
}
