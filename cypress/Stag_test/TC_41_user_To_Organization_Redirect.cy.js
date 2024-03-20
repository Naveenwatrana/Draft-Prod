/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
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

    it('Check that User is able to see Create options', () => {
        cy.login("HarpratapCompany@yopmail.com", "Test@123");
        cy.wait(10000)
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
         
    })

    it('Check that user is able to redirect to My profile screen ', () => {

        cy.contains('My Profile').click()
        cy.contains('Brand').should('be.visible')
        cy.contains('Resume').should('be.visible')
       // cy.get('[href="http://draft-uat.herokuapp.com/pro/test-user-151/resume"]')

    })

    it('Check that user is able to redirect to Resume tab  ', () => {

        cy.visit("https://www.thedraft.io/pro/tomasz-kosakowski/resume")
        cy.contains("Senior").should('be.visible')
        cy.contains('Founder and Lightning').trigger('mouseover')
        cy.contains('Founder and Lightning').should('be.visible').click()
    })

    it('Check that Organization is showing on resume tab  ', () => {

       // cy.contains("senior product manager").should('be.visible')
        cy.contains('Founder and Lightning').trigger('mouseover')
        cy.contains('Founder and Lightning').should('be.visible').click()
    })

    it('Check that Organization redirection  ', () => {

        cy.contains('Founder and Lightning').should('be.visible')
        
    })

})