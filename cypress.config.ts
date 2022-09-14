import { defineConfig } from 'cypress'
import { createClient } from 'next-sanity'

const sanityClient = createClient({
  projectId: 'ypuaahj7',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-03-25',
})

export default defineConfig({
  e2e: {
    viewportHeight: 800,
    viewportWidth: 1280,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      // const pages = await sanityClient.fetch(
      //   `*[_type == 'page' ]{
      //     ...,
      //    'slug':'/' + slug.current
      //    }`
      // )
      // const artworks = await sanityClient.fetch(
      //   `*[ _type == 'artwork' ]{
      //     ...,
      //    'slug':'/artwork/' + slug.current
      //    }`
      // )
      // const artists = await sanityClient.fetch(
      //   `*[ _type == 'artist' ]{
      //     ...,
      //    'slug':'/artist/' + slug.current
      //    }`
      // )

      // const posts = await sanityClient.fetch(
      //   `*[ _type == 'post' ]{
      //     ...,
      //    'slug':'/post/' + slug.current
      //    }`
      // )

      const fetchRes: any = await sanityClient.fetch(`
      {
        'pages':*[_type == 'page' ]{
          ...,
         'slug':'/' + slug.current
         },

         'artworks':*[ _type == 'artwork' ]{
          ...,
         'slug':'/artwork/' + slug.current
         },

         'artists':*[ _type == 'artwork' ]{
          ...,
         'slug':'/artwork/' + slug.current
         },

         'posts':*[ _type == 'post' ]{
          ...,
         'slug':'/post/' + slug.current
         }
      }
      
      `)

      config.env.pages = fetchRes.pages
      config.env.artworks = fetchRes.artworks
      config.env.artists = fetchRes.artists
      config.env.posts = fetchRes.posts
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // return require('./cypress/plugins/index.js')(on, config)
      return config
    },
    baseUrl: 'http://localhost:3000',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
