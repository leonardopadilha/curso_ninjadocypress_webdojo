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

  it('Deve acessar o meu perfil no github', () => {
    const profile = {
      name: 'Leonardo Padilha',
      username: 'leonardopadilha123',
      desc: 'QA'
    }

    cy.get('#name').type(profile.name)
    cy.get('#username').type(profile.username)
    cy.get('#profile').type(profile.desc)

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', profile.username)
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile')
      .find('button[title="Remover perfil"]')
      .click()

    cy.contains('table tbody', profile.username)
      .should('not.exist')
  })

  it('Deve validar o link do github', () => {
    const profile = {
      name: 'Leonardo Padilha',
      username: 'leonardopadilha',
      desc: 'QA'
    }

    cy.get('#name').type(profile.name)
    cy.get('#username').type(profile.username)
    cy.get('#profile').type(profile.desc)

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', profile.username)
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile')
      .find('a')
      .should('have.attr', 'href', `https://github.com/${profile.username}`)
      .and('have.attr', 'target', '_blank')
  })
})