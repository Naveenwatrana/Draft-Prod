/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

before(() => {
    cy.clearLocalStorage();
})

describe('Croncycle connect and refresh buttons test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })


    it('Check that user should able to add the article filter screen', () => {
        cy.login('Harpratap@yopmail.com', 'Test@123');
        cy.ElementToVisible()
        cy.contains(TestData.ArticleFeed.ArticlesFilter).click()
        cy.get(selectors.Articlef.Articlecontainerbox).eq(1).should('be.visible')

    })

    it('Check that user can Go to Articles open it and verify content ', () => {
        cy.visit(TestData.ArticleFeed.ArticleLink)
        cy.ElementToVisible()
        cy.url().should('include', 'article')
        cy.get(selectors.Articlef.ImagePreview).should('be.visible')

    })

    it('Check that  Heading, description, Save, Copy link, Report option, Like CTAs is visible ', () => {
        cy.get(selectors.Articlef.saveButton).should('be.visible')
        cy.get(selectors.Articlef.ShareLink).should('be.visible')
        cy.get(selectors.Articlef.UpvoteButton).should('be.visible')

    })

    it('Check that user can expand the description ', () => {
        cy.contains(TestData.ArticleFeed.More).click()
        cy.contains(TestData.ArticleFeed.Less).click()

    })

    it('Verify to add comment and check added comment content', () => {
        cy.get(selectors.Articlef.commentBox).should('be.visible').type(TestData.CreateArticle.LoremIpsum)
        cy.get(selectors.Articlef.PostOption).click()
        cy.contains(TestData.ArticleFeed.Comments).should('be.visible')



    })




})