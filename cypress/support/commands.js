// ***********************************************
import selectors from '../selectors';
import 'cypress-mailosaur'
import 'cypress-file-upload'
//import cypress from 'cypress';

// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add("signUpAndVerifyEmail", (userEmail) => {
    const serverId = Cypress.env('serverId');
    let verifyEmailLink;

    cy.visit('https://draft-uat.herokuapp.com/account/signup');
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.email).type(userEmail);
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.password).type('Test@123');
    cy.get(selectors.userSignUp.form.confirmPassword).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).type('Test@123');
    cy.get(selectors.userSignUp.form.TermsAndConditionsButton).click();
    cy.contains('Create Account').click();
    cy.contains('Email Sent').should('be.visible');

    cy.mailosaurGetMessage(serverId, {
        sentTo: userEmail
    }).then(email => {
        cy.log(email.html.links[0].href);
        verifyEmailLink = email.html.links[0].href;
        cy.visit(verifyEmailLink);
        //cy.wait(2000);
        // cy.contains("Sign in").should('be.visible')
        // cy.get(selectors.userLogin.form.email).clear().type(userEmail);
        // cy.get(selectors.userLogin.form.password).clear().type('Test@123');
        // cy.get(selectors.userLogin.form.button).click();
        // cy.wait(2000);
    })
})

Cypress.Commands.add("login", (email, password) => {
    cy.visit('/account/signin');
    //cy.get(selectors.userSignUp.form.button).first().click();
    //cy.get(selectors.userLogin.form.loginOption).click()
    cy.contains("Sign in").should('be.visible')
    cy.get(selectors.userLogin.form.email).clear().type(email);
    cy.get(selectors.userLogin.form.password).clear().type(password);
    cy.get(selectors.userLogin.form.button).click();
    //cy.wait(2000);
})

Cypress.Commands.add("onboarding", (email) => {
    cy.viewport('macbook-16');
    cy.url().should('eq', 'https://draft-uat.herokuapp.com/account/signin');

    cy.get(selectors.userLogin.form.email).clear().type(email);
    cy.get(selectors.userLogin.form.password).clear().type('Test@123');
    cy.get(selectors.userLogin.form.button).click();
    //cy.wait(2000);
    cy.url().should('eq', 'https://draft-uat.herokuapp.com/profile/onboarding');
    cy.contains('Create your profile').should('be.visible');

    cy.get(selectors.userOnboarding.firstName).type('Test');
    cy.get(selectors.userOnboarding.lastName).type('User');
    cy.get(selectors.userOnboarding.nextButton).should('be.enabled').click();
    cy.contains('Add details to your card').should('be.visible');
})

Cypress.Commands.add("onboardingFlow", () => {
    cy.viewport('macbook-16');
    //cy.wait(2000);
    cy.url().should('eq', 'https://draft-uat.herokuapp.com/profile/onboarding');
    cy.contains('Create your profile').should('be.visible');

    cy.get(selectors.userOnboarding.firstName).type('Test');
    cy.get(selectors.userOnboarding.lastName).type('User');
    cy.get(selectors.userOnboarding.nextButton).should('be.enabled').click();
    cy.wait(10000)
    cy.contains('Add details to your card').should('be.visible');
    cy.get(selectors.userOnboarding.skipButton).should('be.enabled').click();
    cy.get(selectors.userOnboarding.skipBioButton).should('be.visible').click();
    cy.get(selectors.userOnboarding.skipModalButton).should('be.visible').click();
    cy.get(selectors.userOnboarding.skipProjectButton).should('be.visible').click();
    cy.get(selectors.userOnboarding.skipModalButton).should('be.visible').click();
    cy.get(selectors.userOnboarding.editProfileButton).should('be.visible').click();
})


Cypress.Commands.add("signUpFromAPI", (email) => {
    cy.request('POST', 'https://production-draft-api.herokuapp.com/api/v1/signup', { email: `${email}`, password: 'Admin@123' })/*.then(
        (response) => {
            //expect(response.status).to.eq(201);
        } */
   // ).then(() => {
        // cy.request('POST', 'https://production-draft-api.herokuapp.com/api/v1/email/verify', { email: `${email}` })/*.then(
        //     (response) => {
        //        // expect(response.status).to.eq(200);
        //     }
        // ) 
    // })*/

})





