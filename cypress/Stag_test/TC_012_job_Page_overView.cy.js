/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

const serverDomain = Cypress.env('serverDomain');
const lengthyBioText = Cypress.env('userLengthyBioText');
const dayjs = require('dayjs');
let emailAddress;
let userName = Cypress.env('JD_UserName');
let password = Cypress.env('JD_Password');

describe('Job description job overview empty state Test cases', () => {

    before(() => {
        cy.clearLocalStorage();
        cy.viewport('macbook-13');
        cy.login(userName, password);
        
    })

    beforeEach(() => {

        cy.viewport('macbook-13');
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    
    it('Check that user is able to switch and redirect to workspace page', () => {

        cy.contains(TestData.JobView.workspace).should('be.visible').click();
        cy.get(selectors.createJobView.profileIcon).click()
        cy.get(selectors.createJobView.switchAccout).click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).eq(0).should('be.visible').click();
        cy.wait(6000)
    })

    it('Check that user is able to redirect to publish job page', () => {
        cy.get(selectors.createJobView.JobsOption).click()
        cy.contains(TestData.JobView.Openstatus).should('be.visible')
        cy.contains(TestData.JobView.PendingStatus).should('be.visible')
        cy.contains(TestData.JobView.CloseStatus).should('be.visible')
    })
    
    it('Check that user is able to redirect to to pending job page and data is showing on it', () => {
        cy.get(selectors.createJobView.checkBox).eq(1).should('be.visible').click()
        cy.get(selectors.createJobView.Jobcard).should('be.visible')
    })

    it('Check that user is able to redirect to to close job page and data is showing on it', () => {
        cy.get(selectors.createJobView.checkBox).eq(2).should('be.visible').click()
        cy.get(selectors.createJobView.Jobcard).should('be.visible')
    })

    
    it('Check that jobs cards are showing', () => {
        cy.get(selectors.createJobView.checkBox).eq(0).should('be.visible').click()
        cy.get(selectors.createJobView.Jobcard).should('be.visible')
    })

    it('Check that user able to view the job card', () => {
        cy.get(selectors.createJobView.Jobcard).click()
    })

    it('Verify that job info is showing on job detail page', () => {
        //cy.contains(TestData.JobView.SkillsyouHave).should('be.visible')
        cy.contains(TestData.JobView.WhoyouAre).should('be.visible')
        cy.contains(TestData.JobView.WhatyouwillDo).should('be.visible')  
    })

    it('Verify that switching tabs options are showing on job detail page', () => {
        cy.contains(TestData.JobView.EditJob).should('be.visible')
        cy.contains(TestData.JobView.Applicant).should('be.visible')
        cy.contains(TestData.JobView.Message).should('be.visible')
        cy.contains(TestData.JobView.Recommendations).should('be.visible') 
    })

})