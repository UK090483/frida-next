import sampleSize from 'lodash/sampleSize'

describe('Artists', () => {
  const artists: Artist[] = Cypress.env('artists')
  const randomArtists = sampleSize(artists, 10)

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
    it(`${name} should contain Meta Title`, () => {
      cy.get('head title').should('include.text', artist.anzeigeName)
    })

    it(`${name} should contain Meta Description`, () => {
      cy.get('head meta[name=description]')
        .should('have.attr', 'content')
        .should('include', artist.anzeigeName)
    })

    it(`${name} should contain Share Title`, () => {
      cy.get('head meta[property="og:title"]')
        .should('have.attr', 'content')
        .should('include', artist.anzeigeName)
    })

    it(`${name} should contain Share Description`, () => {
      cy.get('head meta[property="og:description"]')
        .should('have.attr', 'content')
        .should('include', artist.anzeigeName)
    })

    it(`${name} should contain Share image`, () => {
      cy.get('head meta[property="og:image"]').should('have.attr', 'content')
    })
  })

  artists.forEach((i) => {
    it(`${i.anzeigeName} should be online`, () => {
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
export {}
