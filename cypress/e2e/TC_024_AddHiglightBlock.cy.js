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
    cy.viewport('macbook-13');
})

describe('User profile add block test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that User is able to see my profile options', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {
        cy.contains('My Profile').click()
        cy.get(selectors.addhighlightBlock.addBlock).should('be.visible') 
    })

    it('Check that when the user clicks on Add Block then Highlight Block option is showing', () => {
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Highlight Block').should('be.visible')
    })

    it('Check that Cancel CTA option is working', () => {
        cy.contains('Highlight Block').click()
        cy.contains('Highlight Block').should('be.visible')
        cy.get('[data-cy="basicDetailCancel"]').click()
    })

    it('Check that when user click on Text block Option then Text block model is showing', () => {
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Highlight Block').click()
        cy.contains('Highlight Block').should('be.visible')
        cy.get(selectors.addhighlightBlock.Title).should('be.visible')
    })

   



    it('Check that valdaion is showing when the user adds more than 20 Char in Title field.', ()=>{
        cy.get(selectors.addhighlightBlock.Title).type('Lorem Ipsum is simply dummy text of the printing and typesetting')
        const largeImage = 'im.jpg'
        cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.get('[data-cy="basicDetailCancel"]').click()
        
    })

    it('Check that file specification option is showing and when click on it showing the file model', ()=>{
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Highlight Block').click()
        cy.contains('File specification').should('be.visible').click()
        cy.contains('Images').should('be.visible')
        cy.contains("Videos").should('be.visible')
        cy.contains("Close").click()
        cy.contains("Cancel").click()
    })

    it('Check that user is able to attached the image publish the highlight block', ()=>{
        cy.get(selectors.addhighlightBlock.addBlock).click()
        cy.contains('Highlight Block').click()
        cy.get(selectors.addhighlightBlock.Title).type('Test Image')
        const largeImage = 'im.jpg'
        cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.contains('Save').should('be.enabled').click()
    })
    // Add delete test cases for highlight block img
    it('check that Delete box model appear when the user clicks on delete button ', () =>{
        cy.reload()
        cy.viewport('macbook-13');
        cy.contains("Test Image").trigger('mouseover')
        cy.get(selectors.addhighlightBlock.deleteHighlightBlock).eq(0).click({force: true})
        cy.contains('Are you sure you want to remove this block').should('be.visible')
        cy.get(selectors.addhighlightBlock.cancelButton).click() 
    })

    it('check that when teh user clicks on cancel otion on box model then it comes back', () =>{
        cy.reload()
        cy.viewport('macbook-13');
        cy.contains("Test Image").trigger('mouseover')
        cy.get('[data-cy="delete-hightlight-block"]').eq(0).click({force: true})
        cy.contains('Are you sure you want to remove this block').should('be.visible')
        cy.get(selectors.addhighlightBlock.deleteCancel).click()
    })

    it('check that when the user select the delete then it delete the added block ', () =>{
        cy.reload()
        cy.viewport('macbook-13');
        cy.contains("Test Image").trigger('mouseover')
        cy.get(selectors.addhighlightBlock.deleteHighlightBlock).eq(0).click({force: true})
        cy.contains('Are you sure you want to remove this block').should('be.visible')
        cy.get(selectors.addhighlightBlock.deleteBlock).click()
    })

})