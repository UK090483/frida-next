/// <reference types="cypress" />
import * as React from 'react'
import { mount } from '@cypress/react'
import Button from '../../components/buttons/button'

describe('<Button />', () => {
  beforeEach(() => {
    // given
    mount(
      <Button
        label="Test button"
        type="click"
        onClick={() => {
          return
        }}
      />
    )
  })

  it('renders Button', () => {
    // when, then
    cy.get('button')
      .contains('Test button')
      .click()
      .should('have.text', `Test button`)
  })

  // it('renders post username', () => {
  //   // when, then
  //   cy.findAllByTestId(locators.userName).should('have.length', users.length)
  //   cy.findAllByTestId(locators.userName)
  //     .first()
  //     .should('have.text', `By: ${users[0].name}`)
  //   cy.findAllByTestId(locators.userName)
  //     .eq(1)
  //     .should('have.text', `By: ${users[1].name}`)
  // })

  // it('renders post body', () => {
  //   // when, then
  //   cy.findAllByTestId(locators.body).should('have.length', posts.length)
  //   cy.findAllByTestId(locators.body).first().should('have.text', posts[0].body)
  //   cy.findAllByTestId(locators.body).eq(1).should('have.text', posts[1].body)
  // })
})
