/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

before(() => {
    cy.clearLocalStorage();
    cy.viewport('macbook-13');
})

describe('Check that user can redirect to Other user profile screen', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that user should able to add the article filter screen', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.ElementToVisible()
        cy.visit(TestData.FollowUser.AshProfile)
        cy.url().should('include',"/naveen-watrana" )
    }) 

    it('Check that user should able to follow the other user', () => {
        cy.get(selectors.Follow.button).contains('Follow').click()
        cy.get(selectors.Follow.button).contains('Message').should('be.visible')
    }) 

    it('Check that user should able to Un-follow the other user', () => {
        cy.get(selectors.Follow.followedoption).click()
        cy.get(selectors.Follow.button).contains('Follow').should('be.visible')
    }) 

})