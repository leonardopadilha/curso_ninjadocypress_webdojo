/// <reference types="cypress" />

describe('Cadastro', () => {
  beforeEach(() => {
    cy.goToSignup()

/*     cy.intercept('POST', 'http://localhost:3333/api/users/register', {
      statusCode: 201,
      body: {
        message: 'Usuário cadastrado com sucesso!'
      }
    }).as('postSignup') */
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