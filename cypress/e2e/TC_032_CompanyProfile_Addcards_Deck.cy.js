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
        cy.login("HarpratapCompany@yopmail.com", "Test@123");
        cy.wait(10000)
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My  company profile screen ', () => {


        cy.get('[data-cy="switchAccounts"]').click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).eq(0).should('be.visible').click();
        cy.wait(5000)
        cy.get('[data-cy="profileIcon"]').click()
        cy.contains('My Profile').click()

        //cy.contains('My Profile').click()
        
    })

    it('Check that add card model is showing on clicking on add card option', () => {

        
        //cy.contains('Card').click({force: true})
       // cy.contains('Edit Deck').should('be.visible')
        
    })

   /* it('Check that user is able to add mantra card', () => {

        cy.get(' [data-cy="userCardCover0"]').click()
        cy.get(selectors.createArticle.AddMantra).clear().type('This is mantra')
        cy.contains('Save').should('be.enabled').click()
        cy.wait(10000)
        
        
    })

    
    it('Check that user is able to add about card', () => {
        cy.contains('Add Card').click({force: true})
        cy.get('[data-cy="addNewCardAbout"]').click()
        cy.contains('About Card')
        cy.get(selectors.createArticle.AddMantra).type("Facebook")
        cy.get(selectors.createArticle.AddDescription).type("description1")
    
        const Facebook = 'beauty.jpg'

        cy.contains('Browse').attachFile(Facebook, { subjectType: 'drag-n-drop' }) 
        cy.contains('Save').should('be.enabled')
        cy.contains('Cancel').should('be.enabled').click();
        cy.contains('Yes, discard changes').click();

        
        
    })

   it('Check that user is able to add Link card', () => {
         cy.contains('Add Card').click({force: true})
        cy.contains('Links').click()
        cy.contains('Link Card')
        cy.get('#name').type("Facebook")
        cy.get('#url').type("https://www.facebook.com/") 
        const Facebook = 'test_image.jpg'

        cy.contains('Browse').attachFile(Facebook, { subjectType: 'drag-n-drop' }) 
        cy.contains('Save').should('be.enabled')
        
        
    }) */

    it('Logout',() =>{
        cy.visit('https://www.thedraft.io/feed')
        cy.get(selectors.logout.profileIcon).click()
        cy.get(selectors.logout.LogoutOption).click()
    })





    
        


})