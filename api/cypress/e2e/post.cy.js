/// <reference types="cypress" />

// import { faker } from '@faker-js/faker';

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

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
      name: 'Cyclops',
      email: 'scott@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

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
      email: 'storm@xmen.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The name is required")
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Grey',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The email is required")
    })
  })

  it('O campo password deve ser obrigatório', () => {
    const user = {
      name: 'charles Xavier',
      email: 'xavier@xmen.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("The password is required")
    })
  })

  it('Não deve passar quando o JSON está mal formatado', () => {
  const user = `{
      name: 'Magneto',
      email: 'erick@xmen.com'
      password: 'pwd123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("Invalid JSON format.")
    })
  })
})