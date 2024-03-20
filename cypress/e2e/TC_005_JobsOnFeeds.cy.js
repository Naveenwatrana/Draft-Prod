/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let count;

before(() => {
    cy.clearLocalStorage();
})

describe('Jobs on Feeds test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that User is able to view jobs on Feed and Go the job filter page', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.ElementToVisible()
        cy.contains(TestData.JobsFeed.Jobsoption).should('be.visible').click()
    })

    it('Check that User is able to view jobs on Feed and Go the job filter page', () => {
        cy.get(selectors.JobsOption.Jobscard).eq(0).trigger('mouseover')
        cy.get(selectors.JobsOption.CardIcon).should('be.visible')
        cy.get(selectors.JobsOption.Jobscard).eq(0).should('be.visible').click()

    })


    it('Verify Save button , copy link and apply button on task bar is showing', () => {
        cy.get(selectors.JobsOption.SaveIcon).should('be.visible')
        cy.get(selectors.JobsOption.ApplyOption).should('be.visible')

    })
})