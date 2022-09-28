import { Artist } from 'cypress/types'
import sampleSize from 'lodash/sampleSize'

const testData = {
  seo: {
    metaTitle: (name: string) => `MeetFrida | ${name}`,
    metaDescription: (name: string) =>
      `Jetzt Artworks von ${name} auf MeetFrida entdecken`,
  },
}

describe('Artists', () => {
  const artists: Artist[] = Cypress.env('artists')
  const randomArtists = sampleSize(artists, 1)

  before(() => {
    randomArtists.forEach((artist) => {
      cy.request({
        url: Cypress.config('baseUrl') + '/en' + artist.slug,
        failOnStatusCode: true,
      })
      cy.request({
        url: Cypress.config('baseUrl') + artist.slug,
        failOnStatusCode: true,
      })
    })
  })

  randomArtists.forEach((artist) => {
    const name = `Artist "${artist.anzeigeName}"`

    it(`${name} should have Page`, () => {
      cy.visit(artist.slug)
    })

    it(`${name} should have Title`, () => {
      cy.get('h1').should('contain.text', artist.anzeigeName)
      cy.visit('en/' + artist.slug)
      cy.get('h1').should('contain.text', artist.anzeigeName)
    })

    it(`${name} should contain description`, () => {
      cy.visit(artist.slug)
      artist.description && cy.get('[data-testid="artist__description"]')
      cy.visit('en/' + artist.slug)
      artist.description && cy.get('[data-testid="artist__description"]')
    })

    // SEO

    it(`${name} should have Seo`, () => {
      cy.checkSeo({
        metaTitle: testData.seo.metaTitle(artist.anzeigeName),
        metaDescription: testData.seo.metaDescription(artist.anzeigeName),
        shareTitle: testData.seo.metaDescription(artist.anzeigeName),
        shareDescription: testData.seo.metaDescription(artist.anzeigeName),
      })
    })
  })

  // artists.forEach((i) => {
  //   it(`${i.anzeigeName} should be online`, () => {
  //     cy.request({
  //       url: Cypress.config('baseUrl') + '/en' + i.slug,
  //       failOnStatusCode: true,
  //     })
  //     cy.request({
  //       url: Cypress.config('baseUrl') + i.slug,
  //       failOnStatusCode: true,
  //     })
  //   })
  // })
})
export {}
