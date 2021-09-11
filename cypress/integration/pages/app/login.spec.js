/// <reference types="cypress" />

describe('/pages/app/login', () => {
  it('preencha os campos e vá para a página de /app/profile', () => {
    cy.visit('/app/login');

    cy.get('#formCadastro input[name="usuario"]').type('testeusuario');

    cy.get('#formCadastro input[name="senha"]').type('senha123');

    cy.get('#formCadastro button[type="submit"]').click();

    cy.url().should('include', '/app/profile');
  });
});
