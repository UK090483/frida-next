import React from "react";

const pinkIcon = () => <span style={{ color: "#f5c5d9" }}>P</span>;
const pinkRender = (props) => (
  <span style={{ color: "#f5c5d9" }}>{props.children}</span>
);
const whiteIcon = () => (
  <span style={{ color: "white", backgroundColor: "black" }}>W</span>
);
const whiteRender = (props) => (
  <span style={{ color: "white", backgroundColor: "black" }}>
    {props.children}
  </span>
);

const Button = (props) => {
  return <span>{props.label}</span>;
};

export default {
  name: "defaultRichText",
  type: "array",
  title: "Text",

  of: [
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        {
          title: "Header-big",
          value: "custom-header-big",
          blockEditor: { render: (props) => <h1>{props.children}</h1> },
        },
        {
          title: "Header-medium",
          value: "custom-header-medium",
          blockEditor: { render: (props) => <h1>{props.children}</h1> },
        },
        {
          title: "Header-small",
          value: "custom-header-small",
          blockEditor: { render: (props) => <h1>{props.children}</h1> },
        },
        {
          title: "SubHeader",
          value: "custom-subHeader",
          blockEditor: { render: (props) => <h3>{props.children}</h3> },
        },

        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Underline",
            value: "underline",
          },

          {
            title: "Pink",
            value: "pink",
            blockEditor: { icon: pinkIcon, render: pinkRender },
          },
          {
            title: "white",
            value: "white",
            blockEditor: { icon: whiteIcon, render: whiteRender },
          },
        ],
        annotations: [
          {
            name: "frida",
            type: "object",
            title: "Frida",
            fields: [
              {
                title: "Color",
                name: "color",
                type: "string",
                options: {
                  list: [
                    { title: "White", value: "white" },
                    { title: "Pink", value: "pink" },
                  ],
                  layout: "radio",
                },
              },
            ],
            blockEditor: {
              icon: () => "Frida",
              render: (props) => {
                return (
                  <span>
                    #Meet
                    <span style={{ textDecoration: "underline" }}>
                      {props.children}
                    </span>
                  </span>
                );
              },
            },
          },
        ],
      },
    },
    { type: "button", blockEditor: { render: Button } },
    { type: "embed" },
  ],
};
