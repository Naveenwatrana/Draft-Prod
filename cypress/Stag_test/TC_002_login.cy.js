/// <reference types="Cypress" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
const userName = Cypress.env('signTestUserName');
const userPassword = Cypress.env('signTestPassword');

describe('Login Test cases', function () {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})


  before(() => {
    cy.clearLocalStorage();
  })

  beforeEach(() => {
    cy.viewport('macbook-16');
  })

  it('Check that it is redirect to Login page', function () {
    cy.visit('/account/signin');
    cy.contains("Sign in").should('be.visible')
  })

  it('Check the Validation on Empty Credetials', function () {
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.EnterEmail) .should('be.visible')
    cy.contains(TestData.Login.PasswordRequried).should('be.visible')
  })

  it("Check the Validation when the account isn't confirm", function () {
    cy.get(selectors.userLogin.form.email).type(TestData.Login.TestUser1)
    cy.get(selectors.userLogin.form.password).type(userPassword)
    cy.get(selectors.userLogin.form.button).click()
    cy.get(selectors.userLogin.form.LoginValidation).should('be.visible')
  })

  it('Check the Validation is showing on empty Email', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.password).type(TestData.Login.Password)
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.EnterEmail).should('be.visible')
    cy.reload()
  })

  it('Check the Validation is showing on empty password', function () {
    cy.get(selectors.userLogin.form.email).type(userName)
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.PasswordRequried).should('be.visible')
  })

  it('Check the Validation is showing on wrong Email', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.email).type(TestData.Login.WrongEmail)
    cy.get(selectors.userLogin.form.password).type(userPassword)
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.MustvalidEmail).should('be.visible')
  })
  it('Check the Validation is showing on wrong Password', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.email).type(TestData.Login.TestUser1)
    cy.get(selectors.userLogin.form.password).type(TestData.Login.WrongPassword)
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.IncorrectValidation).should('be.visible')
  })

  it('Check the user Should not login when email or password is not registered', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.email).type('Test_accountacc@yopmail.com')
    cy.get(selectors.userLogin.form.password).type('Test@abc')
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.IncorrectValidation).should('be.visible')
  })


  it('Check the user Should not login when email and password contains blank spaces', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.email).type('      ')
    cy.get(selectors.userLogin.form.password).type('      ')
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.IncorrectValidation).should('be.visible')
  })


  it('Check the user Should not login when email and password contains special characters', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.email).type(TestData.Login.SpecialCharUsername)
    cy.get(selectors.userLogin.form.password).type(TestData.Login.SpecialCharPassword)
    cy.get(selectors.userLogin.form.button).click()
    cy.contains(TestData.Login.IncorrectValidation).should('be.visible')
  })

  it('Check the  email not verified error displayed if logged in with not verified user', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.email).type("Unverifiedaccount@yopmail.com")
    cy.get(selectors.userLogin.form.password).type("Test@123")
    cy.get(selectors.userLogin.form.button).click()
    cy.get(selectors.userLogin.form.LoginValidation).should('be.visible')
  })

  it('Check with the right Credentials', function () {
    cy.get(selectors.userLogin.form.email).clear()
    cy.get(selectors.userLogin.form.email).type(userName)
    cy.get(selectors.userLogin.form.password).clear()
    cy.get(selectors.userLogin.form.password).type(userPassword)
    cy.get(selectors.userLogin.form.button).click()

  })


})
