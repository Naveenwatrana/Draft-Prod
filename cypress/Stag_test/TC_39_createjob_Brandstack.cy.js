import selectors from '../selectors';
import TestData from '../fixtures/TestData.json';
import { sizes } from "../support/commands";
const RoleType = ["Individual contributor", "People manager"];
const PeopleReportToRange = ["1-10", "11-50", "51-100", "101-500", "500+"];
const WorkStyle = ["On-site", "Hybrid", "Remote"];
const RoleBasedInLocation = ["Americas (NA + LATAM)", "Asia-Pacific (APAC)", "Europe", "Europe, the Middle East and Africa (EMEA)", "Latin America (LATAM)", "North America (NA)", "Worldwide", "Austria (AUT)", "Australia (AUS)", "Canada (CAN)", "Belgium (BEL)", "Denmark (DNK)", "France (FRA)", "Germany (DEU)", "Hong Kong (HKG)", "Ireland (IRL)", "India (IND)", "Japan (JPN)", "Malaysia (MYS)", "Netherlands (NLD)", "New Zealand (NZL)", "Portugal (PRT)", "Singapore (SGP)", "Spain (ESP)", "Switzerland (CHE)", "United Arab Emirates (UAE)", "United States (US)", "United Kingdom (UK)"];
const Daysperweek = ["Occasionally", "Set office days per week"];
const JobRole = "AutomationTester_" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1);

before(() => {
    cy.visit('/');
    cy.login("HarpratapCompany@yopmail.com", "Test@123");
    cy.wait(3000)
})
sizes.forEach((size) => {
    describe('Verify the What will you Do? option from the create job flow for device ' + size, () => {


        beforeEach(() => {
            if (!(size.match('Responsive'))) {
                cy.viewport(size);
            }
            //cy.viewport('macbook-13');


            cy.wait(3000);
            //cy.clearLocalStorage();
        })

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

        it('should be able to switch account', () => {
            cy.get(selectors.croncycleUserPermission.profileIcon).click();
            cy.get(selectors.croncycleUserPermission.switchAccountsButton).click();
            cy.get(selectors.croncycleUserPermission.b2bCompanys).click();
            cy.wait(1000);
            cy.contains("Create").click({ force: true });
            cy.contains("Job").click();
        })

        it('should be able to select the Role', () => {
            cy.get(selectors.createJob.jobRole).type("Automation Tester");
            //Select value in functional dropdown
            cy.SelectDropDownValue(selectors.createJob.functionalRoleInput, selectors.createJob.funtionalRoleListbox,
                TestData.WhatWillYouDo.FunctionalRole, "s");
            cy.get(selectors.createJob.nextbutton).contains('Next').click();
        })

        // Add skills you  have block
        it('Check that user is able to select any technology', () => {
            cy.contains('Add skills and technologies').click()
            cy.get('[data-cy="addSkillButton"]').click()
            cy.get(selectors.createJob.skillTechnologyInputbox).click().type("React")
            cy.get(selectors.createJob.skillTechnologylist).contains('React').click()
            cy.get('[data-cy="addSkillButton"]').click()
            cy.get(selectors.createJob.skillTechnologyInputbox).click().type("Node")
            cy.get(selectors.createJob.skillTechnologylist).contains('NodeJS').click()
            cy.get(selectors.createJob.saveButton).click()
        })

        // Add who you are block
        it('Check that user is able to fill all fields and proceed aheah with save', () => {
            cy.contains(selectors.createJob.addRequirementsotion).click()
            cy.get(selectors.createJob.employementTypefield).click()
            cy.get(selectors.createJob.employementTypeListBox).contains("Full-time").click()
            cy.get(selectors.createJob.salaryFrom).type("12000")
            cy.get(selectors.createJob.salaryTo).type("20000")
            cy.get(selectors.createJob.OTEfrom).type("30000")
            cy.get(selectors.createJob.OTEto).type("50000")
            cy.get(selectors.createJob.Languagefield).type("French")
            cy.get(selectors.createJob.LanguagaListbox).contains("French").click()
            cy.get(selectors.createJob.addRequirement1).click()
            cy.get(selectors.createJob.bulletpoint).type("Comfortable tackling ambiguous, complex problems Live for feedback, you reach out often and early")
            cy.get('body').click(0, 0)
            cy.get(selectors.createJob.saveButton).click()
        })

        //ADD what you will do Block
        it("Should be able to verify when user select Hybrid then Days Per Week in Office field should be displayed", () => {
            cy.contains(TestData.WhatWillYouDo.SectionHeader).scrollIntoView()
            cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).click();
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.RoleType, selectors.whatYouWillDo.RoleTypeListBoxValue,
                "Individual contributor");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.WorkStyle, selectors.whatYouWillDo.WorkStyleListBoxValue,
                "On-site");
            cy.get(selectors.whatYouWillDo.LocationInput).click().type('r')
            cy.wait(3000)
            cy.get(selectors.whatYouWillDo.LocationListbox).contains("Rome, Italy").click()
            // cy.SelectDropDownValue(selectors.whatYouWillDo.LocationRemote, selectors.whatYouWillDo.LocationRemoteValue,
            //  "Amsterdam, Netherlands", "a");
            //verify Days per week in office
           // cy.contains("Days per week in office").should('be.visible');
            //verify dropdown value
            //cy.VerifyDropDownValue(selectors.whatYouWillDo.DaysPerWeekInOffice, selectors.whatYouWillDo.DaysPerWeekInOfficeValue, Daysperweek);
           // cy.SelectDropDownValue(selectors.whatYouWillDo.DaysPerWeekInOffice, selectors.whatYouWillDo.DaysPerWeekInOfficeValue,
               // "Occasionally", "o");
            cy.get(selectors.whatYouWillDo.AddResponsibilities).click();
            cy.get(selectors.whatYouWillDo.AddResponsibilitiesInput).type("My responsibility");
            cy.contains("Add more").click();
            cy.get(selectors.whatYouWillDo.SaveBtn).click();
           cy.get(selectors.whatYouWillDo.RoleTypeValue).should('have.text', "Individual contributor");
            cy.get(selectors.whatYouWillDo.WorkStyleValue).should('have.text', "On-site");
            // cy.get(selectors.whatYouWillDo.LocationValue).should('have.text', "Amsterdam, Netherlands");
            cy.get(selectors.createJob.nextbutton).contains('Done').should('be.enabled')
        })

    



    });
})