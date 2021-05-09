import React from "react";
export default {
  type: "object",
  name: "supporterLogo",
  title: "Supporter",
  fields: [
    {
      name: "logo",
      type: "image",
      title: "Logo",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "active",
      type: "boolean",
      title: "Active",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      active: "active",
      imageUrl: "logo.asset.url",
      // if the movie has a director, follow the relation and get the name
    },
    prepare(selection) {
      const { title, active, imageUrl } = selection;
      return {
        title: `Section : ${title}`,
        subtitle: `${active ? "active" : "not active"}`,
        media: <img src={imageUrl} alt={`${title} logo`} />,
      };
    },
  },
};
