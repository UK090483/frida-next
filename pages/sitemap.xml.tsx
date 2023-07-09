import { GetServerSideProps } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { getAllDocSlugs } from 'pageBuilder/queries/fetchDocPathApi'

const Sitemap = () => {
  return (
    <div>
      Should not be navigated via Next Link. Use a standard {`<a>`} tag!
    </div>
  )
}

export default Sitemap

let sitemap: Buffer | null = null

const addUrl = (smStream: SitemapStream, slug: string) => {
  const links = [
    { lang: 'de', url: slug },
    { lang: 'en', url: 'en/' + slug },
  ]

  smStream.write({
    url: `/${slug}`,
    changefreq: 'weekly',
    priority: 0.8,
    links,
  })
  smStream.write({
    url: `en/${slug}`,
    changefreq: 'weekly',
    priority: 0.8,
    links,
  })
}

const addUrls = async (smStream: SitemapStream) => {
  const allPages = await getAllDocSlugs('page')
  const allArtists = await getAllDocSlugs('artist')
  const allArtworks = await getAllDocSlugs('artwork')

  smStream.write({
    url: `/`,
    changefreq: 'weekly',
    priority: 0.8,
  })

  allPages &&
    allPages.map((page) => {
      addUrl(smStream, page.slug)
    })
  allArtists &&
    allArtists.map((artist) => {
      addUrl(smStream, `artist/${artist.slug}`)
    })
  allArtworks &&
    allArtworks.map((artwork) => {
      addUrl(smStream, `artwork/${artwork.slug}`)
    })
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  if (!req || !res) {
    return {
      props: {},
    }
  }
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')

  // If our sitemap is cached, we write the cached sitemap, no query to the CMS.
  if (sitemap) {
    res.write(sitemap)
    res.end()
    return {
      props: {},
    }
  }
  const smStream = new SitemapStream({
    hostname: `https://${req.headers.host}/`,
  })
  const pipeline = smStream.pipe(createGzip())

  try {
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 })
    await addUrls(smStream)
    smStream.end()

    const resp = await streamToPromise(pipeline)

    sitemap = resp

    res.write(resp)
    res.end()
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.write('Could not generate sitemap.')
    res.end()
  }

  return {
    props: {},
  }
}
