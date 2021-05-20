import { BsPeopleCircle } from 'react-icons/bs'

export default {
  name: 'artist',
  type: 'document',
  title: 'Artist',
  icon: BsPeopleCircle,
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
    }
  ],
  preview: {
    select: {
      title: 'anzeigeName',
      subtitle: 'name'
    }
  }
}
