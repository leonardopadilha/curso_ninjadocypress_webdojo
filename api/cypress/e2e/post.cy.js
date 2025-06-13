/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("User successfully registered.")
      expect(response.body.user.id).not.to.be.null
      expect(response.body.user.id).to.match(/^[-]?\d+$/) // Valida que o campo id é um inteiro
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  })
})