export default {
  title: "Variant",
  name: "productVariant",
  type: "object",

  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "image",
      type: "image",
      title: "Bild",
    },
    {
      title: "Preis",
      name: "price",
      type: "number",
    },
    {
      name: "availability",
      type: "string",
      options: {
        list: [
          { title: "Availabil", value: "availabil" },
          { title: "Sold", value: "sold" },
        ], // <-- predefined values
        layout: "radio", // <-- defaults to 'dropdown'
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
