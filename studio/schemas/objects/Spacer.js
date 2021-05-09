export default {
  type: "object",
  name: "spacer",
  title: "Spacer",
  fields: [
    {
      title: "Size",
      name: "size",
      type: "string",
      options: {
        list: [
          { title: "s", value: "s" },
          { title: "m", value: "m" },
          { title: "l", value: "l" },
          { title: "xl", value: "xl" },
          { title: "xxl", value: "xxl" },
        ],
        layout: "radio",
      },
    },
  ],
};
