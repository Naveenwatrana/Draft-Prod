/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let emailAddress;
let password = "Admin@123"


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
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.wait(10000)



        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        //cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible');
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {
        cy.contains('My Profile').click()
        cy.get(selectors.addhighlightBlock.addBlock).should('be.visible')
    })

    it('Check that when the user clicks on Link Block then Highlight Block option is showing', () => {
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Add link').should('be.visible')
    })

    it('Check that Cancel CTA option is working', () => {
        cy.contains('Add link').click()
        cy.contains('Add a link').should('be.visible')
        cy.get('[type="button"]').contains('Cancel').click()
    })
    it('Check that when user click on Text block Option then Text block model is showing', () => {
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Add link').click()
        cy.get('#title').should('be.visible')
        cy.get('#url').should('be.visible')
    
    })
    it('Check that title field is mandatory', () => {
        cy.get('#url').type('www.youtube.com')
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
    })

    it('Check that URL field is mandatory', () => {
        cy.get('#url').clear()
        cy.get('#title').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr')
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
    })

    it('Check that user can go to next screen after filling the Title and URL', () => {
        cy.get('#url').clear()
        cy.get('#title').clear()
        cy.get('#title').type("YOUTUBE")
        cy.get('#url').type("www.youtube.com")
    })




    

  

})