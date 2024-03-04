/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'

beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport('macbook-13');
})

describe('Croncycle user permission test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that Cronycle menu options should not display for B2C user', () => {
        cy.login('HarpratapCompany@yopmail.com', 'Test@123');
        cy.wait(10000)
        cy.contains('Workspace').should('be.visible').click();
        cy.wait(10000)
        
        cy.get(selectors.croncycleUserPermission.croncycleFeedsOption).should('not.exist');
    })

    it('Check that Cronycle menu options should not display if B2B user is not associated with The Draft company', () => {
        cy.login('HarpratapCompany@yopmail.com', 'Test@123');
        cy.wait(10000)
        cy.contains('Workspace').should('be.visible').click();
       
        cy.get(selectors.croncycleUserPermission.profileIcon).click();
        // FIXME: No company profile with this user
         cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible').click();
         cy.get(selectors.croncycleUserPermission.b2bCompanys).should('be.visible').click();
         
         cy.get(selectors.croncycleUserPermission.croncycleFeedsOption).should('not.exist');
    })

    it('Check that Cronycle menu options should display if B2B user is associated with The Draft company', () => {
        cy.login('HarpratapCompany@yopmail.com', 'Test@123');
        cy.wait(10000)
        cy.contains('Workspace').should('be.visible').click();
     
        cy.get(selectors.croncycleUserPermission.profileIcon).click();
        // FIXME: No company profile with this user
         cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible').click();
        // cy.get(selectors.croncycleUserPermission.draftCompany).should('be.visible').click();
        
        
    }) 

   /* it('Check that Croncycle menu options should not display for other than The Draft company', () => {
        cy.login('jaydeep@founderandlightning.com', 'Jaydeep@123');
        cy.contains('Workspace').should('be.visible').click();
        cy.contains('Jobs').should('be.visible');
        cy.get(selectors.croncycleUserPermission.profileIcon).click();
        // FIXME: No company profile with this user
        // cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible').click();
        // cy.get(selectors.croncycleUserPermission.secondB2BCompany).should('be.visible').click();
        // cy.get(selectors.croncycleUserPermission.profileIcon).find('span').should('have.text', 'F');
        // cy.get(selectors.croncycleUserPermission.croncycleFeedsOption).should('not.exist');
    }) */

})