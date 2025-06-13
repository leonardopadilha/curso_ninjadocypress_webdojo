/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("User successfully registered.")
      expect(response.body.user.id).not.to.be.null
      expect(response.body.user.id).to.match(/^[-]?\d+$/) // Valida que o campo id é um inteiro
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq("Email is already registered.")
    })
  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'leonardo@teste.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The name is required")
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Leonardo Teste',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The email is required")
    })
  })

  it('O campo password deve ser obrigatório', () => {
    const user = {
      name: 'Leonardo Teste',
      email: 'leonardo@teste.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The password is required")
    })
  })

  it('Não deve passar quando o JSON está mal formatado', () => {
  const user = `{
      name: 'Leonardo Teste',
      email: 'leonardo@teste.com'
      password: 'pwd123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("Invalid JSON format.")
    })
  })
})

Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})