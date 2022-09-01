const getRandomArtworks = (artworks: any[], count: number) => {
  let res: number[] = []
  while (res.length < count) {
    const ranNumber = Math.floor(Math.random() * artworks.length)

    if (!res.includes(ranNumber)) {
      res = [...res, ranNumber]
    }
  }
  return res.map((i) => artworks[i])
}

describe('example to-do app', () => {
  const artworks: any[] = Cypress.env('artworks')

  const randomArtworks = getRandomArtworks(artworks, 10)

  it('should have Properties (10 random Artworks)', () => {
    randomArtworks.forEach((a) => {
      cy.visit(a.slug)
      cy.contains(a.name)
      if (!a.isNft) {
        cy.contains(a.price)
      }
      //cy.contains(a.description)
    })
  })

  it('all artworks should be online', () => {
    artworks.forEach((i) => {
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
