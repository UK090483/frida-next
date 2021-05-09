export default {
  name: "quote",
  type: "document",
  title: "Zitate",
  fields: [
    {
      name: "author",
      type: "string",
      title: "Author Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      type: "string",
      title: "Author subtitle",
    },
    {
      name: "image",
      type: "image",
      title: "Author Bild",
      options: {
        hotspot: true,
      },
    },
    {
      name: "quote",
      type: "text",
      title: "Quote",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "Artwork",
      type: "reference",
      title: "Artwork",
      to: {
        type: "artwork",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "name",
    },
  },
};
