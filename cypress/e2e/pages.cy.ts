describe('Pages', () => {
  const pages: any[] = Cypress.env('pages')
  beforeEach(() => {
    cy.visit('/')
    // cy.visit(pages[Math.floor(Math.random() * pages.length)].slug)
  })

  it('should all exist', () => {
    pages.forEach((i) => {
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: false,
      })
    })
  })

  it('should have menu', () => {
    cy.get(`[aria-label="open Menu"]`).click()
    cy.get('nav').should('be.visible')
  })
})
export {}
