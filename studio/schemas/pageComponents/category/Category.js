export default {
  name: "categories",
  type: "object",
  title: "Categories",
  fields: [
    {
      name: "content",
      type: "array",
      title: "Category items",
      description: "Add, edit, and reorder Items",
      of: [{ type: "categoryItem" }],
    },
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare(selection) {
      const { content } = selection;

      return {
        title: "Categories",
        subtitle: `${content.length} items`,
      };
    },
  },
};
