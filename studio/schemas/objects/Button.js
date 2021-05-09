export default {
  title: "Button",
  name: "button",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },
    {
      title: "Internal link",
      description: "Use this to link between pages on the website",
      name: "internalLink",
      type: "reference",
      to: [{ type: "indexPage" }, { type: "page" }, { type: "artwork" }],
    },
    {
      title: "External link",
      name: "link",
      type: "url",
    },

    {
      title: "Color",
      name: "color",
      type: "string",
      options: {
        list: [
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Pink", value: "pink" },
          { title: "Rot", value: "red" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Pink", value: "pink" },
          { title: "Rot", value: "red" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Inline",
      name: "inline",
      type: "boolean",
    },
  ],
};
