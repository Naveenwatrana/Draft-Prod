/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

const bioText = Cypress.env('userBioText');
const lengthyBioText = Cypress.env('userLengthyBioText');
const projectTitle = Cypress.env('projectTitle');
const serverDomain = Cypress.env('serverDomain');
const dayjs = require('dayjs');
let emailAddress;

describe('User Onboarding data on refresh the page Test Cases', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

  before(() => {

    cy.clearLocalStorage();
    

  })

  let orgName = "ford"

  it('Check that User is able to see Create Organization option', () => {

    cy.login(TestData.CreateOrganization.Username, TestData.CreateOrganization.Password);
    cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
    cy.get(selectors.createOrganization.OrgOption).should('be.visible').click()

  })

  it('Check that User is able to see Create Organization first screen', () => {

    cy.contains(TestData.CreateOrganization.CreateVerifyOrg).should('be.visible')
    cy.get(selectors.createOrganization.StartOnboarding).should('be.visible').click()

  })

  it('Check that User is able to Redirect to Create Organization website tab', () => {
    cy.contains(TestData.CreateOrganization.OrgpageTitle).should('be.visible')

  })

  it('Check that next and cancel button is showing on Create Organization website screen', () => {
    cy.get(selectors.createOrganization.CancelOption).should('be.visible')
    cy.get(selectors.createOrganization.NextButton).should('be.disabled')

  })

  it('Check that validiation is showing on Invalid URL on Create Organization website screen', () => {

    cy.get(selectors.createOrganization.orgURL).type("hjhsajcom")
    cy.contains(TestData.CreateOrganization.Entervalidurl).should('be.visible')
    cy.get(selectors.createOrganization.orgURL).clear()

  })

  it('Check that add only numbers in website input field - error should be displayed', () => {

    cy.get(selectors.createOrganization.orgURL).type("12344564465646")
    cy.contains(TestData.CreateOrganization.Entervalidurl).should('be.visible')
    cy.get(selectors.createOrganization.orgURL).clear()

  })

  it('Check that add only special character in website input field - error should be displayed', () => {

    cy.get(selectors.createOrganization.orgURL).type("!@#$%^&*")
    cy.contains(TestData.CreateOrganization.Entervalidurl).should('be.visible')
    cy.get(selectors.createOrganization.orgURL).clear()

  })

  it('Check that add only Invalid URL in website input field - error should be displayed', () => {

    cy.get(selectors.createOrganization.orgURL).type("http://www.test.com/do.html#A")
    cy.contains("Validation failed").should('be.visible')
    cy.get(selectors.createOrganization.orgURL).clear()

  })

  it('Check that validiation is showing on when the user have all caps latter in URL on Create Organization website screen', () => {
    cy.get(selectors.createOrganization.orgURL).type("GOOGLE.COM")
    cy.contains(TestData.CreateOrganization.Entervalidurl).should('be.visible')
    cy.get(selectors.createOrganization.orgURL).clear()

  })

  it('Verify Cancel CTA on website page', () => {
    cy.get(selectors.createOrganization.CancelOption).should('be.visible').click()
    cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
    cy.get(selectors.createOrganization.OrgOption).should('be.visible').click()
    cy.get(selectors.createOrganization.StartOnboarding).should('be.visible').click()

  })

  it('Check that user is able to redirect to another screen after entering the valid URL', () => {
    cy.get(selectors.createOrganization.orgURL).type(orgName + ".com")
    cy.get(selectors.createOrganization.NextButton).click()

  })

  it('Check that User is able to see  Organization Detail page screen', () => {
    cy.contains(TestData.CreateOrganization.OrgDetail).should('be.visible')
    cy.contains(TestData.CreateOrganization.Orgconfirm).should('be.visible')

  })

  it('Check that next and cancel button is showing on  Organization detail screen', () => {
    cy.get(selectors.createOrganization.CancelOption).should('be.visible')
    cy.get(selectors.createOrganization.NextButton).should('be.disabled')

  })

  it('Check that next button is disable when the user left the  org name field on Organization detail screen', () => {
    cy.contains(TestData.CreateOrganization.SelectTypebox).click()
    cy.get(selectors.createOrganization.OrgTypeOption).contains("Investor").click()
    cy.get(selectors.createOrganization.NextButton).should('be.disabled')

  })

  it('Check that it  Should not enable Next CTA when user not entered org type in organization details form', () => {
    cy.get(selectors.createOrganization.OrgTitle).clear()
    cy.get(selectors.createOrganization.OrgTitle).type(orgName)
    cy.get(selectors.createOrganization.NextButton).should('be.disabled')

  })

  it('Check that User4 is able to redirect to next screen after filleing the information on Organization detail screen', () => {
    cy.get(selectors.createOrganization.OrgTitle).clear()
    cy.get(selectors.createOrganization.OrgTitle).type(orgName)
    cy.get(selectors.createOrganization.NextButton).should('be.enabled').click()

  })

  it('Check that User is able to see  Organization Detail page screen', () => {
    cy.contains(TestData.CreateOrganization.ConfirmEmail).should('be.visible')
    cy.contains(TestData.CreateOrganization.VerifyworkOrg).should('be.visible')

  })

  it('Should not enable Next CTA when user enter blank space on work email', () => {
    cy.get(selectors.createOrganization.WorkEmail).clear()
    cy.get(selectors.createOrganization.WorkEmail).type("             @" + orgName + ".com")
    cy.contains('workEmail must be a valid email').should('be.visible')
    cy.get('[data-cy="nextCreateOrganization"]').should('be.disabled')
  })

  it('Should not enable Next CTA when user enter special characters on work email', () => {
    cy.get(selectors.createOrganization.WorkEmail).clear()
    cy.get(selectors.createOrganization.WorkEmail).type("!@#$%^&*@" + orgName + ".com")
    cy.contains(TestData.CreateOrganization.WorkemailValidation).should('be.visible')
    cy.get(selectors.createOrganization.NextorgButton).should('be.disabled')
  })

  it('Verify checkbox not checked and Next button is not enabled', () => {
    cy.get(selectors.createOrganization.WorkEmail).clear()
    cy.get(selectors.createOrganization.WorkEmail).type("naveen@" + orgName + ".com")
    cy.get(selectors.createOrganization.NextorgButton).should('be.disabled')
  })

  it('Check that it Should not enable Next CTA when user not enetered work email', () => {
    cy.get(selectors.createOrganization.WorkEmail).clear()
    cy.get(selectors.createOrganization.ConfirmEmailmessage).next().click()
    cy.get(selectors.createOrganization.NextorgButton).should('be.disabled')
  })

  it('Should not enable Next CTA when user enter wrong email on work email', () => {
    cy.get(selectors.createOrganization.WorkEmail).clear()
    cy.get(selectors.createOrganization.WorkEmail).type("Test@abc.com")
    cy.get(selectors.createOrganization.NextorgButton).click()

    cy.contains(TestData.CreateOrganization.DomainValidation).should('be.visible')
  })

  it('Check that next and cancel button is showing on  Organization detail screen', () => {
    cy.get(selectors.createOrganization.Cancelorgbutton).should('be.visible')

  })


})

























