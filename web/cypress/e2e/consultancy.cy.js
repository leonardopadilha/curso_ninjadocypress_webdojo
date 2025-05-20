/// <reference types="cypress" />

describe('Formulário de Consultoria', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
  })

  it('Deve solicitar consultoria individual', () => {

    const consultancyForm = {
      name: 'Leonardo Padilha',
      email: 'leonardo@webdojo.com',
      phone: '99 99999-9999',
      consultancyType: 'Individual',
      personType: 'cpf',
      document: '12312312387',
      discoveryChannels: ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"],
      file: './cypress/fixtures/image_cypress.pdf',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      techs: ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework'],
      terms: true
    }

    cy.get('input[placeholder*=nome]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
      //.should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

    // cy.get('#consultancyType').select('inCompany')
    // xpath -> //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType)

      // xpath -> //span[text()="Pessoa Física"]//..//input
      //input[name=personType]
      /*cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .check() // rádio button
      */

      if (consultancyForm.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
        .find('input')
        .click() // rádio button
        .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
      }

      if (consultancyForm.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked')
        
        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .click() // rádio button
        .should('be.checked')
      }

      cy.contains('label', 'CPF')
        .parent()
        .find('input')
        .type(consultancyForm.document)
        //.should('have.value', '123.123.123-87')

      //const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
      consultancyForm.discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })

      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(consultancyForm.description)

      //const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
      consultancyForm.techs.forEach(tecnologia => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tecnologia)
          .type('{enter}')

        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tecnologia)
          .should('be.visible')
      })

      if (consultancyForm.terms) {
        cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked')
      }

      cy.contains('button', 'Enviar formulário')
        .click()

      cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })

  it('Deve solicitar consultoria In Company', () => {

    const consultancyForm = {
      name: 'Leonardo Padilha',
      email: 'leonardo@webdojo.com',
      phone: '99 99999-9999',
      consultancyType: 'In Company',
      personType: 'cnpj',
      document: '91179737000179',
      discoveryChannels: ["LinkedIn"],
      file: './cypress/fixtures/image_cypress.pdf',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      techs: ['Cypress', 'Playwright'],
      terms: true
    }

    cy.get('input[placeholder*=nome]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
      //.should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

    // cy.get('#consultancyType').select('inCompany')
    // xpath -> //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType)

      // xpath -> //span[text()="Pessoa Física"]//..//input
      //input[name=personType]
      /*cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .check() // rádio button
      */

      if (consultancyForm.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
        .find('input')
        .click() // rádio button
        .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
      }

      if (consultancyForm.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .click() // rádio button
        .should('be.checked')

        cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked')
      }

      cy.contains('label', 'CNPJ')
        .parent()
        .find('input')
        .type(consultancyForm.document)
        //.should('have.value', '123.123.123-87')

      //const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
      consultancyForm.discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })

      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(consultancyForm.description)

      //const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
      consultancyForm.techs.forEach(tecnologia => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tecnologia)
          .type('{enter}')

        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tecnologia)
          .should('be.visible')
      })

      if (consultancyForm.terms) {
        cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked')
      }

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