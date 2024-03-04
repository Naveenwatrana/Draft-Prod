import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let emailAddress;
let password = "Admin@123"

before(() => {
    //cy.viewport('macbook-13');
   cy.clearLocalStorage();
           
})
beforeEach(() => {
    //cy.viewport('macbook-13');
   // cy.clearLocalStorage();
           
})

describe('User profile add block test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Check that User is able to see Create options', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.wait(10000)
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

    it('Check that user is able to redirect to Brand tab  screen ', () => {

        cy.visit("https://www.thedraft.io/pro/harpratap-singh/resume")
        cy.get('[data-cy="add-Side projects"]' ).click()
        cy.contains('Project Block').should('be.visible')  
    })


    it('check that user is next button is disable when the user left Project title fileds', () =>{

        cy.get('[data-cy="projectTitle"]').type('   ')
        
        cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing Project').click()
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left date fileds', () =>{

        cy.get('[data-cy="add-Side projects"]' ).click()

        cy.get('[data-cy="projectTitle"]').type('The draft')
        
        /*cy.get('[data-cy="resume-start-date"]').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing Project').click()*/
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })





    









})