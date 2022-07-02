import { login, loginPage } from '../fixtures'; 

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verifies login page', () => {
    /*
      Check the following fields:
        * Create new email field
        * Create new account button
        * Existing user email field
        * Existing user password field
        * Sign In button
    */

    cy.get(loginPage.login_header.signIn, { timeout: 2000 }).should('exist').click();
    cy.get(loginPage.create_new.email_field).should('exist');
    cy.get(loginPage.create_new.submit_button).should('exist');
    cy.get(loginPage.existing_user.email_field).should('exist');
    cy.get(loginPage.existing_user.password_field).should('exist');
    cy.get(loginPage.existing_user.sign_in_button).should('exist');
  })

  it('Verifies login success', () => {
    /*
      Verifies the user can login successfully
    */

    cy.loginKnownUser(login.email, login.password);

    cy.get(loginPage.login_header.signOut, { timeout: 2000 }).should('exist');
    cy.get(loginPage.login_header.account_name, { timeout: 2000 }).should('exist').contains(login.fullname);
  })
})