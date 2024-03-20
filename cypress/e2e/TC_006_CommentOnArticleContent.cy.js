/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let emailAddress;
let password = "Admin@123";
let count = 0;
const dayjs = require('dayjs');

before(() => {

    cy.clearLocalStorage();
})

beforeEach(() => {
    cy.viewport('macbook-13');

})

describe('Comment on article content test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that user should be able to go to article details page', () => {
        cy.visit('https://draft-prod.vercel.app/account/signin')
        cy.login('Harpratap@yopmail.com', 'Test@123');
       cy.ElementToVisible()
        cy.contains("ARTICLES").should('be.visible').click()
       cy.visit("https://draft-prod.vercel.app/article/g20-summit-in-indi-27")
       
    })

    it("Check that all options are showing on article detail page", ()=>{
        
        cy.get('[alt="Preview Image"]').should('be.visible')
        cy.get('[data-cy="saveButton"]').should('be.visible')
        cy.get('[data-cy="upvoteButton"]').should('be.visible')
        cy.get('[data-cy="shareLinkButton"]').should('be.visible')
    })

    it('Check that Comment button is showing and Comment text box is showing', () => {
    
        cy.get('[data-cy="commentsTextArea"]').should('be.visible')
        cy.get('[data-cy="addComment"]').should('be.visible')

     })

    it('Check that when user doesnt add empty space in the comment then it should not publish', () => {
        cy.get('[data-cy="commentsTextArea"]').type('      ')
        cy.get('[data-cy="addComment"]').click()

 })

    it('Check that User is able to comment on the articles', () => {
        cy.get('[data-cy="commentsTextArea"]').type('Comment text')
        cy.get('[data-cy="addComment"]').click()
        cy.contains(TestData.ArticleFeed.Comments).should('be.visible')
    })

    
    

    

    

})