/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

const bioText = Cypress.env('userBioText');
const lengthyBioText = Cypress.env('userLengthyBioText');
const projectTitle = Cypress.env('projectTitle');
const serverDomain = Cypress.env('serverDomain');
const dayjs = require('dayjs');
let emailAddress;

describe('User Onboarding Test cases', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    
    before(() => {

        cy.clearLocalStorage();
        cy.visit('https://www.thedraft.io/account/signin')
        cy.login ("testprod_user4@yopmail.com", "Test@123")
    })

    it('Check that user can redirect to onboarding start screen', () => {
        cy.url().should('eq', 'https://www.thedraft.io/profile/onboarding');
        cy.contains('Welcome').should('be.visible');
        cy.get(selectors.userOnboarding.startOnboarding).should('be.visible').click()
        cy.contains(TestData.UserOnboarding.Confirm).should('be.visible')

    })
    it('Check that it Should not enable Next CTA when firstname and lastname doesnt entered', () => {
        cy.get(selectors.userOnboarding.firstName).should('be.visible')
        cy.get(selectors.userOnboarding.lastName).should('be.visible')
        cy.get(selectors.userOnboarding.Button).contains('Next').should('be.disabled')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()
    })

    it('Check that it Should not enable Next CTA when firstname only entered and lastname is blank', () => {
        cy.get(selectors.userOnboarding.firstName).type('David')
        cy.get(selectors.userOnboarding.Button).contains('Next').should('be.disabled')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()
    })

    it('Check that it Should not enable Next CTA when lastname only entered and firstname is blank', () => {
        cy.get(selectors.userOnboarding.firstName).should('be.visible')
        cy.get(selectors.userOnboarding.lastName).type(TestData.UserOnboarding.userLastname)
        cy.get(selectors.userOnboarding.Button).contains('Next').should('be.disabled')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()
    })

    it('Check that validation is shwoing when user enter less than 3 char in first/last name', () => {
        cy.get(selectors.userOnboarding.firstName).type(TestData.UserOnboarding.wrongFirstname);
        cy.get(selectors.userOnboarding.lastName).type(TestData.UserOnboarding.wrongLastname);
        cy.contains(TestData.UserOnboarding.ThreecharValidation).should('be.visible')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()
    })

    it('Check that validation is shwoing when user enter empty space in first/last name ', () => {
        cy.get(selectors.userOnboarding.firstName).type('    ');
        cy.get(selectors.userOnboarding.lastName).type('    ');
        cy.get(selectors.userOnboarding.LocationInput).click().type(TestData.UserOnboarding.texas)
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.userOnboarding.Button).contains('Next').click()
        cy.contains(TestData.UserOnboarding.FirstnameValidation).should('be.visible')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()

    })

    it('Check that validation is shwoing when user enter more than 100 char in first/last name ', () => {
        cy.reload()
        cy.get(selectors.userOnboarding.firstName).type(TestData.UserOnboarding.LoremIpsum);
        cy.get(selectors.userOnboarding.lastName).type(TestData.UserOnboarding.LoremIpsum);
        cy.contains(TestData.UserOnboarding.MaxcharValidation).should('be.visible')
        cy.get(selectors.userOnboarding.firstName).clear()
        cy.get(selectors.userOnboarding.lastName).clear()

    })

    it('Check that next button should be enable when user enter first/last name ', () => {
        cy.get(selectors.userOnboarding.firstName).type(TestData.UserOnboarding.FirstUsername);
        cy.get(selectors.userOnboarding.lastName).type(TestData.UserOnboarding.LastUsername);
        cy.get(selectors.userOnboarding.LocationInput).click().type(TestData.UserOnboarding.texas)
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.userOnboarding.Button).contains('Next').should('be.enabled').click();
    })

    it('Check that After filling the names user redirects to resume tab ', () => {
        cy.contains('Now let’s start building your digital resume').should('be.visible')
        cy.get(selectors.Onboarding.addExperience).should('be.visible')
        cy.get(selectors.Onboarding.addEducation).scrollIntoView().should('be.visible')
    })

    it('check that next button is disable when the user enters empty Role', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type('      ')
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()
    })

    it('check that user is next button is disable when the user left the Functional role', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()
    })

    it('Check that it Should not enable Next CTA when user not entered emp type in add experience form ', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })

    it('Check that it Should not enable Next CTA when user not entered location name in add experience form', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()
    })


    it('Check that it Should not enable Next CTA when user not entered location type in add experience form', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })

    it('Check that it Should not enable Next CTA when user not entered Role type in add experience form', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })


    it('Check that it Should not enable Next CTA when user not entered date in add experience form', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get('[data-cy="next"]').should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })

    it('Check that it  disabled end date when user selected ongoing project check box', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })

    it('check that user is next button is disable when the user enters empty Organization name', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()
    })


    it('Check that when there is no result found in the field then it shows the validation message ', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('tdsfdsfsd')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("No options").should('be.visible')
        cy.get(selectors.Onboarding.employementType).type("bsmsbdnm")
        cy.get(selectors.Onboarding.employementTypeListBox).contains("No options").should('be.visible')
        cy.get(selectors.Onboarding.Location).type("bsmsbdnm")
        cy.get(selectors.userOnboarding.LocationListbox).contains("No options").should('be.visible')
        cy.get(selectors.Onboarding.locationType).type("bsmsbdnm")
        cy.get(selectors.Onboarding.locationTypeListBox).contains("No options").should('be.visible')
        cy.get(selectors.Onboarding.roleType).type("bsmsbdnm")
        cy.get(selectors.Onboarding.roleTypeListBox).contains("No options").should('be.visible')
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.disabled')
        cy.get(selectors.Onboarding.ProjectCancelButton).click()

    })

    it('Check that user is able to go to second step after filling the first form ', () => {
        cy.get(selectors.Onboarding.addExperience).click()
        cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
        cy.get(selectors.Onboarding.functionalRole).type('t')
        cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
        cy.get(selectors.Onboarding.organizationName).type('f')
        cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
        cy.get(selectors.Onboarding.employementType).click()
        cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
        cy.get(selectors.Onboarding.Location).click().type("Texas")
        cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
        cy.get(selectors.Onboarding.locationType).click()
        cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
        cy.get(selectors.Onboarding.roleType).click()
        cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
        cy.get(selectors.Onboarding.projectStartDate).click()
        cy.get(selectors.Onboarding.projectCurrentDate).click()
        cy.contains('Ongoing project').click()
        cy.get(selectors.Onboarding.ProjectNextButton).should('be.enabled').click()

    })

    it('Verify next button is in disabled mode if description not entered and not skills and technologies  ', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).should('be.visible')
        cy.get(selectors.userOnboarding.Submit).contains('Save').should('be.disabled')
    })

    it('Verify next button is in disabled mode if description entered and not skills and technologies  ', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).should('be.visible')
        cy.get(selectors.userOnboarding.Description).type(TestData.UserOnboarding.LoremIpsum)
        cy.get(selectors.userOnboarding.Submit).contains('Save').should('be.disabled')

    })

    it('Verify back button is in enabled mode if user clicks on it then it redirect to previous screen  ', () => {
        cy.get(selectors.userOnboarding.Back).should('be.visible').click()
        cy.get(selectors.userOnboarding.Next).should('be.enabled').click()

    })

    it('Check that user is able to redirect to fill the skills and technology  ', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).type("node")
        cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('NodeJS').click()
        cy.get(selectors.userOnboarding.SkillandTechnology).type("test")
        cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('API Testing').click()
        cy.get(selectors.userOnboarding.Description).type(TestData.UserOnboarding.LoremIpsum)
        cy.get(selectors.userOnboarding.Submit).contains('Save').click()
    })

    it('check that user is next button is disable when the user left Institution name', () => {
        cy.get(selectors.userOnboarding.AddEducation).scrollIntoView().click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.Startdate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.contains('Ongoing').click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left Education type ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).type('Havard Unversity')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.Startdate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.contains('Ongoing').click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left Field of Study ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Startdate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.contains('Ongoing').click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left the date', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that it Should not enable Next CTA when user not entered start date in add education form ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.EndDate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })


    it('check that it Should not enable Next CTA when user not entered end date in add education form ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.Startdate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that it Should be disabled end date when user selected ongoing check box ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.contains('Ongoing').click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.disabled')
        cy.contains('Cancel').click()

    })

    it('check that user is able to move to next tab after filling the all input box ', () => {
        cy.get(selectors.userOnboarding.AddEducation).click()
        cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
        cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
        cy.get(selectors.userOnboarding.EducationType).type('Garduation')
        cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
        cy.get(selectors.userOnboarding.Startdate).click()
        cy.get(selectors.userOnboarding.Currentdate).click()
        cy.contains('Ongoing').click()
        cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.enabled').click()
    })



    it('Verify next button is in disabled mode if description not entered and not skills and technologies  ', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).should('be.visible')
        cy.get(selectors.userOnboarding.Submit).contains('Save').should('be.disabled')
    })

    it('Verify next button is in disabled mode if description entered and not skills and technologies  ', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).should('be.visible')
        cy.get(selectors.userOnboarding.Description).type(TestData.UserOnboarding.LoremIpsum)
        cy.get(selectors.userOnboarding.Submit).contains('Save').should('be.disabled')

    })

    it('check that Validation is showing when user add soft skills and save it', () => {
        cy.get(selectors.userOnboarding.SkillandTechnology).type("node")
        cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('NodeJS').click()
        cy.get(selectors.userOnboarding.SkillandTechnology).type("test")
        cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('API Testing').click()
        cy.get(selectors.userOnboarding.Description).type(TestData.UserOnboarding.LoremIpsum)
        cy.get(selectors.userOnboarding.Submit).contains('Save').click()
    })

    it('check that user is able to click on next button and redirect to brand screen', () => {
        cy.get(selectors.userOnboarding.nextButton1).click()
    })

})





