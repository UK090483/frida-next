import React from "react";
import { BsCardText } from "react-icons/bs";

export default {
  title: "Text",
  name: "richText",
  type: "object",
  fields: [{ name: "content", type: "defaultRichText", title: "Text" }],
  icon: () => <BsCardText />,

  preview: {
    select: {
      content: "content",
    },
    prepare(selection) {
      const { content } = selection;

      return {
        title: "Text",
      };
    },
  },
};
