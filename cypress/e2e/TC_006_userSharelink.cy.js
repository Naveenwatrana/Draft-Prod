/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'
let userName = Cypress.env('JD_UserName');
let password = Cypress.env('JD_Password');
let longText = Cypress.env('userBioText');

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

    it('Check that User is able to see Share link option', () => {
        cy.login(userName, password);
        cy.ElementToVisible()
        cy.contains(TestData.Sharelink.createText).click();
        cy.get(selectors.shareLink.ShareLinkOption).should('be.visible').click();
    })

    it('Check that User is able to see Share link input box and all respective buttons', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).should('be.visible');
        cy.get(selectors.shareLink.backArrowBtn).should('be.visible');
        cy.get(selectors.shareLink.nextBtn).should('be.visible');
        cy.get(selectors.shareLink.discardBtn).should('be.visible')
    })

    it('Check that Next button is disabled when user enters invalid link', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.InvalidLink);
        cy.get(selectors.shareLink.nextBtn).should('be.disabled');
    })
    
    it('Check that Next button is disabled when user enters only space', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).clear();
        cy.get(selectors.shareLink.ShareLinkInputBox).type('      ');
        cy.get(selectors.shareLink.nextBtn).should('be.disabled');
    })
    
    it('Check that Next button is disabled when user enters link without domain after dot', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).clear();
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link3);
        cy.get(selectors.shareLink.nextBtn).should('be.disabled');
    })
    
    it('Check that Next button is disabled until user not enter the link', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).clear();
        cy.get(selectors.shareLink.nextBtn).should('be.disabled');
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link1);
        cy.get(selectors.shareLink.nextBtn).should('be.enabled');
    })

    it('Check that user is redireceted to feed page when click on back or discard button and entered data is removed', () => {
        cy.get(selectors.shareLink.backArrowBtn).click();
        cy.contains(TestData.Sharelink.createText).should('be.visible').click();
        cy.get(selectors.shareLink.ShareLinkOption).should('be.visible').click();
        cy.get(selectors.shareLink.ShareLinkInputBox).should('be.empty');
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link1);
        cy.get(selectors.shareLink.discardBtn).click();
        cy.contains(TestData.Sharelink.createText).should('be.visible').click();
        cy.get(selectors.shareLink.ShareLinkOption).should('be.visible').click();
        cy.get(selectors.shareLink.ShareLinkInputBox).should('be.empty');
    })

    it('Check that user is redireceted to link preview screen', () => {
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link1);
        cy.get(selectors.shareLink.nextBtn).click();
        cy.get(selectors.shareLink.linkPreviewImage).should('be.visible');
        cy.get(selectors.shareLink.linkPreviewTitle).should('be.visible');
    })

    it('Check that share button is disabled when description and tag are empty', () => {
        cy.get(selectors.shareLink.shareBtn).should('be.disabled');
    })

    it('Check that share button is disabled when description is empty', () => {
        cy.get(selectors.shareLink.tagTopics).type('Test');
        cy.get(selectors.shareLink.tagList).contains('A/B Testing').click();
        cy.get(selectors.shareLink.shareBtn).should('be.disabled');
    })

    it('Check that share button is disabled when tag is empty', () => {
        cy.get(selectors.shareLink.removeTag).click();
        cy.get(selectors.shareLink.addDescription).type('Test');
        cy.get(selectors.shareLink.shareBtn).should('be.disabled');
    })

    it('Check that user navigates back to enter link when click on Back button', () => {
        cy.get(selectors.shareLink.backBtn).click();
        cy.get(selectors.shareLink.ShareLinkInputBox).should('be.visible');
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link1);
        cy.get(selectors.shareLink.nextBtn).click();
    })

    it('Check that user navigates to feed page when user click on discard button', () => {
        cy.get(selectors.shareLink.discardBtn).click();
        cy.get(selectors.shareLink.discardPopupBtn).click();
        cy.contains(TestData.Sharelink.createText).should('be.visible');
    })

    it('Check that user is able to share link successfully', () => {
        cy.contains(TestData.Sharelink.createText).click();
        cy.get(selectors.shareLink.ShareLinkOption).should('be.visible').click();
        cy.get(selectors.shareLink.ShareLinkInputBox).should('be.empty');
        cy.get(selectors.shareLink.ShareLinkInputBox).type(TestData.Sharelink.Link2);
        cy.get(selectors.shareLink.nextBtn).click();
        cy.get(selectors.shareLink.addDescription).type(longText);
        cy.get(selectors.shareLink.tagTopics).type('Test');
        cy.get(selectors.shareLink.tagList).contains('A/B Testing').click();
        cy.get(selectors.shareLink.shareBtn).should('be.enabled').click();
        cy.contains(TestData.Sharelink.SuccessMessage).should('be.visible');
    })

})