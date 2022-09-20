import client from 'part:@sanity/base/client'
import { CgCardHearts } from 'react-icons/cg'

const requiredWhenNFT = Rule => {
  return Rule.custom((field, context) => {
    if (context?.document?.isNft) {
      return field ? true : 'Required'
    }
    return true
  })
}
const requiredWhenNotNFT = Rule => {
  return Rule.custom((field, context) => {
    if (context?.document?.isNft) {
      return true
    }
    return field ? true : 'Required'
  })
}

export default {
  name: 'artwork',
  type: 'document',
  title: 'Artwork',
  icon: CgCardHearts,

  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'page',
      title: 'Page'
    },
    {
      name: 'extra',
      title: 'Extra'
    },
    {
      name: 'seo',
      title: 'Seo'
    },
    {
      name: 'shopify',
      title: 'Shopify'
    }
  ],
  fieldsets: [
    {
      title: 'Properties',
      name: 'properties',
      description: 'Properties',
      options: { columns: 2, collapsible: false }
    }
  ],

  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
      group: 'content'
    },
    {
      name: 'isNft',
      type: 'boolean',
      title: 'Is NFT',
      initialValue: false,
      group: 'content'
    },
    {
      name: 'nftUrl',
      type: 'url',
      title: 'NFT URL',
      hidden: ({ document }) => !document.isNft,
      validation: Rule => requiredWhenNFT(Rule),
      group: 'content'
    },
    {
      name: 'ethPrice',
      type: 'number',
      title: 'Preis in ETH',
      hidden: ({ document }) => !document.isNft,
      group: 'content'
    },
    {
      name: 'nftInfo',
      type: 'text',
      title: 'NFT Info',
      hidden: ({ document }) => !document.isNft,
      validation: Rule => requiredWhenNFT(Rule),
      group: 'content'
    },
    {
      name: 'mux',
      type: 'mux.video',
      title: 'Video / Gif',
      hidden: ({ document }) => !document.isNft,
      group: 'content'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content'
    },
    {
      name: 'description_en',
      type: 'text',
      title: 'Description En',
      group: 'content'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bild',
      validation: Rule => Rule.required(),
      group: 'content'
    },
    {
      title: 'Preis',
      name: 'price',
      type: 'number',
      validation: Rule => Rule.required(),
      group: 'content',
      fieldset: 'properties'
    },
    {
      name: 'availability',
      type: 'string',
      options: {
        list: [
          { title: 'Availabil', value: 'availabil' },
          { title: 'Sold', value: 'sold' }
        ], // <-- predefined values
        layout: 'radio' // <-- defaults to 'dropdown'
      },
      group: 'content',
      fieldset: 'properties'
    },

    {
      name: 'artist',
      type: 'reference',
      title: 'Artist',

      to: {
        type: 'artist'
      },

      validation: Rule => Rule.required(),
      group: 'content',
      fieldset: 'properties'
    },
    {
      name: 'stil',
      type: 'reference',
      title: 'Stil',

      to: {
        type: 'stil'
      },

      validation: Rule => Rule.required(),
      group: 'content',
      fieldset: 'properties'
    },
    {
      name: 'medium',
      type: 'reference',
      title: 'Medium',

      to: {
        type: 'medium'
      },

      validation: Rule => Rule.required(),
      group: 'content',
      fieldset: 'properties'
    },
    {
      title: 'Weite',
      name: 'width',
      type: 'number',
      hidden: ({ document }) => document.isNft,
      validation: Rule => requiredWhenNotNFT(Rule),
      group: 'content',
      fieldset: 'properties'
    },
    {
      title: 'Höhe',
      name: 'height',
      type: 'number',
      hidden: ({ document }) => document.isNft,
      validation: Rule => requiredWhenNotNFT(Rule),
      group: 'content',
      fieldset: 'properties'
    },
    {
      title: 'Deph',
      name: 'depth',
      type: 'number',
      hidden: ({ document }) => document.isNft,
      group: 'content',
      fieldset: 'properties'
    },

    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'erreichbar unter meetFrida/artwork/....',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'hints',
      type: 'array',
      title: 'Hints',
      of: [{ type: 'productHint' }],
      group: 'extra'
    },

    {
      name: 'alternaiveSlug',
      type: 'slug',
      title: 'Alternative Slug',
      description: 'erreichbar unter meetFrida/....',
      options: {
        isUnique: isUniqueAcrossPages
      },
      group: 'extra'
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description:
        'um so hoher die nummer desto früher erscheint das kunstwerk',
      options: {
        list: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      },
      group: 'extra'
    },
    {
      name: 'banner',
      type: 'string',
      title: 'Banner',

      options: {
        list: [{ title: 'Hinz&Kunzt', value: 'hinzundkunzt' }]
      },
      group: 'extra'
    },
    {
      name: 'shopify_product_id',
      type: 'string',
      title: 'Shopify Product ID',
      readOnly: true,
      group: 'shopify'
    },
    {
      name: 'shopify_variant_id',
      type: 'string',
      title: 'Shopify Variant ID',
      readOnly: true,
      group: 'shopify'
    },
    {
      name: 'shopify_handle',
      type: 'string',
      title: 'Shopify Handle',
      readOnly: true,
      group: 'shopify'
    },

    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'seo'
    }
  ],
  orderings: [
    {
      title: 'Artist',
      name: 'artist',
      by: [{ field: 'artist.anzeigeName', direction: 'asc' }]
    }
  ],
  initialValue: () => ({
    availability: 'availabil'
  }),
  preview: {
    select: {
      media: 'image',
      title: 'name',
      subtitle: 'artist.anzeigeName'
    }
  }
}

function isUniqueAcrossPages(slug, options) {
  const { document } = options

  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug
  }

  const query = `!defined(*[!(_type == 'page' && _id in [$draft, $published]) && slug.current == $slug][0]._id)`

  return client.fetch(query, params)
}
