import { Artist, Artwork } from 'cypress/types'

describe('allPages', () => {
  const artists: Artist[] = Cypress.env('artists')
  const artworks: Artwork[] = Cypress.env('artworks')
  const pages: any[] = Cypress.env('pages')

  artworks.forEach((i) => {
    it(`Artwork ${i.name} should be online`, () => {
      cy.request({
        url: Cypress.config('baseUrl') + '/en' + i.slug,
        failOnStatusCode: true,
      })
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: true,
      })
    })
  })

  artists.forEach((i) => {
    it(`Artists ${i.anzeigeName} should be online`, () => {
      cy.request({
        url: Cypress.config('baseUrl') + '/en' + i.slug,
        failOnStatusCode: true,
      })
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: true,
      })
    })
  })

  pages.forEach((i) => {
    it(`Page ${i.slug} should be online`, () => {
      cy.request({
        url: Cypress.config('baseUrl') + '/en' + i.slug,
        failOnStatusCode: true,
      })
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: true,
      })
    })
  })
})
