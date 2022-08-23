import { defineConfig } from 'cypress'
import { createClient } from 'next-sanity'

const sanityClient = createClient({
  projectId: 'ypuaahj7',
  dataset: 'production',
})

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      const pages = await sanityClient.fetch(
        `*[_type == 'page' || _type == 'artwork' ]{
          ...,
         'slug':select(
             _type=='artwork' => '/artwork/' + slug.current,
             '/' + slug.current   
           ),  
         }`
      )

      console.log(pages)

      config.env.pages = pages
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // return require('./cypress/plugins/index.js')(on, config)

      return config
    },
    baseUrl: 'http://localhost:3000',
  },
})
