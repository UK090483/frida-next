require('dotenv').config({ path: '.env.local' })
const http = require('http')
const createSanityClient = require('@sanity/client')

const { API_URL, PORT = '3000', HOST = 'localhost' } = process.env

const options = {
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}
const sanityClient = createSanityClient(options)

let data = null

async function handler(req, res) {
  console.log(`📥 GET ${req.url}`)

  if (!data) {
    console.log(`filling Cache`)
    data = await sanityClient.fetch(`*[_type == 'artwork']{
      'imageAssetId':image.asset._ref,
      availability,
      'artistName':artist->anzeigeName,
      'slug': slug.current,
      banner,
      'price': round(price*1.16),
      'artworkName':name,
      'photo': image {
        alt,
        asset,
        crop,
        customRatio,
        hotspot,
        "id": asset->assetId,
        "type": asset->mimeType,
        "aspectRatio": asset->metadata.dimensions.aspectRatio,
        "lqip": asset->metadata.lqip
      },
      'stil':stil->name,
      'medium':medium->name
    }`)
  } else {
    console.log(`from Cache`)
  }

  // res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.setHeader('Content-Type', 'application/json')

  res.end(JSON.stringify(data))
}

http.createServer(handler).listen(PORT, HOST, () => {
  console.log(`Server is running on 🌎 http://${HOST}:${PORT}`)
})
