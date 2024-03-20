/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'

const bioText = Cypress.env('userBioText');
const lengthyBioText = Cypress.env('userLengthyBioText');
const projectTitle = Cypress.env('projectTitle');
const serverDomain = Cypress.env('serverDomain');
const dayjs = require('dayjs');
let emailAddress;
let userName = Cypress.env('JD_UserName');
let password = Cypress.env('JD_Password');

describe('Logout Test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.login(userName, password);

    })

    it('Check that when user click on Logout button from dropdown then user should be logged out and redirected to Login page', () => {
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible');

        cy.get(selectors.logout.profileIcon).click()
        cy.get(selectors.logout.LogoutOption).click()
        cy.url().should('eq', 'https://draft-prod.vercel.app/account/signin');
    })
})



