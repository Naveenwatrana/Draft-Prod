import selectors from '../selectors';
import TestData from '../fixtures/TestData.json';
import { sizes } from "../support/commands";
const StartJobDuration = ["As soon as possible, I am actively applying", "In the next year","Just casually looking but open to the right role","Not open to a new role right now"];

sizes.forEach((size) => {
    describe('Verify Preferences Job tab verification ' + size, () => {
        before(() => {
            if (!(size.match('Responsive'))) {
                cy.viewport(size);
            }
            cy.clearLocalStorage();
    
            //cy.viewport('macbook-13');
            cy.visit('/');
            cy.login("HarpratapCompany@yopmail.com", "Test@123");
            cy.wait(3000);
        })

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

       
        
        it('Should be able to verify When are you looking to start a new job? present with options mentioned', () => {
            cy.contains("Workspace").click();
            cy.get(selectors.Preferences.PreferenceTab).click();
            //cy.get(selectors.Preferences.PreferenceJobTab).click();
            cy.contains("When are you looking to start a new job?").should('be.visible');
            cy.contains("Let us know where you are in your job search.").should("be.visible");
            cy.VerifyDropDownValue(selectors.Preferences.JoiningPreference, selectors.Preferences.JoiningPreferenceListBoxValue, StartJobDuration);
            cy.get(selectors.Preferences.JoiningPreferenceListBoxValue).eq(1).click();
            cy.contains("Save").should('be.visible');

        })

        it('should be able to verify compensation and base salary field is present and accept only numeric value',()=>{
            cy.contains(TestData.JobPreference.BaseSalary_Heading).should('be.visible');
            cy.contains(TestData.JobPreference.BaseSalary_SubHeading).should('be.visible');
            cy.get(selectors.Preferences.BaseSalary).type(TestData.JobPreference.BaseSalary);
            cy.contains(TestData.JobPreference.Compensation_Heading).should('be.visible');
            cy.contains(TestData.JobPreference.Compensation_SubHeading).should('be.visible');
            cy.get(selectors.Preferences.Compasation).type(TestData.JobPreference.Compensation);
            cy.contains("Save").should('be.visible');
        })

        it('Should be able to verify What language can you work in? field is present and user can select multiple options of language from the list',()=>{
            cy.contains(TestData.JobPreference.Language_Heading).should('be.visible');
            cy.contains(TestData.JobPreference.Language_SubHeading).should('be.visible');
            cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                "Danish", "d");
            cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                    "Bengali", "b");
            cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                "Dutch", "d");
            cy.contains("Save").should('be.visible');
            
        })

        it('Should be able to verify What type of employment positions are you interested in?', ()=>{
            cy.contains(TestData.JobPreference.Position_Heading).should('be.visible')
            cy.contains(TestData.JobPreference.Employment_Position1).click()
            cy.contains(TestData.JobPreference.Employment_Position2).click()
            cy.contains("Save").should('be.visible');

        })

        it('Should be able to verify What work style(s) are you willing to consider?', ()=>{
            cy.contains(TestData.JobPreference.Workstyle_Heading).should('be.visible')
            cy.contains(TestData.JobPreference.Work_Style).click()
            cy.contains("Save").should('be.visible');

        })

        /*it('Should be able to verify Where would you like to work? and select upto 5 Locations', ()=>{
            cy.contains(TestData.JobPreference.Location_Heading).should('be.visible')
            cy.CountryDropDownValue(selectors.Preferences.LocationInput,selectors.Preferences.LocationListbox,
                 "London, UK", "london")
            cy.CountryDropDownValue(selectors.Preferences.LocationInput,selectors.Preferences.LocationListbox,
                 "Paris, France", "Paris") 
            cy.CountryDropDownValue(selectors.Preferences.LocationInput,selectors.Preferences.LocationListbox,
                 "Frankfurt, Germany", "f")
            cy.CountryDropDownValue(selectors.Preferences.LocationInput,selectors.Preferences.LocationListbox,
                 "Derby, UK", "der")
            cy.CountryDropDownValue(selectors.Preferences.LocationInput,selectors.Preferences.LocationListbox,
                 "New York, NY, USA", "n")
            cy.contains("Save").should('be.visible');
        }) */

        it('Should be able to verify Where could you work remotely from??and select upto 5 Region', ()=>{
           
            cy.get('[type="submit"]').contains('Save').click()

            

        })

    });
}); 