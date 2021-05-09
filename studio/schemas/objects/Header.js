export default {
  title: "Header",
  name: "header",
  type: "object",
  fields: [
    { name: "text", type: "string", title: "Text" },
    {
      title: "Variant",
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
          { title: "H5", value: "h5" },
          { title: "H6", value: "h6" },
        ],
      },
    },
  ],
};
