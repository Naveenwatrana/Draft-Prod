/// <reference types="Cypress" />
// <reference types="../support" />

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
        cy.viewport('macbook-13');
        cy.login(userName, password);
        cy.clearLocalStorage();
    })

    beforeEach(() => {

        cy.viewport('macbook-13');
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
   
    it('Check that user is able to switch and redirect to workspace page', () => {

        cy.get(selectors.createJob.Profileicon).click()
        cy.get(selectors.createJob.Switchoption).click()
        cy.get(selectors.croncycleUserPermission.b2bCompanys).eq(0).should('be.visible').click();
        cy.wait(5000)
        cy.contains("Create").click({ force: true });
        cy.contains("Job").click();

    })

    it('Check that user is able to redirect to create job page', () => {
        cy.contains('What type of role are you hiring?').should('be.visible')
    })

    it('Verify Cancel CTA on Role page on create job page', () => {
        cy.get(selectors.createJob.button).contains('Cancel').should('be.visible').click()
        cy.wait(5000)
        cy.contains("Create").click({ force: true });
        cy.contains("Job").click();

    })


    it('Check that Job tilte fiels is showing validation on empty filed', () => {
        cy.get(selectors.createJob.jobRole).type('    ')
        cy.get('body').click(0, 0)
        cy.contains('Job title is required').should('be.visible')
        cy.reload()
    })

    it('Check that Job tilte fiels is showing validation on text limit', () => {
        cy.get(selectors.createJob.jobRole).type(TestData.CreateJob.LoremIpsum)
        cy.get('body').click(0, 0)
        cy.contains('maximum words allowed').should('be.visible')
        cy.reload()
    })

    it('Check that next button is disable when only job tilte field is filled', () => {
        cy.get(selectors.createJob.jobRole).type('Accounting Professional')
        cy.get(selectors.createJob.nextbutton).contains('Next').should("be.disabled")
        cy.get(selectors.createJob.jobRole).clear()

    })

    it('Check that user Should be able to create job with only numbers as job title', () => {
        cy.get(selectors.createJob.jobRole).type('123456789')
        cy.get(selectors.createJob.functionalRoleInput).type('s')
        cy.get(selectors.createJob.funtionalRoleListbox).contains('business finance').click()
        cy.get(selectors.createJob.nextbutton).contains('Next').should("be.enabled")
        cy.get(selectors.createJob.jobRole).clear()
        cy.get(selectors.createJob.functionalRoleInput).clear()
    })

    it('Check that user Should be able to create job with only Character as job title', () => {
        cy.get(selectors.createJob.jobRole).type('abcdefgh')
        cy.get(selectors.createJob.functionalRoleInput).type('s')
        cy.get(selectors.createJob.funtionalRoleListbox).contains('business finance').click()
        cy.get(selectors.createJob.nextbutton).contains('Next').should("be.enabled")
        cy.get(selectors.createJob.jobRole).clear()
        cy.get(selectors.createJob.functionalRoleInput).clear()
    })

    it('Check that can"t find pop-up appear on click', () => {
        cy.contains(selectors.createJob.canjobroleoption).should("be.visible").click()
        cy.contains("If you can't find a suitable category, then we don't currently support those roles").should("be.visible")
        cy.contains('Close').click()
    })

    it('Check that next button is disable when only functional role field is filled', () => {
        cy.get(selectors.createJob.functionalRoleInput).type('s')
        cy.get(selectors.createJob.funtionalRoleListbox).contains('business finance').click()
        cy.get(selectors.createJob.nextbutton).contains('Next').should("be.disabled")
        cy.get(selectors.createJob.functionalRoleInput).clear()
    })

    it('Check that user is able to fill in information and proceed ahead with next button', () => {
        cy.get(selectors.createJob.jobRole).type('Accounting Professional')
        cy.get(selectors.createJob.functionalRoleInput).type('s')
        cy.get(selectors.createJob.funtionalRoleListbox).contains('business finance').click()
        cy.get(selectors.createJob.nextbutton).contains('Next').should("be.enabled").click()
    })
    it('Check that skill and Technologies block is showing', () => {
        cy.contains('Skills you have').should('be.visible')
    })

    it('Check that skill and Technologies option is working and open the pop-up', () => {
        cy.contains('Add skills and technologies').click()
        cy.contains("Skills and technologies").should("be.visible")
    })

    it('Verify Cancel CTA on skills and technologies page', () => {
        cy.get(selectors.createJob.CancelOption).contains('Cancel').should('be.visible').click()
        cy.contains('Add skills and technologies').click()
    })

    it('Check that user is able to select any technology', () => {
        cy.get('[data-cy="addSkillButton"]').click()
        cy.get(selectors.createJob.skillTechnologyInputbox).click().type("React")
        cy.get(selectors.createJob.skillTechnologylist).contains('React').click()
        cy.get(selectors.createJob.Addskillbutton).click()
        cy.get(selectors.createJob.skillTechnologyInputbox).click().type("Node")
        cy.get(selectors.createJob.skillTechnologylist).contains('NodeJS').click()
        cy.get(selectors.createJob.saveButton).click()
    })

    it('Check that user is able to redirect to create job detail page', () => {
        cy.contains(selectors.createJob.whoyouareOption).should('be.visible')
        cy.contains(selectors.createJob.addRequirementsotion).click()
        cy.get(selectors.createJob.employementTypefield).should('be.visible')
    })

    it('Verify Cancel CTA on who you are page on create job detail page', () => {
        cy.get(selectors.createJob.bulletpoint).type("Comfortable tackling ambiguous, complex problems Live for feedback, you reach out often and early")
        cy.get(selectors.createJob.CancelOption).contains('Cancel').should('be.visible').click()
        cy.contains(selectors.createJob.addRequirementsotion).click()
        cy.get(selectors.createJob.employementTypefield).should('be.visible')
    })

    it('Check that next button is disable when the user left any mandotry field', () => {
        cy.get(selectors.createJob.employementTypefield).click()
        cy.get(selectors.createJob.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.createJob.salaryTo).type("12")
        cy.get(selectors.createJob.saveButton).should('be.disabled')
    })

    it('Check that Vlaidation is shwoing when the user only enters the salary to', () => {
        cy.get(selectors.createJob.employementTypefield).click()
        cy.get(selectors.createJob.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.createJob.salaryTo).type("12")
        cy.contains("salaryFrom is a required field").should('be.visible')
        cy.get(selectors.createJob.salaryTo).clear()
    })

    it('Check that Vlaidation is shwoing when the user only enters the OTE to', () => {
        cy.get(selectors.createJob.employementTypefield).click()
        cy.get(selectors.createJob.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.createJob.OTEto).type("12")
        cy.contains("OTE from is a required field").should('be.visible')
        cy.get(selectors.createJob.OTEto).clear()
    })

    it('Verify Delete option when added new requirement more than 1', () => {
        cy.get(selectors.createJob.bulletpoint).type("Comfortable tackling ambiguous, complex problems Live for feedback, you reach out often and early")
        cy.get(selectors.createJob.Addrequirement).click()
        cy.get(selectors.createJob.bulletpoint).type("Comfortable tackling ambiguous, complex problems Live for feedback, you reach out often and early")
        cy.get(selectors.createJob.deleteicon).eq(1).click()
    })

    it('Check that user is able to fill all fields and proceed aheah with save', () => {
        cy.get(selectors.createJob.employementTypefield).click()
        cy.get(selectors.createJob.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.createJob.salaryFrom).type("12000")
        cy.get(selectors.createJob.salaryTo).type("20000")
        cy.get(selectors.createJob.OTEfrom).type("30000")
        cy.get(selectors.createJob.OTEto).type("50000")
        cy.get(selectors.createJob.Languagefield).type("Hindi")
        cy.get(selectors.createJob.LanguagaListbox).contains("Hindi").click()
        cy.get(selectors.createJob.addRequirement1).click()
        cy.get(selectors.createJob.bulletpoint).type("Comfortable tackling ambiguous, complex problems Live for feedback, you reach out often and early")
        cy.get('body').click(0, 0)
        cy.get(selectors.createJob.saveButton).click()
    })

    it('Check that user is able to redirect to create job detail page', () => {
        cy.contains(TestData.CreateJob.AddResponsibilitiesOption).scrollIntoView().should('be.visible')
        cy.contains(TestData.CreateJob.AddResponsibilitiesOption).should('be.visible').click()
        cy.contains(TestData.CreateJob.Title).should('be.visible')
    })

    it('Verify Cancel CTA on who you are page on create job detail page', () => {
        cy.get(selectors.createJob.CancelOption).scrollIntoView()
        cy.get(selectors.createJob.CancelOption).click()
        cy.contains(TestData.CreateJob.AddResponsibilitiesOption).scrollIntoView().should('be.visible')
        cy.contains(TestData.CreateJob.AddResponsibilitiesOption).should('be.visible').click()
        cy.contains(TestData.CreateJob.Title).should('be.visible')
    })

    it('Check that user Next button disable when user left role type box', () => {
        cy.get(selectors.createJob.workstyle).click()
        cy.get(selectors.createJob.WorkStyleListBoxValue).contains('On-site').click()
        cy.get(selectors.createJob.saveButton).should('be.disabled')
    })

    it('Check that user Next button disable when user left work style', () => {
        cy.get(selectors.createJob.RoleTypebox).click()
        cy.get(selectors.createJob.RoleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.createJob.saveButton).should('be.disabled')
    })

    it('Check that user Next button disable when user left Location', () => {
        cy.get(selectors.createJob.RoleTypebox).click()
        cy.get(selectors.createJob.RoleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.createJob.workstyle).click()
        cy.get(selectors.createJob.WorkStyleListBoxValue).contains('On-site').click()
        cy.get(selectors.createJob.saveButton).should('be.disabled')
    })

    it('Verify Delete option when added new requirement more than 1', () => {
        cy.get(selectors.createJob.bulletpoint).type(TestData.CreateJob.Text)
        cy.get(selectors.createJob.AddResponsibility).click()
        cy.get(selectors.createJob.bulletpoint).type(TestData.CreateJob.Text)
        cy.get(selectors.createJob.deleteicon).eq(1).click()
        cy.get(selectors.createJob.bulletpoint).clear()

    })

    it('Check that user is able to redirect to create job detail page', () => {
        cy.get(selectors.createJob.RoleTypebox).click()
        cy.get(selectors.createJob.RoleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.createJob.workstyle).click()
        cy.get(selectors.createJob.WorkStyleListBoxValue).contains('On-site').click()
    })


})