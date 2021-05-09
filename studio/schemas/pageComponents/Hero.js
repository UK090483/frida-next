export default {
  title: "Hero",
  name: "hero",
  type: "object",

  fields: [
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [{ type: "richText" }, { type: "button" }],
    },

    {
      title: "Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Pink", value: "pink" },
          { title: "Rot", value: "red" },
        ],
        layout: "radio",
      },
    },
    {
      title: "backgroundImage",
      name: "bgImage",
      type: "image",
    },
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare(selection) {
      const { content } = selection;

      return {
        title: "Hero",
        subtitle: `${content.length} items`,
      };
    },
  },
};
