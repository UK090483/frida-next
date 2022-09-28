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
    async setupNodeEvents(on, config) {
      const fetchRes: any = await sanityClient.fetch(`
      {
        'pages':*[_type == 'page' || _id == 'frontPage' ]{
          ...,
         'slug': select(
            _type == 'indexPage' => '/',
            '/' + slug.current,
         ),
         },

         'artworks':*[ _type == 'artwork' ]{
          ...,
          'artistName':artist->anzeigeName,
         'slug':'/artwork/' + slug.current
         },

         'artists':*[ _type == 'artist' ]{
          ...,
          
         'slug':'/artist/' + slug.current
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
      return config
    },
    baseUrl: 'https://www.meetfrida.art/',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
