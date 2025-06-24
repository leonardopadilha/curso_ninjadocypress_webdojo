/// <reference types="cypress" />

describe('Cadastro', () => {
  beforeEach(() => {
    cy.goToSignup()
  })

  it('Deve cadastrar um novo usuário', () => {
    cy.get('#name').type('Leonardo Padilha')
    cy.get('#email').type('leonardo@teste.com')
    cy.get('#password').type('katana123')
    cy.contains('button', 'Criar conta').click()

    //cy.wait('@postSignup')

    cy.contains('Conta criada com sucesso!').should('be.visible')
  })
})