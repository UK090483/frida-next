export default {
  name: "medium",
  type: "document",
  title: "Medium",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
