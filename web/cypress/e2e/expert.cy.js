/// <reference types="cypress" />

describe('Expert', () => {
  beforeEach(() => {
    cy.start()
  })

  it('Deve manipular os atributos de elementos do HTML com invoke', () => {
    // O invoke pode alterar a propriedade de um elemento, o val abaixo é o value
    cy.get('#email').invoke('val', 'leonardo@teste.com')

    cy.get('#password').invoke('removeAttr', 'class')

    cy.get('#password').invoke('attr', 'type', 'text')
      .type('pwd123')

    cy.contains('button', 'Entrar')
      .invoke('hide')
      .should('not.be.visible')

    cy.contains('button', 'Entrar')
      .invoke('show')
      .should('be.visible')


  })
})