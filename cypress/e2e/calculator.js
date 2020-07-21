// const {findByTestId, findByText} = require('@testing-library/react');

describe('anonymous calculator', () => {
  it('can make calculattions', () => {
    cy.visit('/');
    // .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
    cy.findByText(/^1$/)
      // .debug()
      .click();
    cy.findByText(/^\+$/)
      // .pause()
      .click();
    cy.findByText(/^2$/)
      // .then(subject => {
      //   debugger
      //   return subject
      // })
      .click();
    cy.findByText(/^=$/).click();
    cy.findByTestId('total').should('have.text', '3');
  });
});

describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      cy.visit('/');
      cy.findByText(/login/i).click();
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/submit/i).click();
      cy.findByTestId('username-display').should('have.text', user.username);
      cy.findByText(/logout/i).click();
      cy.findByTestId('username-display').should('not.exist');
    });
  });
});
