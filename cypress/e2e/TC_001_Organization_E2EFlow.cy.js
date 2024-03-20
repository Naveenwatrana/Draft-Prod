/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json';
import { sizes } from "../support/commands";
const RoleType = ["Individual contributor", "People manager"];
const PeopleReportToRange = ["1-10", "11-50", "51-100", "101-500", "500+"];
const WorkStyle = ["On-site", "Hybrid", "Remote"];
const RoleBasedInLocation = ["Americas (NA + LATAM)", "Asia-Pacific (APAC)", "Europe", "Europe, the Middle East and Africa (EMEA)", "Latin America (LATAM)", "North America (NA)", "Worldwide", "Austria (AUT)", "Australia (AUS)", "Canada (CAN)", "Belgium (BEL)", "Denmark (DNK)", "France (FRA)", "Germany (DEU)", "Hong Kong (HKG)", "Ireland (IRL)", "India (IND)", "Japan (JPN)", "Malaysia (MYS)", "Netherlands (NLD)", "New Zealand (NZL)", "Portugal (PRT)", "Singapore (SGP)", "Spain (ESP)", "Switzerland (CHE)", "United Arab Emirates (UAE)", "United States (US)", "United Kingdom (UK)"];
const Daysperweek = ["Occasionally", "Set office days per week"];
const JobRole = "AutomationTester_" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1);
before(() => {

    cy.clearLocalStorage();

})

beforeEach(() => {

    cy.viewport('macbook-13');

})

