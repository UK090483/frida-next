import { Artwork } from 'cypress/types'
import sampleSize from 'lodash/sampleSize'

const testData = {
  seo: {
    metaTitle: (artwork: Artwork) =>
      `MeetFrida | ${artwork.name} by ${artwork.artistName}`,
    metaDescription: (artwork: Artwork) =>
      `Artwork for sale "${artwork.name}" by ${artwork.artistName}`,
    shareTitle: (artwork: Artwork) =>
      `${artwork.name} by ${artwork.artistName}`,
    shareDescription: (artwork: Artwork) =>
      `Artwork "${artwork.name}" by ${artwork.artistName}`,
  },
}

describe('Artworks', () => {
  const artworks: Artwork[] = Cypress.env('artworks')
  const randomArtworks = sampleSize(artworks, 0)

  randomArtworks.forEach((artwork) => {
    const name = `Artwork "${artwork.name}"`

    it(`${name} should connect to shopify`, () => {
      cy.intercept(
        'POST',
        'https://meetfrida.myshopify.com/api/2022-07/graphql'
      ).as('getCheckout')

      cy.visit(artwork.slug)
      cy.wait('@getCheckout')
    })

    it(`${name} should have name`, () => {
      cy.get('h1').should('contain.text', artwork.name)
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

    it(`${name} should have Seo`, () => {
      cy.checkSeo({
        metaTitle: testData.seo.metaTitle(artwork),
        metaDescription: testData.seo.metaDescription(artwork),
        shareTitle: testData.seo.shareTitle(artwork),
        shareDescription: testData.seo.shareDescription(artwork),
      })
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

        cy.get('[data-testid="cart__checkoutLink"]')
          .should('have.attr', 'href')
          .then((url) => {
            // cy.request({
            //   url: url as unknown as string,
            //   failOnStatusCode: false,
            // })
            //   .its('body')
            //   .should('include', '<h1>Admin</h1>')
          })
      }
    })
  })

  artworks.forEach((i) => {
    it(`${i.name} should be online`, () => {
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
