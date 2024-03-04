/// <reference types="Cypress" />


import selectors from '../selectors'
const userName = Cypress.env('signTestUserName');

describe('Reset Password Test cases', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that it is redirect to Login page', function () {
        cy.visit('/account/signin');

       
        cy.contains("Reset Password").click()

        //Check that user redirect to reset password screen
        cy.contains('Recover Password').should('be.visible')

        //Check that user redirect previous screen
        cy.get(selectors.resetPassword.form.cancelButton).click()
        cy.contains("Sign in").should('be.visible')
        cy.contains("Reset Password").click()

        //Check that Validation is showing when the user account does not Exist
        cy.get(selectors.resetPassword.form.email).type('Wrong@yopmail.com')
        cy.get(selectors.resetPassword.form.button).click()
        cy.contains(selectors.resetPassword.form.nonExistingUser).should('be.visible')

        //Check that Validation is showing when on wrong Email
        cy.reload()
        cy.get(selectors.resetPassword.form.email).type('Wrong@yopmail')
        cy.get(selectors.resetPassword.form.button).click()
        cy.contains('email must be a valid email')
            .should('be.visible')

        //Check that is it redirect to next screen after entering the right credetials
        cy.reload()
        cy.get(selectors.resetPassword.form.email).type("naveen@founderandlightning.com")
        cy.get(selectors.resetPassword.form.button).click()
        cy.contains('Instruction Sent').should('be.visible') 
    })

})

