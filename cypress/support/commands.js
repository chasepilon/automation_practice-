import { loginPage } from '../fixtures'; 

Cypress.Commands.add('loginKnownUser', (username, password) => {
    cy.get(loginPage.login_header.signIn, { timeout: 1000 }).click();
    cy.get(loginPage.existing_user.email_field).type(username);
    cy.get(loginPage.existing_user.password_field).type(password);
    cy.get(loginPage.existing_user.sign_in_button, { timeout: 2000 }).click();
});