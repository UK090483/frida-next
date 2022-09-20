import { Page } from 'cypress/types'

describe('PagesBuilder', () => {
  const pages: Page[] = Cypress.env('pages')

  pages
    .filter((page) => page.content.find((i) => i._type === 'artworks'))
    .forEach((page) => {
      it(`Artworks Block`, () => {
        cy.visit(page.slug)
      })
    })

  pages
    .filter((page) => page.content.find((i) => i._type === 'artists'))
    .forEach((page) => {
      it(`Artists Block`, () => {
        cy.visit(page.slug)
      })
    })

  pages
    .filter((page) => page.content.find((i) => i._type === 'carouselHero'))
    .forEach((page) => {
      it(`carouselHero`, () => {
        cy.visit(page.slug)
      })
    })

  pages
    .filter((page) => page.content.find((i) => i._type === 'categories'))
    .forEach((page) => {
      it(`categories`, () => {
        cy.visit(page.slug)
      })
    })

  pages
    .filter((page) => page.content.find((i) => i._type === 'section'))
    .forEach((page) => {
      it(`section`, () => {
        cy.visit(page.slug)
      })
    })
})
export {}
