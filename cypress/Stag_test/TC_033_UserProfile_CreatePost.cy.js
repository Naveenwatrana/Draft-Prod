/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let emailAddress;
let password = "Admin@123"

before(() => {
    
   cy.clearLocalStorage();
           
})


beforeEach(() => {
   // cy.clearLocalStorage();
    cy.viewport('macbook-13');      
  
})

describe('User profile add block test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that User is able to see Create options', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');;
        cy.wait(10000)
        cy.get("button[type=button]").contains('Create').should('be.visible')
        
    })

    it('Check that user is able to click on Create button ', () => {


        cy.get("button[type=button]").contains('Create').click()
        
    })



   it('Check that user is able to see Create menu options  ', () => {


        cy.contains('Post').should('be.visible')
       cy.contains('Article').should('be.visible')
       cy.get("button[type=button]").contains('Create').click()
        
    })

    it('Check that user is able to click and redirect to post create scree ', () => {
        cy.get("button[type=button]").contains('Create').click()
        
      cy.get('[data-cy="Create-Post"]').click()
        //cy.contains('Create Card').should('be.visible')
       
        
    }) 

   /* it('Check that validation is shwoing on wrong image ', () => {
        cy.get('[data-cy="AddNewCardContainer"]').click()

        cy.contains('Cover Card').should('be.visible')
        cy.get(selectors.createArticle.AddMantra).type('This is mantra')
        const largeImage = 'download.jpg'

        cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.contains('Selected file is to big or unsupported format').should('be.visible')
        cy.get('[data-testid="wizardHeaderCloseButton"]').click()
        cy.get("button[type=button]").contains('Yes, discard changes').click()
        
       
       
        
    })

    
    it('Check that user is able to add card in post ', () => {
       
        
        cy.get('[data-cy="AddNewCardContainer"]').click()

        cy.contains('Cover Card').should('be.visible')
        cy.get(selectors.createArticle.AddMantra).type('This is mantra')
        const largeImage = 'im.jpg'

        cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.contains('Save').should('be.enabled').click()
        // Verify that when clicking on add new card then About card or LINK card option are showing.
        cy.get(selectors.createArticle.AddNewCard).should('be.visible').click()
        cy.contains('About Card').should('be.visible')
        cy.contains('Link').should('be.visible')
       
        
    })  */

   
   
    
})



    
        

