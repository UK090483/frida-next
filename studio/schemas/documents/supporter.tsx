export default {
  name: "supporterLogos",
  type: "document",
  title: "Supporter",
  fields: [
    {
      name: "supporter",
      title: "Supporter",
      type: "array",
      of: [{ type: "supporterLogo" }],
    },
    {
      name: "kooperator",
      title: "Kooperator",
      type: "array",
      of: [{ type: "supporterLogo" }],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
