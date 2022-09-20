import buildSite from '../snippets/buildSite'

export default buildSite({
  name: 'exhibition',
  title: 'Exhibition',
  content: [
    {
      title: 'Start Date',
      name: 'startDate',
      type: 'date'
    },
    {
      title: 'End Date',
      name: 'endDate',
      type: 'date'
    }
  ],
  page: [
    {
      name: 'headerImage',
      type: 'image',
      title: 'Header Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },
      group: 'page'
    },
    {
      name: 'previewImage',
      type: 'image',
      title: 'Preview Image',
      options: {
        hotspot: true
      },
      group: 'page'
    }
  ]
})
