/// <reference types="cypress" />

describe('Formulário de Consultoria', () => {
  beforeEach(() => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('Formulários', 'Consultoria')
  })

  it('Deve solicitar consultoria individual', () => {
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

      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/image_cypress.pdf', { force: true })

      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type('Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.')

      const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
      tecnologias.forEach(tecnologia => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tecnologia)
          .type('{enter}')

        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tecnologia)
          .should('be.visible')
      })

      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked')

      cy.contains('button', 'Enviar formulário')
        .click()

      cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })
  
  it('Deve verificar os campos obrigatórios', () => {
    cy.contains('button', 'Enviar formulário')
      .click()

    cy.contains('label', 'Nome Completo')
      .parent()
      .contains('p', 'Campo obrigatório')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('label', 'Email')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('p', 'Você precisa aceitar os termos de uso')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

  })
})