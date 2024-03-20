import selectors from '../selectors';
import TestData from '../fixtures/TestData.json';
import { sizes } from "../support/commands";
const RoleType = ["Individual contributor", "People manager"];
const PeopleReportToRange = ["1-10", "11-50", "51-100", "101-500", "500+"];
const WorkStyle = ["On-site", "Hybrid", "Remote"];
const RoleBasedInLocation = ["Americas (NA + LATAM)", "Asia-Pacific (APAC)", "Europe", "Europe, the Middle East and Africa (EMEA)", "Latin America (LATAM)", "North America (NA)", "Worldwide", "Austria (AUT)", "Australia (AUS)", "Canada (CAN)", "Belgium (BEL)", "Denmark (DNK)", "France (FRA)", "Germany (DEU)", "Hong Kong (HKG)", "Ireland (IRL)", "India (IND)", "Japan (JPN)", "Malaysia (MYS)", "Netherlands (NLD)", "New Zealand (NZL)", "Portugal (PRT)", "Singapore (SGP)", "Spain (ESP)", "Switzerland (CHE)", "United Arab Emirates (UAE)", "United States (US)", "United Kingdom (UK)"];
const Daysperweek = ["Occasionally", "Set office days per week"];
const JobRole = "AutomationTester_" + Math.floor((Math.random() * 100) + 1) + "_" + Math.floor((Math.random() * 100) + 1);

sizes.forEach((size) => {
    describe('Verify the What will you Do? option from the create job flow for device ' + size, () => {
        beforeEach(() => {
            if (!(size.match('Responsive'))) {
                cy.viewport(size);
            }
            cy.clearLocalStorage();
            cy.viewport('macbook-13');
            cy.visit('/');
            cy.login("HarpratapCompany@yopmail.com", "Test@123");
            cy.SwitchAccount()
            
        })

        Cypress.on('uncaught:exception', (err, runnable) => {
            
            return false
        })

        it('should be able to select the Role', () => {

            cy.get(selectors.createJob.jobRole).click({ force: true });
            cy.get(selectors.createJob.jobRole).type("Automation Tester");
            cy.SelectDropDownValue(selectors.createJob.functionalRoleInput, selectors.createJob.funtionalRoleListbox,
                TestData.WhatWillYouDo.FunctionalRole, "s");
            cy.get(selectors.createJob.nextbutton).contains('Next').click();
        })

        it('Should be able to verify what you will do section', () => {
            cy.CreateJobFirstPage(JobRole, TestData.WhatWillYouDo.FunctionalRole);
            cy.contains(TestData.WhatWillYouDo.SectionHeader).scrollIntoView()
            cy.contains(TestData.WhatWillYouDo.SectionHeader).should('be.visible');
            cy.contains(TestData.WhatWillYouDo.SectionTitle1).should('be.visible');
            cy.contains(TestData.WhatWillYouDo.SectionTitle2).should("be.visible");
            cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).should('be.visible');
            cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).click();
        })

        it("Should be able to verify all dropdown value in What Will You Do -->Add Responsibilities page", () => {
            
            cy.CreateJobFirstPage(JobRole, TestData.WhatWillYouDo.FunctionalRole);
            cy.contains(TestData.WhatWillYouDo.SectionHeader).scrollIntoView();
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

        })

        it("Should be able to verify when user select People Manager Role then HOw many People Report this Role? Field should be enabled", () => {
            
            cy.CreateJobFirstPage(JobRole, TestData.WhatWillYouDo.FunctionalRole);
            cy.contains(TestData.WhatWillYouDo.SectionHeader).scrollIntoView()
            cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).click();
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.RoleType, selectors.whatYouWillDo.RoleTypeListBoxValue,
                "People manager");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.PeopleRange, selectors.whatYouWillDo.PeopleRangeListBoxValue,
                "11-50");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.WorkStyle, selectors.whatYouWillDo.WorkStyleListBoxValue,
                "Remote");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.LocationAndCountires, selectors.whatYouWillDo.LocationAndCountiresValue,
                "Americas (NA + LATAM)");
            cy.get(selectors.whatYouWillDo.AddResponsibilities).click();
            cy.get(selectors.whatYouWillDo.AddResponsibilitiesInput).type("My responsibility");
            cy.contains("What location is this remote job restricted to?").click();
            cy.get(selectors.whatYouWillDo.SaveBtn).click();
            cy.get(selectors.whatYouWillDo.RoleTypeValue).should('have.text', "People manager");
            cy.get(selectors.whatYouWillDo.WorkStyleValue).should('have.text', "Remote");
            cy.get(selectors.whatYouWillDo.TotalPeopleManage).should('have.text', "11-50");
            cy.get(selectors.whatYouWillDo.LocationValue).should('have.text', "Americas (NA + LATAM)");
        })

        it("Should be able to verify when user select Individual contributor Role then How many People Report this Role? Field should not be enabled", () => {
           
            cy.CreateJobFirstPage(JobRole, TestData.WhatWillYouDo.FunctionalRole);
            cy.contains(TestData.WhatWillYouDo.SectionHeader).scrollIntoView()
            cy.contains(TestData.WhatWillYouDo.AddResponsibilityBtn).click();
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.RoleType, selectors.whatYouWillDo.RoleTypeListBoxValue,
                "Individual contributor");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.WorkStyle, selectors.whatYouWillDo.WorkStyleListBoxValue,
                "Remote");
            cy.SelectDropDownValueClick(selectors.whatYouWillDo.LocationAndCountires, selectors.whatYouWillDo.LocationAndCountiresValue,
                "Americas (NA + LATAM)");
            cy.get(selectors.whatYouWillDo.AddResponsibilities).click();
            cy.get(selectors.whatYouWillDo.AddResponsibilitiesInput).type("My responsibility");
            cy.contains("What location is this remote job restricted to?").click();
            cy.get(selectors.whatYouWillDo.SaveBtn).click();
            cy.get(selectors.whatYouWillDo.RoleTypeValue).should('have.text', "Individual contributor");
            cy.get(selectors.whatYouWillDo.WorkStyleValue).should('have.text', "Remote");
            cy.get(selectors.whatYouWillDo.LocationValue).should('have.text', "Americas (NA + LATAM)");
        })
       
    });
})