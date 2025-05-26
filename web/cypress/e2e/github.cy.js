/// <reference types="cypress" />

describe('Gerenciamento de Perfis no GitHub', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Tabela', 'Perfis do GitHub')
  })
  it('Deve cadastrar um novo perfil do github', () => {

    cy.get('#name').type('Leonardo Padilha')
    cy.get('#username').type('padilhaleonardo')
    cy.get('#profile').type('QA')

    cy.contains('button', 'Adicionar Perfil').click()

    cy.get('#name').type('Leonardo Padilha')
    cy.get('#username').type('leonardopadilha')
    cy.get('#profile').type('QA')

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', 'leonardopadilha')
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile')
      .contains('td', 'Leonardo Padilha')
      .should('be.visible')

    cy.get('@trProfile')
      .contains('td', 'QA')
      .should('be.visible')
  })
})