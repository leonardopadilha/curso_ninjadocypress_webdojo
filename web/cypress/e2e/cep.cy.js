/// <reference types="cypress" />

import address from '../fixtures/cep.json'

describe('Formulário de Consultoria', () => {
  beforeEach(() => {
    cy.login(true)
    cy.goTo('Integração', 'Consulta de CEP')
  })

  it('Deve validar a consulta de CEP', () => {
    cy.get('#cep').type(address.cep)
    cy.contains('button', 'Buscar').click()
    cy.get('#street').should('have.value', address.street)
    cy.get('#neighborhood').should('have.value', address.neighborhood)
    cy.get('#city').should('have.value', address.city)
    cy.get('#state').should('have.value', address.state)
  })

  it('Deve validar a consulta de CEP com intercept', () => {

    cy.intercept('GET', 'https://viacep.com.br/ws/00000000/json/', {
      statusCode: 200,
      body: {
        logradouro: "Rua Teste",
        bairro: "Teste Teste",
        localidade: "Teste",
        uf: "TST",
      }
    }).as('getCep')

    cy.get('#cep').type('00000000')
    cy.contains('button', 'Buscar').click()

    cy.wait('@getCep')

    cy.get('#street').should('have.value', 'Rua Teste')
    cy.get('#neighborhood').should('have.value', 'Teste Teste')
    cy.get('#city').should('have.value', 'Teste')
    cy.get('#state').should('have.value', 'TST')
  })

  it('Deve validar a consulta de CEP com intercept e massa de dados', () => {

    cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
      statusCode: 200,
      body: {
        logradouro: address.street,
        bairro: address.neighborhood,
        localidade: address.city,
        uf: address.state,
      }
    }).as('getCep')

    cy.get('#cep').type(address.cep)
    cy.contains('button', 'Buscar').click()

    cy.wait('@getCep')

    cy.get('#street').should('have.value', address.street)
    cy.get('#neighborhood').should('have.value', address.neighborhood)
    cy.get('#city').should('have.value', address.city)
    cy.get('#state').should('have.value', address.state)
  })
})