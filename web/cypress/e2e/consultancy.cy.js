/// <reference types="cypress" />

//import consultancyData from '../fixtures/consultancy.json'
import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
    //cy.fixture('consultancy').as('consultancyData')
  })

  it('Deve solicitar consultoria individual', () => {
    cy.get('input[placeholder*=nome]').type(personal.name)
    cy.get('input[placeholder="Digite seu email"]').type(personal.email)
    
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(personal.phone)
      //.should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

    // cy.get('#consultancyType').select('inCompany')
    // xpath -> //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(personal.consultancyType)

      // xpath -> //span[text()="Pessoa Física"]//..//input
      //input[name=personType]
      /*cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .check() // rádio button
      */

      if (personal.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
        .find('input')
        .click() // rádio button
        .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
      }

      if (personal.personType === 'cnpj') {
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
        .type(personal.document)
        //.should('have.value', '123.123.123-87')

      //const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
      personal.discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(personal.file, { force: true })

      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(personal.description)

      //const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
      personal.techs.forEach(tecnologia => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tecnologia)
          .type('{enter}')

        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tecnologia)
          .should('be.visible')
      })

      if (personal.terms) {
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
    cy.get('input[placeholder*=nome]').type(company.name)
    cy.get('input[placeholder="Digite seu email"]').type(company.email)
    
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(company.phone)
      //.should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

    // cy.get('#consultancyType').select('inCompany')
    // xpath -> //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(company.consultancyType)

      // xpath -> //span[text()="Pessoa Física"]//..//input
      //input[name=personType]
      /*cy.contains('span', 'Pessoa Física')
        .parent()
        .find('input')
        .check() // rádio button
      */

      if (company.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
        .find('input')
        .click() // rádio button
        .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
      }

      if (company.personType === 'cnpj') {
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
        .type(company.document)
        //.should('have.value', '123.123.123-87')

      //const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
      company.discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
          .find('input')
          .check()
          .should('be.checked')
      })

      cy.get('input[type="file"]')
        .selectFile(company.file, { force: true })

      cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(company.description)

      //const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
      company.techs.forEach(tecnologia => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
          .type(tecnologia)
          .type('{enter}')

        cy.contains('label', 'Tecnologias')
          .parent()
          .contains('span', tecnologia)
          .should('be.visible')
      })

      if (company.terms) {
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