/// <reference types="cypress" />

describe('Tocar o vídeo', () => {
  it('Deve poder tocar o vídeo dentro de um iframe como exemplo', () => {
    cy.login()
    cy.contains('Video').click()

    // think time
    cy.wait(3000)

    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body') //Função do cypress utilizada para obter propriedades dos elementos e outros
      .then(cy.wrap)
      .as('iFramePlayer')

    cy.get('@iFramePlayer')
      .find('.play-button')
      .click()

    cy.get('@iFramePlayer')
      .find('.pause-button')
      .should('be.visible')
  })
})