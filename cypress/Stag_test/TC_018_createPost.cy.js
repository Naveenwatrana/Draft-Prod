/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

let description1 = "Meta builds technologies that help people connect,find communities and grow businesses. The future of digital connection"
before(() => {
    cy.clearLocalStorage();
    

})

describe('Create Article - Step 2 test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    
    it('Check that user is able to redirect to create post screen', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.ElementToVisible()
        cy.contains(TestData.CreatePost.createText).should('be.visible').click()
        cy.get(selectors.createpost.CreatepostOption).should('be.visible').click()
    })

    it('Check that Create post screen is visible', () => {
        cy.contains(TestData.CreatePost.Imagepreviewbox).should('be.visible')
        cy.contains(TestData.CreatePost.Filespecification).should('be.visible')

    })

    it('Check thatFile Specification pop-up is shwoing when clciking on it ', () => {
        cy.contains(TestData.CreatePost.Filespecification).should('be.visible').click()
        cy.contains(TestData.CreatePost.ImageType).should('be.visible')
        cy.contains(TestData.CreatePost.Videotype).should('be.visible')
        cy.get(selectors.createpost.button).contains('Close').click()
    })

    it('Check that user is able to add the image', () => {
        cy.contains(TestData.CreatePost.Imagepreviewbox).click()
        const largeImage = 'im.jpg'
        cy.contains(TestData.CreatePost.Imagepreviewbox).attachFile(largeImage, { subjectType: 'drag-n-drop' })
    })
   

    it('Check that user is able to see Add caption and tag box fields', () => {
       cy.contains(TestData.CreatePost.Addcaption).should('be.visible')
       cy.contains(TestData.CreatePost.TagTopics).should('be.visible')
    })

    it('Check that discard option is showing and user is able to discard the card', () => {
        cy.get(selectors.createpost.button).contains('Discard').click()
        cy.contains(TestData.CreatePost.DiscardPost).should('be.visible')
        cy.get(selectors.createpost.Discardbutton).click()
     })

     it('Check that check that next button is disable when the user left the Tag Topic options', () => { 
        cy.get(selectors.createpost.Descriptionblock).type(TestData.CreateArticle.LoremIpsum)
        cy.get(selectors.createpost.Submit).contains('Post').should('be.disabled')
        cy.get(selectors.createpost.Descriptionblock).clear()

    })

    it('Check that check that next button is disable when the user left the Add description field', () => { 
       cy.get(selectors.createpost.Tags).click().type('a')
       cy.ElementToVisible()
       cy.get(selectors.createpost.TagList).eq(0).click()
       cy.get(selectors.createpost.Submit).contains('Post').should('be.disabled')
       cy.get(selectors.createpost.CancelOption).click()

    })

    it('Check that check that next button is enable when the user filled all fields', () => {
        cy.get(selectors.createpost.Descriptionblock).type(TestData.CreateArticle.LoremIpsum)
        cy.get(selectors.createpost.Tags).click().type('a')
        cy.ElementToVisible()
        cy.get(selectors.createpost.TagList).eq(0).click()
        cy.get(selectors.createpost.Submit).contains('Post').should('be.enabled').click()
    
     })

})