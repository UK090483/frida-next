import { ArtistPageResult } from '@pages/artist/[...slug]'
import { PostPageResult } from 'contentTypes/Post/PostSingle'
import { ProductSingleViewResult } from 'contentTypes/Product/ProductSingle'
import { ParsedUrlQuery } from 'node:querystring'
import { ArtworkSingleViewResult } from '../../contentTypes/Artwork/ArtworkSingle/artworksQueries'
import { fetchPageWithCache } from './fetchPageApi'
import { PageResult } from './pageQueries'

type handleStaticPropsProps = {
  params?: ParsedUrlQuery
  locale?: string
  query: string
}

type handleStaticPropsResult =
  | {
      props: {
        slug: string
        lang?: string
        data:
          | PageResult
          | ArtworkSingleViewResult
          | ArtistPageResult
          | PostPageResult
          | ProductSingleViewResult
          | null
      }
    }
  | { notFound: true }

export const handleStaticProps: (
  props: handleStaticPropsProps
) => Promise<handleStaticPropsResult> = async (props) => {
  const { params, locale, query } = props

  if (!params || !params.slug) {
    return {
      notFound: true,
    }
  }
  const slug =
    typeof params.slug === 'string' ? params.slug : params.slug.join('')

  const pageData = await fetchPageWithCache(query, slug)

  return {
    props: {
      slug,
      data: pageData,
      lang: locale,
    },
  }
}
