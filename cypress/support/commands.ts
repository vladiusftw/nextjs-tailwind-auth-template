/// <reference types="cypress" />
Cypress.Commands.add("login",(email:string,password:string) => {
    cy.visit('/')
    cy.get('[data-cypress="login-email"]').type(email)
    cy.get('[data-cypress="login-password"]').type(password)
    cy.get('[data-cypress="login-button"]').click()
})

Cypress.Commands.add("loginServer",(email:string,password:string) => {
   cy.request({
    method:"POST",
    url:`${Cypress.env("backend_url")}/auth/login`,
    body:{
        email,
        password
    }
   }).then((response) => {
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.have.property("accessToken").and.length.greaterThan(0);
    cy.setCookie("cypress-token",response.body.data.accessToken)
   })
})