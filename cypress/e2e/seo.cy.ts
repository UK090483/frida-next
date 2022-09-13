import sampleSize from 'lodash/sampleSize'

describe('Seo ', () => {
  const artworks: any[] = Cypress.env('artworks')
  const randomArtworks = sampleSize(artworks, 10)

  randomArtworks.forEach((artwork) => {
    const name = `Artwork "${artwork.name}"`

    it(`${name} should contain Meta Title`, () => {
      cy.get('head title').should('include.text', artwork.name)
    })
    it(`${name} should contain Meta Description`, () => {
      cy.get('head meta[name=description]')
        .should('have.attr', 'content')
        .should('include', artwork.name)
    })

    it(`${name} should contain Share Title`, () => {
      cy.get('head meta[property="og:title"]')
        .should('have.attr', 'content')
        .should('include', artwork.name)
    })

    it(`${name} should contain Share Description`, () => {
      cy.get('head meta[property="og:description"]')
        .should('have.attr', 'content')
        .should('include', artwork.name)
    })

    it(`${name} should contain Share image`, () => {
      cy.get('head meta[property="og:image"]').should('have.attr', 'content')
    })
  })

  // it('all artworks should be online', () => {
  //   artworks.forEach((i) => {
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
