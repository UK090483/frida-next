import client from "part:@sanity/base/client";

export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Bild",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "artist",
      type: "reference",
      title: "artwork",

      to: {
        type: "artwork",
      },
    },
    {
      title: "Preis",
      name: "price",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "variants",
      type: "array",
      title: "Variants",
      description: "Add, edit, and reorder sections",
      of: [{ type: "productVariant" }],
    },
    {
      name: "availability",
      type: "string",
      options: {
        list: [
          { title: "Availabil", value: "availabil" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio", 
      },
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "erreichbar unter meetFrida/artwork/....",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shopify_product_id",
      type: "string",
      title: "Shopify Product ID",
      readOnly: true,
    },
    {
      name: "shopify_variant_id",
      type: "string",
      title: "Shopify Variant ID",
      readOnly: true,
    },
    {
      name: "shopify_updated_at",
      type: "string",
      title: "Shopify Updated At",
      readOnly: true,
    },
  ],
  initialValue: () => ({
    availability: "availabil",
  }),
  preview: {
    select: {
      media: "image",
      title: "title",
    },
  },
};

