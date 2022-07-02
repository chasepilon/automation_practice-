import { 
    login, 
    loginPage, 
    accountPage, 
    productPage, 
    checkoutPages 
} from '../fixtures'; 


describe('Item Purchases', () => {
  before(() => {
    cy.visit('/');

    cy.loginKnownUser(login.email, login.password);
    cy.get(accountPage.account_options.logo, { timeout: 2000 }).click();
  });

  it('Verifies product page, purchase, and order history', () => {
    /*
      Check the following fields:
        * Pricing module
        * Description column
    */
    cy.visit(productPage.known_product_page);

    cy.get(productPage.pricing_module.priceDisplay).should('exist');
    cy.get(productPage.pricing_module.quantityField).should('exist');
    cy.get(productPage.pricing_module.sizingDropdown).should('exist');
    cy.get(productPage.pricing_module.colorOptions).should('exist');
    cy.get(productPage.pricing_module.addToCart).should('exist');
    cy.get(productPage.pricing_module.wishlistButton).should('exist');

    cy.get(productPage.description_column.itemName).should('exist');
    cy.get(productPage.description_column.productReference).should('exist');
    cy.get(productPage.description_column.productCondition).should('exist');
    cy.get(productPage.description_column.shortDescription).should('exist');
    cy.get(productPage.description_column.twitterShare).should('exist');
    cy.get(productPage.description_column.facebookShare).should('exist');
    cy.get(productPage.description_column.googlePlusShare).should('exist');
    cy.get(productPage.description_column.pinterestShare).should('exist');

    /*
        * Update quantity
        * Change size
        * Change color
        * Add to cart
        * Verify each checkout page and proceed until complete
    */

    cy.get(productPage.pricing_module.quantityField).clear().type('2');
    cy.get(productPage.pricing_module.colorOptions).last().click();
    cy.get(productPage.pricing_module.addToCart, { timeout: 4000 }).click();

    cy.get(productPage.layer_cart.layerCart).should('exist');
    cy.get(productPage.layer_cart.proceedToCheckoutButton, { timeout: 2000 }).should('exist').click();

    cy.get(checkoutPages.summary.lineItem).should('exist');
    cy.get(checkoutPages.summary.deleteItemIcons).first().should('exist');
    cy.get(checkoutPages.summary.proceedToCheckout, { timeout: 2000 }).last().should('exist').click();

    cy.get(checkoutPages.addresses.updateButtons).first().should('exist');
    cy.get(checkoutPages.addresses.addNewAddress).should('exist');
    cy.get(checkoutPages.addresses.proceedToCheckout, { timeout: 2000 }).last().should('exist').click();

    cy.get(checkoutPages.shipping.deliveryOptions).should('exist');
    cy.get(checkoutPages.shipping.tosCheckbox).should('exist').click();;
    cy.get(checkoutPages.shipping.proceedToCheckout, { timeout: 2000 }).last().should('exist').click();

    cy.get(checkoutPages.payment.checkOption).should('exist');
    cy.get(checkoutPages.payment.bankWireOption, { timeout: 2000 }).should('exist').click();
    cy.get(checkoutPages.payment.confirmOrderButton, { timeout: 4000 }).last().should('exist').click();

    cy.get(checkoutPages.confirmation.navigationTab).should('exist');
    cy.get(checkoutPages.confirmation.navigationTab).contains("Order confirmation");
    cy.get(checkoutPages.confirmation.pageHeading).should('exist');
    cy.get(checkoutPages.confirmation.pageHeading).contains("Order confirmation");
    cy.get(checkoutPages.confirmation.confirmationBox).should('exist');
    cy.get(checkoutPages.confirmation.confirmationBox).contains("Your order on My Store is complete.");
    
    // Check order history
    cy.get(loginPage.login_header.account_name, { timeout: 2000 }).click();
    cy.get(accountPage.account_options.orderHistory, { timeout: 2000 }).click();

    cy.get(accountPage.order_history.topItem).should('exist');
    cy.get(accountPage.order_history.historyPrices).first().should('exist');
    cy.get(accountPage.order_history.historyPrices).first().contains("$35.02");
  });
})