/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'


describe('User Onboarding Test cases', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false
        })

        before(() => {

                cy.clearLocalStorage();
              
        })

   
        it('Job match first Applicant', () => {
            cy.login("Test_Sudeshna@yopmail.com", 'Test@123')
            cy.viewport('macbook-13');

            cy.visit('https://www.thedraft.io/senior-quality-assurance-engineer-job-at-founder-and-lightning-remote-global-11')
            cy.reload()

            cy.contains("59% Match").should('be.visible')

    })

    
    it('Job match Second Applicant', () => {
        cy.login("test_suman@yopmail.com", 'Test@123')
        cy.viewport('macbook-13');

        cy.visit('https://www.thedraft.io/senior-quality-assurance-engineer-job-at-founder-and-lightning-remote-global-11')
        cy.reload()

        cy.contains("45% Match").should('be.visible')

})


it('Job match Third Applicant', () => {
    cy.login("Test_naveen@yopmail.com", 'Test@123')
    cy.viewport('macbook-13');

    cy.visit('https://www.thedraft.io/senior-quality-assurance-engineer-job-at-founder-and-lightning-remote-global-11')
    cy.reload()

    cy.contains("33% Match").should('be.visible')

})



    })