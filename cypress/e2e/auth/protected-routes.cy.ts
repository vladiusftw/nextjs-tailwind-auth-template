describe('Check protected-routes', () => {
    it('If user not authenticated redirect to login', () => {
        cy.visit('/home')
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    })

    it('If user authenticated redirect to users', () => {
        cy.visit('/')
        cy.login(Cypress.env('admin_email'), Cypress.env('admin_password'))
        cy.url().should('eq', `${Cypress.config().baseUrl}/home`)
    })
})
