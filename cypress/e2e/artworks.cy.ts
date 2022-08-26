describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('follow links', () => {
    cy.log('pages', Cypress.env('pages'))

    const pages: any[] = Cypress.env('pages')

    pages.forEach((i) => {
      cy.request({
        url: Cypress.config('baseUrl') + i.slug,
        failOnStatusCode: false,
      })
    })

    // cy.get('a').each((page) => {
    //   const link = page.prop('href')
    //   const isInternal = link.includes(Cypress.config('baseUrl'))

    //   cy.request({
    //     url: link,
    //     failOnStatusCode: false, // allow good and bad response to pass into then
    //   }).then((response) => {
    //     if (isInternal) {

    //     }
    //     // Cypress.log({
    //     //   name: link,
    //     //   message: response.status,
    //     // })
    //   })
    // })
  })
})
export {}
