/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
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
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that User is able to see my profile options', () => {
        cy.login("HarpratapCompany@yopmail.com", "Test@123");
        cy.wait(10000)
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.get(selectors.ProfileOptions.userProfileoption).should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    })

    it('Check that user is able to redirect to My profile screen ', () => {
        cy.get(selectors.croncycleUserPermission.profileIcon)
        cy.get(selectors.ProfileOptions.switchAccout).click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).eq(0).should('be.visible').click();
        cy.wait(5000)
        cy.get(selectors.croncycleUserPermission.profileIcon).click()
        cy.get(selectors.ProfileOptions.userProfileoption).click()
    })

    it('Check that when the user clicks on Add Block then Highlight block option is showing', () => {
        cy.get(selectors.ProfileOptions.AddBlock).click()
        cy.contains('Highlight Block').should('be.visible').click()
        cy.contains('File specification').should('be.visible').click()
        cy.contains('Images').should('be.visible')
        cy.contains("Videos").should('be.visible')
        cy.contains("Close").click()
        cy.contains("Cancel").click()
    })


    it('Check that user is able to attached the image publish the highlight block', ()=>{
        cy.get(selectors.ProfileOptions.AddBlock).click({force: true})
        cy.contains('Highlight Block').click()  
        const largeImage = 'im.jpg'
        cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.get(selectors.ProfileOptions.saveButton).should('be.enabled').click()
    })

    it('Check that when user is able to delete on my profile screen', () => {

        cy.reload()
        cy.get('.react-grid-item').eq(0).trigger('mouseover')
        cy.get('[data-cy="companyBlocksCancelIconContainer"]').eq(0).click({force: true})
        cy.get('[data-cy="deleteBlock"]').click()
       
    })

})