Cypress.Commands.add("VerifyEmail", (email) => {
    // cy.request('POST', 'https://production-draft-api.herokuapp.com/api/v1/signup', { email: `${email}`, password: 'Admin@123' })/*.then(
        // (response) => {
        //     //expect(response.status).to.eq(201);
        // } */
   // ).then(() => {
        cy.request('POST', 'https://production-draft-api.herokuapp.com/api/v1/email/verify', { email: `${email}` })/*.then(
            (response) => {
               // expect(response.status).to.eq(200);
            }
        ) 
    })*/

})

Cypress.Commands.add("waitForAPI", (httpMethod, URI) => {
    cy.intercept(`${httpMethod}`, `${URI}`).as('api');
    cy.wait('@api');
})
//


// File Upload 
Cypress.Commands.add("FileUpload",(fileName) =>{
    // cy.get("input[type='file']").invoke("attr","style","display:block");
    // const filepath = "cypress/fixtures/"+fileName;
    // cy.get("input[type='file']").selectFile(filepath)
    // cy.get("input[type='file']").invoke("attr","style","display:none");
    // cy.get(or.AttachedFilePage.UploadedFileName).should('contains.text',fileName)
    cy.get("input[type='file']").attachFile(fileName);
})

Cypress.Commands.add("SelectDropDownValue",(dropDownInput,dropdownList,value,searchText) =>{
    cy.get(dropDownInput).click();
    cy.get(dropDownInput).type(searchText);
    cy.wait(2000)
    cy.get(dropdownList).contains(value).click()
})
Cypress.Commands.add("SelectDropDownValueClick",(dropDownInput,dropdownList,value) =>{
    cy.get(dropDownInput).click()
    cy.get(dropdownList).contains(value).click()
})
Cypress.Commands.add("VerifyDropDownValue",(inputbox,listbox,ValurArray) =>{
    cy.get(inputbox).click();
    cy.get(listbox).each(($ele, i) => {
        expect($ele).to.have.text(ValurArray[i]);
    })
})

Cypress.Commands.add("CountryDropDownValue",(dropDownInput,dropdownList,value,searchText) =>{
    cy.get(dropDownInput).click();
    cy.get(dropDownInput).type(searchText);
    cy.wait(2000)
    cy.get(dropdownList).contains(value).click()
})

Cypress.Commands.add("RegionDropDownValue",(dropDownInput,dropdownList,value,searchText) =>{
    cy.get(dropDownInput).click();
    cy.get(dropDownInput).type(searchText);
    cy.wait(2000)
    cy.get(dropdownList).contains(value).click()
})

Cypress.Commands.add("CreateJobFirstPage",(JobRole,FunctionalRole)=> {
    cy.get(selectors.createJob.jobRole).click({force:true});
    cy.get(selectors.createJob.jobRole).type(JobRole);
    //Select value in functional dropdown
    cy.SelectDropDownValue(selectors.createJob.functionalRoleInput,selectors.createJob.funtionalRoleListbox,
      FunctionalRole,"s");
    cy.get(selectors.createJob.nextbutton).contains('Next').click();
})

Cypress.Commands.add("ElementToVisible",() =>{
    cy.wait(5000)
})

Cypress.Commands.add("SwitchAccount",() =>{
    cy.get(selectors.croncycleUserPermission.profileIcon).click();
    
    cy.get(selectors.croncycleUserPermission.switchAccountsButton).click();
    
    cy.get(selectors.croncycleUserPermission.b2bCompanys).click();
    cy.wait(1000);
    cy.contains("Create").click({force:true});
    cy.contains("Job").click();
})
Cypress.Commands.add("AddImage",() =>{
    const largeImage = 'Hiring1.png'
    cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
    cy.get('body').click(0,0)
})
Cypress.Commands.add("AddnewImage",() =>{
    const Image = 'Jobimage.jpg'
    cy.contains('Browse').attachFile(Image, { subjectType: 'drag-n-drop' })
    cy.get('body').click(0,0)
})





Cypress.Commands.add('uploadFile', (fileNamePath, fileName, fileType = 'text/comma-separated-values', selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileNamePath, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = subject[0]
                const testFile = new File([blob], fileName, {
                    type: fileType
                })
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(testFile)
                el.files = dataTransfer.files
            })
    })
    
    })

    export const sizes =
    [
     //'Responsive',
     //'iphone-se2',
    // 'samsung-s10',
     "macbook-13",
     //'ipad-2'
 ]


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

