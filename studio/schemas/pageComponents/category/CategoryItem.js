export default {
  name: "categoryItem",
  type: "object",
  title: "Category Item",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
    },
    {
      title: "Size",
      name: "size",
      type: "string",
      options: {
        list: [
          { title: "s", value: "s" },
          { title: "m", value: "m" },
          { title: "l", value: "l" },
        ],
      },
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
