import { defineConfig } from 'cypress'
import { createClient } from 'next-sanity'

const sanityClient = createClient({
  projectId: 'zll53fvk',
  dataset: 'development',
})

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      const pages = await sanityClient.fetch(
        `*[_type == 'page' ]{
          ...,
         'slug':'/' + slug.current
         }`
      )
      const artworks = await sanityClient.fetch(
        `*[ _type == 'artwork' ]{
          ...,
         'slug':'/artwork/' + slug.current
         }`
      )

      config.env.pages = pages
      config.env.artworks = artworks
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
