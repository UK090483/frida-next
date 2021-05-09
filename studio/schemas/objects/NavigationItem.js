export default {
  title: "Navigation Item",
  name: "navigationItem",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },
    { name: "label_en", type: "string", title: "Label En" },
    {
      title: "Internal link",
      description: "Use this to link between pages on the website",
      name: "internalLink",
      type: "reference",
      weak: false,
      to: [{ type: "indexPage" }, { type: "page" }],
    },
    {
      title: "External link",
      name: "link",
      type: "url",
    },
  ],
};