describe('Organization E2E flow', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that Organization E2E flow is working fine', () => {
        cy.login('jaydeep@yopmail.com', 'Test@123');
        cy.wait(5000);
        // Creaet Job
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.get(selectors.croncycleUserPermission.switchAccountsButton).should('be.visible').click();
        cy.contains('Paytm').should('be.visible').click();
        cy.wait(1000);
        cy.contains("Create").click({ force: true });
        cy.contains("Job").click();
        cy.get(selectors.createJob.jobRole).type("Automation Tester");
        cy.SelectDropDownValue(selectors.createJob.functionalRoleInput, selectors.createJob.funtionalRoleListbox,
            TestData.WhatWillYouDo.FunctionalRole, "s");
        cy.get(selectors.createJob.nextbutton).contains('Next').click();
        cy.contains('Add skills and technologies').click()
        cy.get('[data-cy="addSkillButton"]').click()
        cy.get(selectors.createJob.skillTechnologyInputbox).click().type("React")
        cy.get(selectors.createJob.skillTechnologylist).contains('React').click()
        cy.get('[data-cy="addSkillButton"]').click()
        cy.get(selectors.createJob.skillTechnologyInputbox).click().type("Node")
        cy.get(selectors.createJob.skillTechnologylist).contains('Node.js').click()
        cy.get(selectors.createJob.saveButton).click()
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
        cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).click();
        cy.get(selectors.whatYouWillDo.RoleType).should("be.visible");
        cy.VerifyDropDownValue(selectors.whatYouWillDo.RoleType, selectors.whatYouWillDo.RoleTypeListBoxValue, RoleType);
        cy.get(selectors.whatYouWillDo.RoleTypeListBoxValue).eq(1).click();
        cy.VerifyDropDownValue(selectors.whatYouWillDo.PeopleRange, selectors.whatYouWillDo.PeopleRangeListBoxValue, PeopleReportToRange);
        cy.get(selectors.whatYouWillDo.PeopleRangeListBoxValue).eq(1).click();
        cy.VerifyDropDownValue(selectors.whatYouWillDo.WorkStyle, selectors.whatYouWillDo.WorkStyleListBoxValue, WorkStyle);
        cy.get(selectors.whatYouWillDo.WorkStyleListBoxValue).last().click();
        cy.VerifyDropDownValue(selectors.whatYouWillDo.LocationAndCountires, selectors.whatYouWillDo.LocationAndCountiresValue, RoleBasedInLocation);
        cy.get(selectors.whatYouWillDo.LocationAndCountiresValue).first().click();
        cy.get(selectors.whatYouWillDo.AddResponsibilitiesInput).type("My responsibility");
        cy.get('body').click(0, 0);
        cy.get(selectors.whatYouWillDo.SaveBtn).click();
        cy.get(selectors.createOrganization.NextButton).click();
        cy.contains('Open Job').should('be.visible');

        //Verify the creaeted job is displaying in pending state
        cy.contains('Workspace').click();
        cy.contains('Jobs').should('be.visible').click();
        cy.contains('Pending').should('be.visible').click();
        cy.contains('Automation Tester').should('be.visible');

        //Edit the pending job
        cy.contains('Automation Tester').click();
        cy.contains('Edit snapshot').should('be.visible').click();
        cy.contains('Role').should('be.visible').click();
        cy.get(selectors.createJob.jobRole).clear();
        cy.get(selectors.createJob.jobRole).type('Sr. Automation Tester')
        cy.SelectDropDownValue(selectors.createJob.functionalRoleInput, selectors.createJob.funtionalRoleListbox,
            TestData.WhatWillYouDo.FunctionalRole, "b");
        cy.get(selectors.createJob.employementTypefield).click()
        cy.get(selectors.createJob.employementTypeListBox).contains("Part-time").click()
        cy.contains('Confirm').click();
        cy.contains('Salary').should('be.visible').click();
        cy.get(selectors.createJob.salaryFrom).clear().type("15000")
        cy.get(selectors.createJob.salaryTo).clear().type("25000")
        cy.contains('Confirm').click();
        cy.contains('Skills').should('be.visible').click();
        cy.contains('Add skill').should('be.visible').click();
        cy.get(selectors.createJob.skillTechnologyInputbox).click().type("Testing")
        cy.get(selectors.createJob.skillTechnologylist).contains('Agile Testing').click()
        cy.contains('Confirm').click();
        cy.contains('Experience').should('be.visible').click();
        cy.VerifyDropDownValue(selectors.whatYouWillDo.PeopleRange, selectors.whatYouWillDo.PeopleRangeListBoxValue, PeopleReportToRange);
        cy.get(selectors.whatYouWillDo.PeopleRangeListBoxValue).eq(2).click();
        cy.contains('Confirm').click();
        cy.contains('Location').should('be.visible').click();
        cy.VerifyDropDownValue(selectors.whatYouWillDo.WorkStyle, selectors.whatYouWillDo.WorkStyleListBoxValue, WorkStyle);
        cy.get(selectors.whatYouWillDo.WorkStyleListBoxValue).first().click();
        cy.SelectDropDownValue(selectors.whatYouWillDo.LocationRemote, selectors.whatYouWillDo.LocationRemoteValue,
            "London, UK", "London");
        cy.contains('Confirm').click();
        cy.contains('Save').click();
        cy.contains('Sr. Automation Tester')
        cy.contains('Part-time');
        cy.contains('$15,000 - $25,000');
        cy.contains('Agile Testing');
        cy.contains('On-site');
        cy.contains('London, UK');
        cy.contains('51 - 100');

        //Verify the open job is not displaying in pending state
        cy.contains('Open Job').click();
        cy.contains('Workspace').click({ force: true });
        cy.contains('Jobs').should('be.visible').click();
        cy.contains('Pending').should('be.visible').click();
        cy.contains('Sr. Automation Tester').should('not.exist');

        //Verify the open job is displaying in open state
        cy.contains('Open').should('be.visible').click();
        cy.contains('Sr. Automation Tester').should('be.visible');

        //Verify the open job is displaying in my profile
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible').click();
        cy.wait(1000);
        cy.contains('Jobs').should('be.visible').click({ force: true });
        cy.contains('Sr. Automation Tester').should('be.visible').click();
        cy.contains('Close Job').should('be.visible').click();
        cy.get('[data-cy="NohiredForThisRole"]').should('be.visible');
        cy.get('[data-cy="NohiredForThisRole"]').click({ force: true })
        cy.get('[data-cy="Close Job"]').should('be.visible').click();

        //Verify the closed job is displaying in open state
        cy.contains('Workspace').click({ force: true });
        cy.contains('Jobs').should('be.visible').click();
        cy.contains('Open').should('be.visible').click();
        cy.contains('Sr. Automation Tester').should('not.exist');

        //Verify the closed job is displaying in Closed state
        cy.contains('Closed').should('be.visible').click();
        cy.contains('Sr. Automation Tester').should('be.visible');

        //Verify the Delete job is working
        cy.contains('Sr. Automation Tester').click();
        cy.contains('Delete Job').should('be.visible').click();
        cy.contains('Yes, Delete').should('be.visible').click();

        //Verify the Deleted job is not displaying in closed state and my profile
        cy.contains('Closed').should('be.visible').click();
        cy.contains('Sr. Automation Tester').should('not.exist');
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible').click();
        cy.wait(1000);
        cy.contains('Jobs').should('be.visible').click({ force: true });
        cy.contains('Sr. Automation Tester').should('not.exist');

    })

})