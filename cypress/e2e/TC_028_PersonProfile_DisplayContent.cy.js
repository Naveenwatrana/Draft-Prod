/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
//import { isVisible } from '@testing-library/user-event/dist/types/utils';
let emailAddress;
let password = "Admin@123"
before(() => {
    cy.clearLocalStorage();
    
})

beforeEach(() => {
    cy.viewport('macbook-13');
})

describe('User profile add block test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that User is able to see my profile options', () => {
        cy.login("HarpratapCompany@yopmail.com", "Test@123");
        cy.wait(10000)
        


        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        //cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible');
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {

        cy.contains('My Profile').click()
       // cy.contains('Card').should('be.visible')
        cy.get('[data-cy="add-block"]').should('be.visible')
        
    })

    it('Check that content Toggle option is showing', () => {

        
        cy.contains('Content').should('be.visible')
        
    })

})