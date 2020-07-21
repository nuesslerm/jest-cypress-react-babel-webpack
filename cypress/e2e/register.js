import {buildUser} from '../support/generate';

describe('registration', () => {
  it('should register a new user', () => {
    const user = buildUser();

    cy.visit('/');
    cy.findByText(/register/i).click();
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/submit/i).click();

    // cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.assertHome();
    /** @
     * I'm satisfied to know that the localStorage value is a string,
     * especially since your test will typically continue doing things
     * that only authenticated users would be able to do.
     * This assertion is enough for me because if the localStorage token is not a string,
     * then I'll get an early error. If it doesn't work at all,
     * then I'll know that I have a problem with my authentication.
     */
    // ----------------------------------------------------------------
    // cy.window()
    //   .its('localStorage.token')
    //   .should('be.a', 'string');
    // cy.findByTestId('username-display').should('have.text', user.username);
    cy.assertLoggedInAs(user);
  });

  // it.only(`should show an error message if there's an error registering`, () => {
  it(`should show an error message if there's an error registering`, () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
    });
    cy.visit('/register');
    cy.findByText(/submit/i).click();
    cy.findByText(/error.*try again/);
  });
});
