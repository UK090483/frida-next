export default {
  type: "document",
  name: "page",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title_en",
      type: "string",
      title: "Title en",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
    },
    {
      name: "pageHeader",
      type: "pageHeader",
      title: "Header",
    },
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [
        { type: "categories" },
        { type: "carouselHero" },
        { type: "section" },
        { type: "artworks" },
        { type: "supporter" },
        { type: "artworkCarousel" },
      ],
    },

    {
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
    },
  ],
  preview: {
    select: {
      title: "slug.current",
      subtitle: "title",
    },
  },
};
