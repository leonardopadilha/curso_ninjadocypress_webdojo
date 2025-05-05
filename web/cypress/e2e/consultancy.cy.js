/// <reference types="cypress" />

describe('Formulário de Consultoria', () => {
  it('Deve solicitar consultoria individual', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('Formulários', 'Consultoria')

    cy.get('input[placeholder*=nome]').type('Leonardo Padilha')
    cy.get('input[placeholder="Digite seu email"]').type('leonardo@webdojo.com')
    
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type('99 99999-9999')
      .should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

    // cy.get('#consultancyType').select('inCompany')
    // xpath -> //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('Individual')

      // xpath -> //span[text()="Pessoa Física"]//..//input
      //input[name=personType]
      /*cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .check() // rádio button
      */
      cy.contains('label', 'Pessoa Física')
        .find('input')
        .click() // rádio button
        .should('be.checked')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')

      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type('12312312387')
        .should('have.value', '123.123.123-87')

      const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
      discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
          .find('input')
          .check()
          .should('be.checked')
      })
  })
})