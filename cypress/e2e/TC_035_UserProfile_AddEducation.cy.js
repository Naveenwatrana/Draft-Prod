import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let emailAddress;
let password = "Admin@123"

before(() => {
    //cy.viewport('macbook-13');
   cy.clearLocalStorage();
           
})

    beforeEach(() => {
    
        //cy.clearLocalStorage();
           
    

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
        cy.get('[data-cy="add-Education"]' ).click()
        cy.contains('Education Block').should('be.visible')  
    })

    it('check that user is next button is disable when the user left Institution name fileds', () =>{

        cy.get('#educationType').type('Garduation')
        cy.get('#fieldOfStudy').type('Engineering')

        cy.get('#startDate').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing').click()
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left Education type fileds', () =>{

        cy.get('[data-cy="add-Education"]' ).click()
        cy.get('#institutionName').type('Havard Unversity')
        cy.get('#fieldOfStudy').type('Engineering')

        cy.get('#startDate').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing').click()
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left Field of Study fileds', () =>{

        cy.get('[data-cy="add-Education"]' ).click()
        cy.get('#institutionName').type('Havard Unversity')
        cy.get('#educationType').type('Garduation')
        
        cy.get('#startDate').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing').click() 
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })

    it('check that user is next button is disable when the user left the date field', () =>{

        cy.get('[data-cy="add-Education"]' ).click()
        cy.get('#institutionName').type('Havard Unversity')
        cy.get('#educationType').type('Garduation')
        cy.get('#fieldOfStudy').type('Engineering')
        cy.get('[type="submit"]').contains('Next').should('be.disabled')
        cy.contains('Cancel').click()
    })


    it('check that user is able to move to next tab after filling the all fields ', () =>{

        cy.get('[data-cy="add-Education"]' ).click()
        cy.get('#institutionName').click().type('Chitkara University')
        cy.get('#react-select-institutionName-listbox').contains('Chitkara University').click()
        cy.get('#educationType').type('Garduation')
        cy.get('#fieldOfStudy').type('Engineering')

        cy.get('#startDate').click()
        cy.get('[aria-current="date"]').click()
        cy.contains('Ongoing').click() 
        cy.get('[type="submit"]').contains('Next').should('be.enabled').click()
       
    })

    
    it('check that Save button is disable when no skill is selected', () =>{

        cy.get('[type="submit"]').contains('Save').should('be.disabled')
       
    })

    it('check that Validation is showing when user add soft skills and save it', () =>{

        

        cy.get('#skillsAndTechnologiesUsed').type("node")
        cy.wait(6000)
       


    cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('NodeJS').click()

    cy.get('#description').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry')

    cy.get('[type="submit"]').contains('Save').click()





})


it('check that Delete box model appear when the user clicks on delete button ', () =>{
    cy.reload()
    cy.viewport('macbook-13');
    
    cy.contains("Chitkara University").trigger('mouseover')

    cy.get('[data-cy="handleDeleteEducation"]').eq(0).click({force: true})
    cy.contains('Delete Education').should('be.visible')
    cy.get('[data-cy="deleteCancel"]').click()
   
})

it('check that when teh user clicks on cancel otion on box model then it comes back', () =>{
    cy.viewport('macbook-13');
    cy.contains("Chitkara University").trigger('mouseover')

    cy.get('[data-cy="handleDeleteEducation"]').eq(0).click({force: true})
    cy.contains('Delete Education').should('be.visible')
    cy.get('[data-cy="deleteCancel"]').click()
   
})

it('check that when the user select the delete then it delete the education ', () =>{
    cy.viewport('macbook-13');
    cy.contains("Chitkara University").trigger('mouseover')

    cy.get('[data-cy="handleDeleteEducation"]').eq(0).click({force: true})
    cy.contains('Delete Education').should('be.visible')
    cy.get('[data-cy="deleteBlock"]').click()
    cy.get('.Toastify__toast-body > div').should('be.visible')
   
})





})