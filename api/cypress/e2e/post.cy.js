/// <reference types="cypress" />

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: 'Leonardo Teste',
        email: 'lenardo@teste.com.br',
        password: '123456'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})