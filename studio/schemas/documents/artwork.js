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
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'isNft',
      type: 'boolean',
      title: 'Is NFT',
      initialValue: false
    },
    {
      name: 'nftUrl',
      type: 'url',
      title: 'NFT URL',
      hidden: ({ document }) => !document.isNft,
      validation: Rule => requiredWhenNFT(Rule)
    },
    {
      name: 'nftInfo',
      type: 'text',
      title: 'NFT Info',
      hidden: ({ document }) => !document.isNft,
      validation: Rule => requiredWhenNFT(Rule)
    },
    {
      name: 'mux',
      type: 'mux.video',
      title: 'Video / Gif',
      hidden: ({ document }) => !document.isNft
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'description_en',
      type: 'text',
      title: 'Description En'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bild',
      validation: Rule => Rule.required()
    },

    {
      name: 'artist',
      type: 'reference',
      title: 'Artist',

      to: {
        type: 'artist'
      },

      validation: Rule => Rule.required()
    },
    {
      name: 'stil',
      type: 'reference',
      title: 'Stil',

      to: {
        type: 'stil'
      },

      validation: Rule => Rule.required()
    },
    {
      name: 'medium',
      type: 'reference',
      title: 'Medium',

      to: {
        type: 'medium'
      },

      validation: Rule => Rule.required()
    },
    {
      title: 'Weite',
      name: 'width',
      type: 'number',
      hidden: ({ document }) => document.isNft,
      validation: Rule => requiredWhenNotNFT(Rule)
    },
    {
      title: 'Höhe',
      name: 'height',
      type: 'number',
      hidden: ({ document }) => document.isNft,
      validation: Rule => requiredWhenNotNFT(Rule)
    },
    {
      title: 'Deph',
      name: 'depth',
      type: 'number',
      hidden: ({ document }) => document.isNft
    },
    {
      title: 'Preis',
      name: 'price',
      type: 'number',
      validation: Rule => Rule.required()
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
      }
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
      of: [{ type: 'productHint' }]
    },

    {
      name: 'alternaiveSlug',
      type: 'slug',
      title: 'Alternative Slug',
      description: 'erreichbar unter meetFrida/....',
      options: {
        isUnique: isUniqueAcrossPages
      }
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description:
        'um so hoher die nummer desto früher erscheint das kunstwerk',
      options: {
        list: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      }
    },
    {
      name: 'banner',
      type: 'string',
      title: 'Banner',

      options: {
        list: [{ title: 'Hinz&Kunzt', value: 'hinzundkunzt' }]
      }
    },
    {
      name: 'shopify_product_id',
      type: 'string',
      title: 'Shopify Product ID',
      readOnly: true
    },
    {
      name: 'shopify_variant_id',
      type: 'string',
      title: 'Shopify Variant ID',
      readOnly: true
    },
    {
      name: 'shopify_handle',
      type: 'string',
      title: 'Shopify Handle',
      readOnly: true
    },

    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
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
