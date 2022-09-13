import sampleSize from 'lodash/sampleSize'

describe('Artworks', () => {
  const artworks: any[] = Cypress.env('artworks')
  const randomArtworks = sampleSize(artworks, 10)

  randomArtworks.forEach((artwork) => {
    const name = `Artwork "${artwork.name}"`

    it(`${name} should have name`, () => {
      cy.intercept(
        'POST',
        'https://meetfrida.myshopify.com/api/2020-07/graphql'
      ).as('getCheckout')

      cy.visit(artwork.slug)

      cy.wait('@getCheckout')
      cy.contains(artwork.name)
    })

    it(`${name} should have Price`, () => {
      if (!artwork.isNft) {
        cy.contains(artwork.price)
      }
    })

    it(`${name} should have BuyButton`, () => {
      cy.get('[data-testid="buyButton"]')
    })
    it(`${name} should contain Artwork description`, () => {
      artwork.description && cy.get('[data-testid="artwork__description"]')
    })
    it(`${name} should contain Artist description`, () => {
      cy.get('[data-testid="artwork__artistDescription"]')
    })
    // SEO
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

    //Shop

    it(`${name} should be able to put in Cart`, () => {
      if (artwork.isNft) {
        cy.get('[data-testid="buyButton__nft"]')
          .should('have.attr', 'href')
          .then((url) => {
            cy.request({
              url: url as unknown as string,
              failOnStatusCode: false,
            })
          })
      }

      if (!artwork.isNft) {
        cy.get('[data-testid="buyButton_putInCart"]')
          .should('have.text', 'In den Warenkorb')
          .click()
        cy.get('[data-testid="cart"]')
        cy.get('[data-testid="cart__item"]  ')
        cy.get(
          '[data-testid="cart__item"] [data-testid="productPrice"]'
        ).should('have.text', artwork.price + '€')
      }
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
export {}
