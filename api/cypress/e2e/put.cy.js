/// <reference types="cypress" />

describe("put /api/users/:id", () => {
  context("Atualização", () => {
    let userId;

    const originalUser = {
      name: "Peter Parker",
      email: "parker@stark.com",
      password: "123456",
    };

    const updatedUser = {
      name: "Spiderman",
      email: "Spiderman@marvel.com",
      password: "pwd123",
    };

    before(() => {
      cy.task("deleteUser", originalUser.email);
      cy.task("deleteUser", updatedUser.email);

      cy.postUser(originalUser).then((response) => {
        userId = response.body.user.id;
      });
    });

    it("Deve atualizar um usuário existente", () => {
      cy.putUser(userId, updatedUser).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    after(() => {
      cy.getUsers().then((response) => {
        const spider = response.body.find((user) => user.id === userId);
        expect(spider).to.exist;
        expect(spider.name).to.equal(updatedUser.name);
        expect(spider.email).to.equal(updatedUser.email);
      });
    });
  });

  context("Campos obrigatórios", () => {
    it("O campo name deve ser obrigatório", () => {
      const user = {
        email: "storm@xmen.com",
        password: "pwd123",
      };

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("The name is required");
      });
    });

    it("O campo email deve ser obrigatório", () => {
      const user = {
        name: "Jean Grey",
        password: "pwd123",
      };

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("The email is required");
      });
    });

    it("O campo password deve ser obrigatório", () => {
      const user = {
        name: "charles Xavier",
        email: "xavier@xmen.com",
      };

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("The password is required");
      });
    });

    it('Não deve passar quando o JSON está mal formatado', () => {
      const user = `{
          name: 'Magneto',
          email: 'erick@xmen.com'
          password: 'pwd123'
        }`
    
        cy.putUser(1, user).then((response) => {
          expect(response.status).to.eq(500)
        })
      })
  });

  context('Quando o id não existe', () => {
    let userId;

    const originalUser = {
      name: "Tony Stark",
      email: "tony@stark.com",
      password: "123456",
    };

    const updatedUser = {
      name: "Ironman",
      email: "ironman@marvel.com",
      password: "pwd123",
    };

    before(() => {
      cy.task("deleteUser", originalUser.email);
      cy.task("deleteUser", updatedUser.email);

      cy.postUser(originalUser).then((response) => {
        cy.log(response.body.user.id);
        userId = response.body.user.id;
      });

      cy.task("deleteUser", originalUser.email);
    });

    it("Deve retornar 404 e user not found", () => {
      cy.api({
        method: "PUT",
        url: `http://localhost:3333/api/users/${userId}`,
        Headers: {
          "Content-Type": "application/json",
        },
        body: updatedUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.error).to.eq("User not found")
      });
    });
  })
});
