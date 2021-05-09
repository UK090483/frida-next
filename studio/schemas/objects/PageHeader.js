export default {
  title: "Page Header",
  name: "pageHeader",
  type: "object",
  options: {
    collapsible: true,
  },
  fields: [
    {
      title: "Initial Page title Color",
      name: "initialPageTitleColor",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Pink", value: "pink" },
        ],
        layout: "radio",
      },
    },
    {
      title: "PageTitle without Home Link",
      name: "withOutHomeLink",
      type: "boolean",
    },
    {
      title: "Hide Menu",
      name: "hideMenu",
      type: "boolean",
    },
  ],
};
