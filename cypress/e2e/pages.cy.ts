const sizes: (Cypress.ViewportPreset | [number, number])[] = [
  'iphone-5',
  'iphone-6',
  'ipad-2',
  [1024, 768],
]

describe('Pages', () => {
  const pages: any[] = Cypress.env('pages')
  beforeEach(() => {
    cy.visit('/artists')
  })

  it('should all exist', () => {
    pages.forEach((i) => {
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: true,
      })
    })
  })

  sizes.forEach((size) => {
    it(`should have menu  on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.visit('/')
      cy.get('nav').should('not.be.visible')
      cy.get(`[aria-label="open Menu"]`).click()
      cy.get('nav').should('be.visible')
    })
  })
})
export {}
