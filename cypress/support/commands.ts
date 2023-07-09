/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add(
  'checkSeo',
  ({ metaTitle, metaDescription, shareTitle, shareDescription }) => {
    cy.get('head title').should('have.text', metaTitle)
    cy.get('head meta[name=description]')
      .should('have.attr', 'content')
      .should('eq', metaDescription)
    cy.get('head meta[property="og:title"]')
      .should('have.attr', 'content')
      .should('eq', shareTitle)
    cy.get('head meta[property="og:description"]')
      .should('have.attr', 'content')
      .should('eq', shareDescription)
    cy.get('head meta[property="og:image"]').should('have.attr', 'content')
  }
)

declare global {
  namespace Cypress {
    interface Chainable {
      checkSeo(props: {
        metaTitle: string
        metaDescription: string
        shareTitle: string
        shareDescription: string
      }): void
    }
  }
}

export {}
