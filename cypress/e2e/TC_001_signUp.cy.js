/// <reference types="Cypress" />
import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

const serverDomain = Cypress.env('serverDomain');
const dayjs = require('dayjs');
let emailAddress;
let password = "Test@123";


before(() => {

  cy.clearLocalStorage();

})

describe('Sign-Up Test cases', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
  it('Check that it is redirect to sign-up page', () => {
    cy.visit('/account/signup');
    cy.get(selectors.userSignUp.form.checkBox).siblings('span').first().click();
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.EnterEmail).should('be.visible');
  })

  it('Validation on blank space on email and password field', () => {
    cy.get(selectors.userSignUp.form.email).type('        ');
    cy.get(selectors.userSignUp.form.password).type('     ');
    cy.get(selectors.userSignUp.form.confirmPassword).type("      ");
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.whiteSpace).should('be.visible');
  })
  it('Validation on Special character on email and password field', () => {
    cy.get(selectors.userSignUp.form.email).clear()
    cy.get(selectors.userSignUp.form.password).clear()
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.SpecialCharUsername);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.SpecialCharPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.SpecialCharPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.MustvalidEmail).should('be.visible');
  })

  it('Validation on only Numerical character on email and password field', () => {
    cy.get(selectors.userSignUp.form.email).clear()
    cy.get(selectors.userSignUp.form.password).clear()
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.NumericalUsername);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.NumericalPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.NumericalPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.MustvalidEmail).should('be.visible');
  })

  it('Check that without checkbox of T&C and with valid data - try to signup should show error message on UI', () => {
    cy.get(selectors.userSignUp.form.email).clear()
    cy.get(selectors.userSignUp.form.password).clear()
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.TestUser1);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.checkBox).siblings('span').first().click();
    cy.get(selectors.userSignUp.form.signUpButton).click();
  })

  it('Check that validation is showing when the user left the email field', () => {
    cy.get(selectors.userSignUp.form.email).clear()
    cy.get(selectors.userSignUp.form.password).clear()
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.EnterEmail).should('be.visible');
  })
  it('Check that validation on wrong email', () => {
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.WrongEmail);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.MustvalidEmail).should("be.visible");
  })

  it('Check that validation is showing when the user left the password field ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.TestUser2);
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.PasswordRequried).should('be.visible');
  })

  it('Check that validation is showing on wrong password on confirm filed ', () => {
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.confirmPassword).clear();
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.PaswwordnotMatched).should('be.visible');
  })

  it('Check that validation is showing when the user enter less than 8 char ', () => {
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.LessPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.LessPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.MinimumCharacter).should('be.visible');
  })

  it('Check that validation is showing when the user enter only Capital latters in the password field ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
   
    cy.get(selectors.userSignUp.form.password).clear();
    
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.TestUser2);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.CapsPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.CapsPassword);
    cy.get(selectors.userSignUp.form.checkBox).siblings('span').first().click();
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.get(selectors.userSignUp.form.signUpValidation).should('be.visible');
  })

  it('Check that validation is showing when the user enter only Spacial latters in the password field ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.TestUser2);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.SpecialCharPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.SpecialCharPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.get(selectors.userSignUp.form.signUpValidation).should('be.visible');
  })

  it('Check that validation is showing when the user enter only Numerical latters in the password field ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.TestUser2);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.NumericalPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.NumericalPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.get(selectors.userSignUp.form.signUpValidation).should('be.visible');
  })

  it('Check that validation is showing on wrong password on confirm filed ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.Password);
    cy.get(selectors.userSignUp.form.confirmPassword).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.WrongPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.contains(TestData.SignUp.PaswwordnotMatched).should('be.visible');
  });

  it('Check that validation is showing for existing user ', () => {
    cy.get(selectors.userSignUp.form.email).clear();
    cy.get(selectors.userSignUp.form.password).clear();
    cy.get(selectors.userSignUp.form.confirmPassword).clear()
    cy.get(selectors.userSignUp.form.email).type(TestData.SignUp.ExistingUser);
    cy.get(selectors.userSignUp.form.password).type(TestData.SignUp.ExistingUserPassword);
    cy.get(selectors.userSignUp.form.confirmPassword).type(TestData.SignUp.ExistingUserPassword);
    cy.get(selectors.userSignUp.form.signUpButton).click();
    cy.get(selectors.userSignUp.form.signUpValidation).should('be.visible');
  })
 
})
