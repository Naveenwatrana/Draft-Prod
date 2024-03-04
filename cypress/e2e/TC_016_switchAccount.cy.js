/// <reference types="Cypress" />

import { should } from 'chai';
import selectors from '../selectors'

before(() => {
    cy.clearLocalStorage();
})

describe('Switch between account test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that user is able to switch account option is showing', () => {
        cy.login('HarpratapCompany@yopmail.com', 'Test@123');
        cy.ElementToVisible()
        cy.get(selectors.croncycleUserPermission.profileIcon).click();
        cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible');
    })

    it('Check that on clicking on switch button companies accounts are shwoing', () => {
        cy.get(selectors.croncycleUserPermission.switchAccountsButton).click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).should('be.visible')
    })

    it('Check that user is able to switch on company account', () => {
        cy.get(selectors.croncycleUserPermission.b2bCompanys).click()
        cy.ElementToVisible()
        cy.get(selectors.croncycleUserPermission.profileIcon).click();
        cy.get(selectors.croncycleUserPermission.MyprofileOption).click()
        cy.url().should('include', 'jip')
    })

    // it('Check that user is able to switch from one company account to another company account', () => {
    //     cy.visit('https://draft-uat.herokuapp.com/feed')
    //     cy.ElementToVisible()
    //     cy.get(selectors.croncycleUserPermission.profileIcon).click();
    //     cy.get(selectors.croncycleUserPermission.switchAccountsButton).click()
    //     cy.get(selectors.croncycleUserPermission.EddoxCompany).should('be.visible').click()
    //     cy.ElementToVisible()
    // })

    // it('Check that user is able to switch from company account to user account', () => {
    //     cy.get(selectors.croncycleUserPermission.profileIcon).click();
        
    //     cy.get(selectors.croncycleUserPermission.switchAccountsButton).click()
    //     cy.get(selectors.croncycleUserPermission.EddoxCompany).should('be.visible').click()
    // })

})