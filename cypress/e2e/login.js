describe('login', () => {
  it('should login an existing user', () => {
    /**
     * We can make our custom command createUser yield a subject
     * so we can get access to that subject by using .then.
     * We'll get that user and then we'll put all of the stuff
     * inside of that arrow function there, so you have access to the user
     * that's been created for us.
     * ----------------------------------------------------------------
     * Then we can access that user as a subject result of that command
     * and execute our test inside of there.
     */
    cy.createUser().then(user => {
      cy.visit('/');
      cy.findByText(/login/i).click();
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/submit/i).click();
      // now let's verify things are set after login
      cy.assertHome();
      cy.assertLoggedInAs(user);
    });
  });
});
