/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
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
        return false
    })

    it('Check that User is able to see my profile options', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains(TestData.TextBlock.MyProfile).should('be.visible');
        cy.contains(TestData.TextBlock.Settings).should('be.visible');
        cy.contains(TestData.TextBlock.Help).should('be.visible');
        cy.contains(TestData.TextBlock.Logout).should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {

        cy.contains(TestData.TextBlock.MyProfile).click()
        cy.get(selectors.UseraddBlock.addBlock).should('be.visible')
        
    })

    it('Check that when the user clicks on Add Block then Text block option is showing', () => {
        cy.get(selectors.UseraddBlock.addBlock).click()
        cy.contains(TestData.TextBlock.TextBlock).should('be.visible')
    })

    it('Check that when user click on Text block Option then Text bloxk model is showing', () => {
        
        cy.contains(TestData.TextBlock.TextBlock).click()
        cy.contains(TestData.TextBlock.TextBlock).should('be.visible')
        cy.get(selectors.UseraddBlock.firstName).should('be.visible')
        cy.get(selectors.UseraddBlock.Description).should('be.visible')
    })

    it('Check that Save button is getting enable whe the user add atleast some char in description', () => {
        cy.get(selectors.UseraddBlock.firstName).type('Testing')
        cy.get(selectors.UseraddBlock.Description).type(TestData.TextBlock.Lorem)
        cy.get(selectors.UseraddBlock.saveButton).should('be.enabled')
        cy.get(selectors.UseraddBlock.Description).clear()
    
    })

    it('Check that when the user clicks on Cancel CTA then it redirects cancel the add block process', () => {
        cy.get(selectors.UseraddBlock.CancelOption).should('be.visible').click()
    })

    it('Check that when user is able to add the article and view it on my profile screen', () => {
        cy.get(selectors.UseraddBlock.addBlock).click()
        cy.contains(TestData.TextBlock.TextBlock).click()

        cy.get(selectors.UseraddBlock.firstName).type('Apple watch')
        cy.get(selectors.UseraddBlock.Description).type(TestData.TextBlock.content)
        cy.get(selectors.UseraddBlock.saveButton).click()    
    })

    it('check that when the user select the delete then it delete the added block', () => {
        cy.reload()
        cy.contains("Apple watch").trigger('mouseover')
        cy.get(selectors.UseraddBlock.deleteIcon).eq(0).click({force: true})
        cy.contains(TestData.TextBlock.BoxText).should('be.visible')
        cy.get(selectors.UseraddBlock.deleteConfirm).click()
        
    })
    
   

})