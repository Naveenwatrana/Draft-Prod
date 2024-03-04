/// <reference types="Cypress" />

import selectors from '../selectors';
import Testdata from '../fixtures/TestData.json'

before(() => {
    cy.clearLocalStorage();
    cy.viewport('macbook-13');
    cy.login(Testdata.CreateArticle.username, Testdata.CreateArticle.Password);
    cy.contains('Create').should('be.visible').click()
    cy.get(selectors.createArticle.CreateArticleOption).click()
})

describe('Create Article - Step 1 test cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    it('Check that user redirect to Create article screen', () => {
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).should('be.visible')
        cy.get(selectors.createArticle.Titlebox).should('be.visible')
    })

    it('Check that when user click on cancel button then they should navigate back to previous screen', () => {
        cy.get(selectors.createArticle.cancelButton).should('be.enabled').click();
        cy.viewport('macbook-13');
        cy.visit('https://www.thedraft.io/article/create')
    })

    it('Check that user is able to add the image', () => {
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).click()
        const largeImage = 'im.jpg'
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).attachFile(largeImage, { subjectType: 'drag-n-drop' })
    })

    it('Check that user is able to delete the added image', () => {
        cy.get(selectors.createArticle.ImageDeletebutton).eq(0).click()
    })

    it('Check that user is able to add Article title ', () => {
        cy.get(selectors.createArticle.Titlebox).type("Tech news")
    })

    it('Check that all the options on edit/format bar should be display', () => {
        cy.get(selectors.createArticle.textFormatOption).eq(0).should('be.visible').click();
        cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
        cy.get(selectors.createArticle.textFormatOption).should('be.visible').click();
        cy.get(selectors.createArticle.boldButton).should('be.visible');
        cy.get(selectors.createArticle.italicButton).should('be.visible');
        cy.get(selectors.createArticle.orderedButton).should('be.visible');
        cy.get(selectors.createArticle.bulletButton).should('be.visible');
        cy.get(selectors.createArticle.linkButton).should('be.visible');
        cy.get(selectors.createArticle.imageButton).should('be.visible');
        cy.get(selectors.createArticle.videoButton).should('be.visible');
    })

    it('Check that user should able to select any option/s from edit/format bar', () => {
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).eq(1).click({ force: true });
        cy.get(selectors.createArticle.textFormatOption).should('have.css', 'color', 'rgb(153, 230, 98)');
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).eq(2).click({ force: true });
        cy.get(selectors.createArticle.textFormatOption).should('have.css', 'color', 'rgb(153, 230, 98)');
        cy.get(selectors.createArticle.boldButton).click();
        cy.get(selectors.createArticle.italicButton).click();
        cy.get(selectors.createArticle.italicButton).should('have.css', 'color', 'rgb(153, 230, 98)');
        cy.get(selectors.createArticle.orderedButton).click();
        cy.get(selectors.createArticle.orderedButton).should('have.css', 'color', 'rgb(153, 230, 98)');
        cy.get(selectors.createArticle.bulletButton).click();
        cy.get(selectors.createArticle.bulletButton).should('have.css', 'color', 'rgb(153, 230, 98)');
    })

    it('Check that when user select any option/s then formatting should apply to the respective text', () => {
        cy.reload();
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.editorArea).should('be.visible').type('This is header{selectAll}');
        cy.get(selectors.createArticle.editorArea).find('p').should('have.text', 'This is header');
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).eq(1).click();
        cy.get(selectors.createArticle.editorArea).find('h2').should('have.text', 'This is header');
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).eq(2).click();
        cy.get(selectors.createArticle.editorArea).find('h3').should('have.text', 'This is header');
        cy.get(selectors.createArticle.boldButton).click();
        cy.get(selectors.createArticle.editorArea).find('h3').find('strong')
        cy.get(selectors.createArticle.italicButton).click();
        cy.get(selectors.createArticle.editorArea).find('h3').find('strong').find('em').should('have.text', 'This is header');
        cy.get(selectors.createArticle.orderedButton).click();
        cy.get(selectors.createArticle.editorArea).find('ol').find('li').find('strong').find('em').should('have.text', 'This is header');
        cy.get(selectors.createArticle.bulletButton).click();
        cy.get(selectors.createArticle.editorArea).find('ul').find('li').find('strong').find('em').should('have.text', 'This is header');
        cy.get(selectors.createArticle.linkButton).click();
        cy.get(selectors.createArticle.enterLinkSaveButton).should('be.visible').click();
        cy.get(selectors.createArticle.editorArea).find('ul').find('li').find('a').should('have.attr', 'href', 'This is header');
    })

    it('Check that  user is able to add information in all fields and  redirect to next screen', () => {
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).click()
        const largeImage = 'im.jpg'
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.get(selectors.createArticle.Titlebox).type("Tech news")
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.editorArea).clear().should('be.visible').type(Testdata.CreateArticle.LoremIpsum);
        cy.get(selectors.createArticle.NextButton).should('be.enabled').click()
    })

    it('Check the discard functionality ', () => {
        cy.get(selectors.createArticle.Discardbutton).click()
        cy.contains(Testdata.CreateArticle.DiscardText).should('be.visible')
        cy.get(selectors.createArticle.Button).contains('Discard').click({force: true})  
    })

    it('Check that  user is able to add again all of the information in all fields and  redirect to next screen', () => {
        cy.visit('https://www.thedraft.io/article/create')
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).click()
        const largeImage = 'im.jpg'
        cy.contains(Testdata.CreateArticle.Imagepreviewbox).attachFile(largeImage, { subjectType: 'drag-n-drop' })
        cy.get(selectors.createArticle.Titlebox).type("Tech news")
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
        cy.get(selectors.createArticle.textFormatOption).eq(0).click();
        cy.get(selectors.createArticle.editorArea).clear().should('be.visible').type(Testdata.CreateArticle.LoremIpsum);
        cy.get(selectors.createArticle.NextButton).should('be.enabled').click()

    })

    it('Check that when user come back on create article screen then previous data should be erased', () => {
        cy.contains(Testdata.CreateArticle.StoryPreview).should('be.visible')
        cy.contains(Testdata.CreateArticle.Tagtopics).should('be.visible')
        cy.contains(Testdata.CreateArticle.Adddescription).should('be.visible')
    })

    it('Check that when user is able to go previous page by clicking back option', () => {
        cy.get(selectors.createArticle.Button).contains('Back').should('be.visible').click()
        cy.get(selectors.createArticle.NextButton).should('be.enabled').click()
    })

    it('Check that when user is able to go previous page by clicking back option', () => {
        cy.get(selectors.createArticle.Button).contains('Back').should('be.visible').click()
        cy.get(selectors.createArticle.NextButton).should('be.enabled').click()
    })

    it('Check that when user is able to discard the article', () => {
        cy.get(selectors.createArticle.Discardbutton).should('be.visible').click()
        cy.contains(Testdata.CreateArticle.savetext).should('be.visible')
        cy.get(selectors.createArticle.Button).contains('Continue writing').should('be.visible').click()
    })

    it('Check that check that next button is disable when the user left the Tag Topic options', () => {
        cy.get(selectors.createArticle.DescriptionBox).type(Testdata.CreateArticle.LoremIpsum)
        cy.get(selectors.createArticle.PublishButton).should('be.disabled')
        cy.get(selectors.createArticle.DescriptionBox).clear()
    })

    it('Check that check that next button is disable when the user left the Add description field', () => {
        cy.get(selectors.createArticle.Tags).click().type('a')
        cy.wait(3000)
        cy.get(selectors.createArticle.TagsList).eq(0).click()
        cy.get(selectors.createArticle.PublishButton).should('be.disabled')
        cy.get(selectors.createArticle.CancelOption).click()
    })

    it('Check that check that next button is enable when the user filled all fields', () => {
        cy.get(selectors.createArticle.DescriptionBox).type(Testdata.CreateArticle.LoremIpsum)
        cy.get(selectors.createArticle.Tags).click().type('a')
        cy.wait(2000)
        cy.get(selectors.createArticle.TagsList).eq(0).click()
        cy.get(selectors.createArticle.PublishButton).should('be.enabled')
    })

})