// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-real-events";
import "./actions/consultancy.actions";

Cypress.Commands.add('start', () => {
  cy.viewport(1440, 900)
  cy.visit('http://localhost:3000/')
})

Cypress.Commands.add('submitLoginForm', (email, password) => {
  cy.contains('h2', 'Acesse sua conta').should('be.visible')

  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName) // buscou o botão mas o nome ele vai procurar no filho da tag
    .should('be.visible')
    .click()

  cy.contains('h1', pageTitle)
    .should('be.visible')
})

// Helper
Cypress.Commands.add('login', () => {
  cy.start()
  cy.submitLoginForm('papito@webdojo.com', 'katana123')
})