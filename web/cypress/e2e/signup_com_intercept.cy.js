/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import _ from "lodash";

describe("Cadastro", () => {
  beforeEach(() => {
    cy.goToSignup();

    cy.intercept("POST", "http://localhost:3333/api/users/register", {
      statusCode: 201,
      body: {
        message: "Usuário cadastrado com sucesso!",
      },
    }).as("postSignup");
  });

  _.times(5, () => {
    it.only("Deve cadastrar um novo usuário", () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = "katana123";

        cy.get("#name").type(name);
        cy.get("#email").type(email);
        cy.get("#password").type(password);
        cy.contains("button", "Criar conta").click();

        cy.wait("@postSignup");

        cy.contains("Conta criada com sucesso!").should("be.visible");
    });
  });
});
