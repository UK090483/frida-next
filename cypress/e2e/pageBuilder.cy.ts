import { Page } from 'cypress/types'

describe('PagesBuilder', () => {
  const pages: Page[] = Cypress.env('pages')

  pages
    .filter((page) => page.content.find((i) => i._type === 'artworks'))
    .forEach((page) => {
      it(`Artworks Block page ${page.slug}`, () => {
        cy.visit(page.slug)
        cy.get('[data-testid="artwork__card"]').should('have.length', 20)
      })
    })

  pages
    .filter((page) => page.content.find((i) => i._type === 'artists'))
    .forEach((page) => {
      it(`Artists Block ${page.slug}`, () => {
        cy.visit(page.slug)
        cy.get('[data-testid="artist__card"]').should(
          'have.length.at.least',
          20
        )
      })
    })

  // pages
  //   .filter((page) => page.content.find((i) => i._type === 'carouselHero'))
  //   .forEach((page) => {
  //     it(`carouselHero`, () => {
  //       cy.visit(page.slug)
  //     })
  //   })

  // pages
  //   .filter((page) => page.content.find((i) => i._type === 'categories'))
  //   .forEach((page) => {
  //     it(`categories`, () => {
  //       cy.visit(page.slug)
  //     })
  //   })

  // pages
  //   .filter((page) => page.content.find((i) => i._type === 'section'))
  //   .forEach((page) => {
  //     it(`section`, () => {
  //       cy.visit(page.slug)
  //     })
  //   })
})
export {}
