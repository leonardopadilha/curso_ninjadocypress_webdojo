Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('input[placeholder*=nome]').type(form.name)
  cy.get('input[placeholder="Digite seu email"]').type(form.email)
  
  cy.get('input[placeholder="(00) 00000-0000"]')
    .type(form.phone)
    //.should('have.value', '(99) 99999-9999') // O número com a máscára é exibido no value do campo

  // cy.get('#consultancyType').select('inCompany')
  // xpath -> //label[text()="Tipo de Consultoria"]/..//select
  cy.contains('label', 'Tipo de Consultoria')
    .parent()
    .find('select')
    .select(form.consultancyType)

    // xpath -> //span[text()="Pessoa Física"]//..//input
    //input[name=personType]
    /*cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .check() // rádio button
    */

    if (form.personType === 'cpf') {
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
      .type(form.document)
      //.should('have.value', '123.123.123-87')
    }

    if (form.personType === 'cnpj') {
      cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .click()
      .should('be.checked')
      
      cy.contains('label', 'Pessoa Física')
      .find('input')
      .should('be.not.checked')

      cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type(form.document)
      //.should('have.value', '123.123.123-87')
    }

    //const discoveryChannels = ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
    form.discoveryChannels.forEach(channel => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked')
    })

    cy.get('input[type="file"]')
      .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .type(form.description)

    //const tecnologias = ['Cypress', 'Playwright', 'Selenium', 'WebdriverIO', 'Robot Framework']
    form.techs.forEach(tecnologia => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tecnologia)
        .type('{enter}')

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tecnologia)
        .should('be.visible')
    })

    if (form.terms) {
      cy.contains('label', 'termos de uso')
      .find('input')
      .check()
      .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário')
  .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
  cy.get('.modal', { timeout: 7000 })
  .should('be.visible')
  .find('.modal-content')
  .should('be.visible')
  .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})