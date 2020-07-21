describe('anonymous calculator', () => {
  it('can make calculattions', () => {
    cy.visit('/')
    // .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
    cy.findByText(/^1$/).click()
    cy.findByText(/^\+$/).click()
    cy.findByText(/^2$/).click()
    cy.findByText(/^=$/).click()
    cy.findByTestId('total').should('have.text', '3')
  })
})
