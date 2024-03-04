/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
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
        cy.login("HarpratapCompany@yopmail.com", "Test@123");
       
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {
        cy.get('[data-cy="profileIcon"]')
        cy.get('[data-cy="switchAccounts"]').click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).eq(0).should('be.visible').click();
        cy.wait(2000)
        cy.get('[data-cy="profileIcon"]').click()
        cy.contains('My Profile').click()
    
    })

    it('Check that when the user clicks on Add Block then Text block option is showing', () => {
        cy.get('[data-cy="add-block"]').click()
        cy.contains('Text Block').should('be.visible')
    })

    it('Check that when user click on Text block Option then Text bloxk model is showing', () => {
        
        cy.contains('Text Block').click()
        cy.contains('Text Block').should('be.visible')
        cy.get('[data-cy="basicDetailFirstNameInput"]').should('be.visible')
        cy.get('#description').should('be.visible')
    })

    it('Check that Save button is getting enable whe the user add atleast some char in description', () => {
        cy.get('[data-cy="basicDetailFirstNameInput"]').type('qwer')
        cy.get('#description').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor')
        cy.get('[data-cy="basicDetailSave"]').should('be.enabled')
        cy.get('#description').clear()
    
    })

    it('Check that Validation is showing when user enter more than 20 charcter count', () => {
        cy.get('[data-cy="basicDetailFirstNameInput"]').type('qwertyuioplkjhgfdsazxcvbn')
        cy.get('#description').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor')
        cy.get('[data-cy="basicDetailSave"]').click()
        
    })

    it('Check that when user is able to delete on my profile screen', () => {

        cy.reload()
        cy.get('.react-grid-item').eq(0).trigger('mouseover')
        cy.get('[data-cy="companyBlocksCancelIconContainer"]').eq(0).click({force: true})
        cy.get('[data-cy="deleteBlock"]').click()
    })

    it('Check that when user is able to add the article and view it on my profile screen', () => {
        cy.get('[data-cy="add-block"]').click({force: true})
        cy.contains('Text Block').click()

        cy.get('[data-cy="basicDetailFirstNameInput"]').type('Apple watch')
        cy.get('#description').type('Apple Watch Ultra already has a hardware-exclusive Wayfinder face that let users turn on the night mode by shifting the colour mode to red and black.')
        cy.get('[data-cy="basicDetailSave"]').click()

    })
    it('Check that when user is able to delete on my profile screen', () => {

        cy.reload()
        cy.get('.react-grid-item').eq(0).trigger('mouseover')
        cy.get('[data-cy="companyBlocksCancelIconContainer"]').eq(0).click({force: true})
        cy.get('[data-cy="deleteBlock"]').click()
       
    })

})