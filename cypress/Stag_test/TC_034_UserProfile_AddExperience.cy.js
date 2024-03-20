/// <reference types="Cypress" />

import selectors from '../selectors'
before(() => {

    cy.clearLocalStorage();

})

beforeEach(() => {
    cy.viewport('macbook-13');
})

describe('User profile add block test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that User is able to see Create options', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
        cy.contains('My Profile').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');

    })

    it('Check that user is able to redirect to My profile screen ', () => {
        cy.contains('My Profile').click()
        cy.contains('Brand').should('be.visible')
        cy.contains('Resume').should('be.visible')
    })

    it('Check that user is able to redirect to Resume tab  screen ', () => {
        cy.visit("https://www.thedraft.io/pro/harpratap-singh/resume")
        cy.get('[data-cy="add-Work experience"]').click()
        cy.contains('Experience Block').should('be.visible')

    })

    it('check that user is next button is disable when the user enters empty Role fileds', () => {

        cy.get('[data-cy="projectTitle"]').type('      ')
        cy.get('#functionalRole').type('t')
        cy.get('#react-select-functionalRole-listbox').contains("project manager").click()
        cy.get('#organisationName').type('f')
        cy.get('#react-select-organisationName-listbox').contains("Microsoft").click()
        cy.get('#employmentType').click()
        cy.get('#react-select-employmentType-listbox').contains("Full-time").click()
        cy.get('#location').click().type('Texas')
        cy.get('#react-select-location-listbox').contains("Texas").click()
        cy.get('#locationType').click()
        cy.get('#react-select-locationType-listbox').contains("On-site").click()
        cy.get('#roleType').click()
        cy.get('#react-select-roleType-listbox').contains("Individual contributor").click()
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing project').click()
        cy.get('[data-cy="next"]').should('be.disabled')
        cy.get('[data-cy="cancel"]').click()
    })

    it('check that user is next button is disable when the user left the Functional role fileds', () => {

        cy.get('[data-cy="add-Work experience"]').click()
        cy.get('[data-cy="projectTitle"]').type('The draft')
        cy.get('#organisationName').type('f')
        cy.get('#react-select-organisationName-listbox').contains("Microsoft").click()
        cy.get('#employmentType').click()
        cy.get('#react-select-employmentType-listbox').contains("Full-time").click()
        cy.get('#location').click().type("Texas")
        cy.get('#react-select-location-listbox').contains("Texas").click()
        cy.get('#locationType').click()
        cy.get('#react-select-locationType-listbox').contains("On-site").click()
        cy.get('#roleType').click()
        cy.get('#react-select-roleType-listbox').contains("Individual contributor").click()
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing project').click()
        cy.get('[data-cy="next"]').should('be.disabled')
        cy.get('[data-cy="cancel"]').click()
    })


    it('check that user is next button is disable when the user enters empty Organization name fileds', () => {

        cy.get('[data-cy="add-Work experience"]').click()
        cy.get('[data-cy="projectTitle"]').type('The draft')
        cy.get('#functionalRole').type('t')
        cy.get('#react-select-functionalRole-listbox').contains("project manager").click()
        cy.get('#employmentType').click()
        cy.get('#react-select-employmentType-listbox').contains("Full-time").click()
        cy.get('#location').click().type("Texas")
        cy.get('#react-select-location-listbox').contains("Texas").click()
        cy.get('#locationType').click()
        cy.get('#react-select-locationType-listbox').contains("On-site").click()
        cy.get('#roleType').click()
        cy.get('#react-select-roleType-listbox').contains("Individual contributor").click()
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing project').click()
        cy.get('[data-cy="next"]').should('be.disabled')
        cy.get('[data-cy="cancel"]').click()
    })


    it('Check that when there is no result found in the field then it shows the validation message ', () => {
        cy.get('[data-cy="add-Work experience"]').click()
        cy.contains('Experience Block').should('be.visible')
        cy.get('#functionalRole').type('tdsfdsfsd')
        cy.get('#react-select-functionalRole-listbox').contains("No options").should('be.visible')
        cy.get('#employmentType').type("bsmsbdnm")
        cy.get('#react-select-employmentType-listbox').contains("No options").should('be.visible')
        cy.get('#location').type("bsmsbdnm")
        cy.get('#react-select-location-listbox').contains("No options").should('be.visible')
        cy.get('#locationType').type("bsmsbdnm")
        cy.get('#react-select-locationType-listbox').contains("No options").should('be.visible')
        cy.get('#roleType').type("bsmsbdnm")
        cy.get('#react-select-roleType-listbox').contains("No options").should('be.visible')
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing project').click()
        cy.get('[data-cy="next"]').should('be.disabled')
        cy.get('[data-cy="cancel"]').click()

    })


    it('Check that user is able to go to second step after filling the first form ', () => {

        cy.get('[data-cy="add-Work experience"]').click()
        cy.get('[data-cy="projectTitle"]').type('The Draft')
        cy.get('#functionalRole').type('t')
        cy.get('#react-select-functionalRole-listbox').contains("project manager").click()
        cy.get('#organisationName').type('f')
        cy.get('#react-select-organisationName-listbox').contains("Microsoft").click()
        cy.get('#employmentType').click()
        cy.get('#react-select-employmentType-listbox').contains("Full-time").click()
        cy.get('#location').click().type("Texas")
        cy.get('#react-select-location-listbox').contains("Texas").click()
        cy.get('#locationType').click()
        cy.get('#react-select-locationType-listbox').contains("On-site").click()
        cy.get('#roleType').click()
        cy.get('#react-select-roleType-listbox').contains("Individual contributor").click()
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing project').click()
        cy.get('[data-cy="next"]').should('be.enabled').click()

    })

    it('Check that user is able to redirect to fill the skills and technology  ', () => {
       cy.get('#skillsAndTechnologiesUsed').type("node")
        cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('NodeJS').click()
        cy.get('#skillsAndTechnologiesUsed').type("test")
        cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('API Testing').click()
        cy.get('#description').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry')
        cy.get('[type="submit"]').contains('Save').click()

    })

    it('check that Delete box model appear when the user clicks on delete button ', () => {
        cy.reload()
        cy.viewport('macbook-13');
        cy.contains("The Draft").trigger('mouseover')
        cy.get('[data-cy="handleDeleteExperience"]').eq(0).click({ force: true })
        cy.contains('Delete Experience').should('be.visible')
        cy.get('[data-cy="deleteCancel"]').click()

    })

    it('check that when teh user clicks on cancel otion on box model then it comes back', () => {
        cy.viewport('macbook-13');
        cy.contains("The Draft").trigger('mouseover')
        cy.get('[data-cy="handleDeleteExperience"]').eq(0).click({ force: true })
        cy.contains('Delete Experience').should('be.visible')
        cy.get('[data-cy="deleteCancel"]').click()

    })

    it('check that when the user select the delete then it delete the education ', () => {
        cy.viewport('macbook-13');
        cy.contains("The Draft").trigger('mouseover')
        cy.get('[data-cy="handleDeleteExperience"]').eq(0).click({ force: true })
        cy.contains('Delete Experience').should('be.visible')
        cy.get('[data-cy="deleteBlock"]').click()
        cy.get('.Toastify__toast-body > div').should('be.visible')

    })

})