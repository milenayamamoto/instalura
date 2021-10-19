/* eslint-disable cypress/no-unnecessary-waiting */
// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';

describe('/pages/app/profile/', () => {
  describe('when filling and submitting a form login request', () => {
    it('go to the profile page', () => {
      cy.intercept(
        'https://instalura-api-git-master-omariosouto.vercel.app/api/login',
      ).as('userLogin');

      const loginScreen = new LoginScreenPageObject(cy);
      loginScreen
        .fillLoginForm({ user: 'xuxu', password: 'senhasegura' })
        .submitLoginForm();

      cy.wait(3000);

      cy.url().should('include', '/app/profile');

      cy.wait('@userLogin').then((intercept) => {
        const { token } = intercept.response.body.data;

        cy.getCookie('LOGIN_COOKIE_APP_TOKEN')
          .should('exist')
          .should('have.property', 'value', token);
      });
    });
  });

  describe('then open modal and add a new post', () => {
    it('add images url to go to next step', () => {
      cy.get('.add-new-post').click();

      cy.get('div input[name="image"]').type(
        'https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg',
      );
      cy.get('#next').click();
    });

    it('select a filter and submit post', () => {
      cy.get('img.filter-brannan').click();
      cy.get('div input[name="description"]').type('Finalizando o bootcamp!');
      cy.get('#post').click();
    });
  });
});
