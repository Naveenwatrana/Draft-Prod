/// <reference types="Cypress" />
// <reference types="../support" />

import selectors from '../selectors'
import TestData from '../fixtures/TestData.json'

const bioText = Cypress.env('userBioText');
const lengthyBioText = Cypress.env('userLengthyBioText');
const projectTitle = Cypress.env('projectTitle');
const serverDomain = Cypress.env('serverDomain');
const dayjs = require('dayjs');
let emailAddress;

describe('User Onboarding Test cases', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false
        })

        before(() => {

                cy.clearLocalStorage();

                // emailAddress = `testdraft_Prod${getRandomEmail()}@` + '10f1r3h4.mailosaur.net';
                // cy.signUpFromAPI(emailAddress);
                // cy.VerifyEmail(emailAddress)

                // function getRandomEmail(min = 0, max = 10000) {
                //         const difference = max - min;
                //         let rand = Math.random();
                //         rand = Math.floor(rand * difference);
                //         rand += min;
                //         return rand;
                // }

                cy.login("Test_pord7892@yopmail.com", 'Test@123')
        })

        it('Check that user is able to create profile and  do Complete the profile', () => {
                cy.url().should('eq', 'https://www.thedraft.io/profile/onboarding');       ////
                cy.contains('Welcome').should('be.visible');
                cy.get(selectors.userOnboarding.startOnboarding).should('be.visible').click()
                cy.contains(TestData.UserOnboarding.Confirm).should('be.visible')



                /// add first name 

                cy.get(selectors.userOnboarding.firstName).type(TestData.UserOnboarding.FirstUsername);
                cy.get(selectors.userOnboarding.lastName).type(TestData.UserOnboarding.LastUsername);           ////
                cy.get(selectors.userOnboarding.LocationInput).click().type(TestData.UserOnboarding.texas)
                cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
                cy.get(selectors.userOnboarding.Button).contains('Next').should('be.enabled').click();




                // add experience
                cy.get(selectors.Onboarding.addExperience).click()
                cy.get(selectors.Onboarding.projectTitle).type(TestData.UserOnboarding.ProjectTitle)
                cy.get(selectors.Onboarding.functionalRole).type('t')
                cy.get(selectors.Onboarding.functionalRoleListBox).contains("project manager").click()
                cy.get(selectors.Onboarding.organizationName).type('f')
                cy.get(selectors.Onboarding.organizationNameListBox).contains("Founder and lightning").click()
                cy.get(selectors.Onboarding.employementType).click()
                cy.get(selectors.Onboarding.employementTypeListBox).contains("Full-time").click()
                cy.get(selectors.Onboarding.Location).click().type("Texas")                            /////
                cy.get(selectors.userOnboarding.LocationListbox).contains('Texas').click()
                cy.get(selectors.Onboarding.locationType).click()
                cy.get(selectors.Onboarding.locationTypeListBox).contains("On-site").click()
                cy.get(selectors.Onboarding.roleType).click()
                cy.get(selectors.Onboarding.roleTypeListBox).contains("Individual contributor").click()
                cy.get(selectors.Onboarding.projectStartDate).click()
                cy.get(selectors.Onboarding.projectCurrentDate).click()
                cy.contains('Ongoing project').click()
                cy.get(selectors.Onboarding.ProjectNextButton).should('be.enabled').click()

                // Add skills and Technology     
                cy.get(selectors.userOnboarding.SkillandTechnology).type("node")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('NodeJS').click()
                cy.get(selectors.userOnboarding.SkillandTechnology).type("test")                                     //// 
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('API Testing').click()
                cy.get(selectors.userOnboarding.Description).type("The QA team operates proactively. They seek to uncover and address the sources of quality problems")
                cy.get(selectors.userOnboarding.Submit).contains('Save').click()


                //add education 
                cy.get(selectors.userOnboarding.AddEducation).click()
                cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
                cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
                cy.get(selectors.userOnboarding.EducationType).type('Garduation')
                cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
                cy.get(selectors.userOnboarding.Startdate).click()
                cy.get(selectors.userOnboarding.Currentdate).click()
                cy.contains('Ongoing').click()
                cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.enabled').click()
                // add skills for education
                cy.get(selectors.userOnboarding.SkillandTechnology).type("node")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('NodeJS').click()
                cy.get(selectors.userOnboarding.SkillandTechnology).type("test")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('API Testing').click()
                cy.get(selectors.userOnboarding.Description).type("The QA team operates proactively. They seek to uncover and address the sources of quality problems,")
                cy.get(selectors.userOnboarding.Submit).contains('Save').click()



                ///// dave experience and education 
                cy.get(selectors.userOnboarding.nextButton1).click()


                // add user bio 


                //     cy.get('[type="button"]').contains("Edit Bio").click()
                //     const UserImage = 'userimage.jpg';
                //     cy.contains("Add profile image ").attachFile(UserImage, { subjectType: 'drag-n-drop' })
                //    // cy.get('.ReactModal__Content').eq(1).click({force: true} )

                //    cy.get(' .ReactModal__Overlay > .ReactModal__Content > ').click( 100, 100,{force: true} )
                //     cy.get('[type="submit"]').contains("Upload").click()


                //     cy.get('#firstName').type("Prod")
                //     cy.get('#lastName').type("User")
                //     cy.get('#mantra').type("I am always willing to help people to win")
                //     cy.get('body').click()




                // add block 

                cy.get(selectors.UseraddBlock.addBlock).click()
                cy.contains(TestData.TextBlock.TextBlock).click()

                cy.get(selectors.UseraddBlock.firstName).type('Apple Watch Ultra With microLED Display')
                cy.get(selectors.UseraddBlock.Description).type("Apple has long been rumoured to be working on microLED displays for its flagship Watch Ultra smartwatch.")
                cy.get(selectors.UseraddBlock.saveButton).click()

                // // edit  block  


                // cy.contains("Apple Watch Ultra With microLED Display").trigger('mouseover')
                // cy.contains("Apple Watch Ultra With microLED Display").click({ force: true })
                // cy.get('[data-cy="basicDetailFirstNameInput"]').clear()
                // cy.get('[data-cy="basicDetailFirstNameInput"]').type("Apple watch")
                // cy.get('#description').clear()
                // cy.get('#description').type("Apple has long been rumoured to be working on microLED displays")

                // cy.get('[data-cy="basicDetailSave"]').click()




                // delete block 

                cy.contains("Apple Watch Ultra With microLED Display").trigger('mouseover')
                cy.get(selectors.UseraddBlock.deleteIcon).eq(0).click({ force: true })
                cy.contains(TestData.TextBlock.BoxText).should('be.visible')
                cy.get(selectors.UseraddBlock.deleteConfirm).click()


                // add highlight block 


                cy.get(selectors.addhighlightBlock.addBlock).click()
                cy.contains('Highlight Block').click()
                cy.get(selectors.addhighlightBlock.Title).type('Test Image')
                const largeImage = 'im.jpg'
                cy.contains('Browse').attachFile(largeImage, { subjectType: 'drag-n-drop' })
                cy.contains('Save').should('be.enabled').click()


                // delete highlight block 

                cy.contains("Test Image").trigger('mouseover')
                cy.get(selectors.addhighlightBlock.deleteHighlightBlock).eq(0).click({ force: true })
                cy.contains('Are you sure you want to remove this block').should('be.visible')
                cy.get(selectors.addhighlightBlock.deleteBlock).click()



                // add link block 

                cy.get(selectors.UseraddBlock.addBlock).click()
                cy.contains('Add link').click()
                cy.get('#title').type("YOUTUBE")
                cy.get('#url').type("www.youtube.com")
                cy.get('[type="submit"]').contains('Next').click()
                cy.get('[type="submit"]').contains('Save').click()





                // delete link block 
                // cy.get('[data-testid="linkBlockTitle"]').contains('YOUTUBE').trigger('mouseover' )
                // cy.get(selectors.addhighlightBlock.deleteHighlightBlock).eq(0).click({force: true})
                // cy.contains('Are you sure you want to remove this block from your profile?').should('be.visible')
                // cy.get(selectors.addhighlightBlock.deleteBlock).click()



                // add experience 





                cy.contains('Resume').should('be.visible').click()
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


                // add skill 
                cy.get('#skillsAndTechnologiesUsed').type("node")
                cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('NodeJS').click()
                cy.get('#skillsAndTechnologiesUsed').type("test")
                cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('API Testing').click()
                cy.get('#description').type('The QA team operates proactively. They seek to uncover and address the sources of quality problems,')
                cy.get('[type="submit"]').contains('Save').click()


                // add side experience

                cy.get('[data-cy="add-Side projects"]').click()
                cy.get('[data-cy="projectTitle"]').type('The draft')
                cy.get('[data-cy="resume-start-date"]').click()
                cy.get('[aria-current="date"]').click()
                cy.contains('Ongoing Project').click()
                cy.get('[data-cy="saveEditProject"]').contains('Next').should('be.enabled').click()

                cy.get('#skillsAndTechnologiesUsed').type("node")
                cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('NodeJS').click()
                cy.get('#skillsAndTechnologiesUsed').type("test")
                cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('API Testing').click()
                cy.get('#description').type('The QA team operates proactively. They seek to uncover and address the sources of quality problems,')
                cy.get('[type="submit"]').contains('Save').click()


             

                //add education 
                cy.get(selectors.userOnboarding.AddEducation).click()
                cy.get(selectors.userOnboarding.InstituteName).click().type(TestData.UserOnboarding.Institute)
                cy.get(selectors.userOnboarding.InstituteListbox).contains(TestData.UserOnboarding.Institute).click()
                cy.get(selectors.userOnboarding.EducationType).type('Garduation')
                cy.get(selectors.userOnboarding.Fieldofstudy).type('Engineering')
                cy.get(selectors.userOnboarding.Startdate).click()
                cy.get(selectors.userOnboarding.Currentdate).click()
                cy.contains('Ongoing').click()
                cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.enabled').click()
                // add skills for education
                cy.get(selectors.userOnboarding.SkillandTechnology).type("node")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('NodeJS').click()
                cy.get(selectors.userOnboarding.SkillandTechnology).type("test")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('API Testing').click()
                cy.get(selectors.userOnboarding.Description).type(TestData.UserOnboarding.LoremIpsum)
                cy.get(selectors.userOnboarding.Submit).contains('Save').click()






                //add  article

                cy.visit("https://www.thedraft.io/feed")


                cy.contains('Create').should('be.visible').click()
                cy.get(selectors.createArticle.CreateArticleOption).click()
                cy.contains(TestData.CreateArticle.Imagepreviewbox).click()
                const articleImage = 'windows.png'
                cy.contains(TestData.CreateArticle.Imagepreviewbox).attachFile(articleImage, { subjectType: 'drag-n-drop' })
                cy.get(selectors.createArticle.Titlebox).type("Windows 11 Update Brings New AI Capabilities")
                cy.get(selectors.createArticle.textFormatOption).eq(0).click();
                cy.get(selectors.createArticle.sizeOptions).should('have.length', 3);
                cy.get(selectors.createArticle.textFormatOption).eq(0).click();
                cy.get(selectors.createArticle.editorArea).clear().should('be.visible').type(TestData.CreateArticle.articleContent);     // need to get data from test file 
                cy.get(selectors.createArticle.NextButton).should('be.enabled').click()
                cy.get(selectors.createArticle.DescriptionBox).type(TestData.CreateArticle.articleContent)
                cy.get(selectors.createArticle.Tags).click().type('a')
                cy.ElementToVisible()
                cy.get(selectors.createArticle.TagsList).eq(0).click()
                cy.get(selectors.createArticle.PublishButton).should('be.enabled').click()

                // add post

                cy.contains("Explore").click()
                cy.contains('Create').should('be.visible').click()
                cy.get(selectors.createpost.CreatepostOption).should('be.visible').click()

                cy.contains(TestData.CreatePost.Imagepreviewbox).click()
                const PostImage = 'postimage.png'
                cy.contains(TestData.CreatePost.Imagepreviewbox).attachFile(PostImage, { subjectType: 'drag-n-drop' })



                cy.get(selectors.createpost.Descriptionblock).type(TestData.CreateArticle.articleContent)
                cy.get(selectors.createpost.Tags).click().type('a')
                cy.ElementToVisible()
                cy.get(selectors.createpost.TagList).eq(0).click()
                cy.get(selectors.createpost.Submit).contains('Post').should('be.enabled').click()


                // add link 

                cy.contains("Explore").click()
                cy.contains('Create').should('be.visible').click()
                cy.get('[data-cy="Create-Share link"]').click()

                cy.get('[data-cy="shareLinkInput"]').type("https://www.youtube.com/watch?v=vyQv563Y-fk")
                cy.get('[data-cy="Next"]').click()
                cy.get('[data-cy="captionInput"]').type("Technology, the application of scientific knowledge to the practical aims of human life or, as it is sometimes phrased, to the change and manipulation of the human environment.")



                cy.get(selectors.createpost.Tags).click().type('a')
                cy.ElementToVisible()
                cy.get(selectors.createpost.TagList).eq(0).click()
                cy.get('[type="button"]').contains('Share').should('be.enabled').click()


                // add prefrence 



                cy.contains("Workspace").click();
                cy.get(selectors.Preferences.PreferenceTab).click();

                cy.get(selectors.Preferences.BaseSalary).type(TestData.JobPreference.BaseSalary);
                cy.contains(TestData.JobPreference.Compensation_Heading).should('be.visible');
                cy.contains(TestData.JobPreference.Compensation_SubHeading).should('be.visible');
                cy.get(selectors.Preferences.Compasation).type(TestData.JobPreference.Compensation);
                cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                        "Albanian", "a");
                cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                        "Bengali", "b");
                cy.SelectDropDownValue(selectors.Preferences.LanguageInput, selectors.Preferences.LanguageListBox,
                        "Dutch", "d");

                cy.contains(TestData.JobPreference.Position_Heading).should('be.visible')
                cy.contains(TestData.JobPreference.Employment_Position1).click()
                cy.contains(TestData.JobPreference.Employment_Position2).click()

                cy.contains(TestData.JobPreference.Workstyle_Heading).should('be.visible')
                cy.contains(TestData.JobPreference.Work_Style).click()
                cy.contains("Save").should('be.visible');

                cy.RegionDropDownValue(selectors.Preferences.RegionInput, selectors.Preferences.RegoinListBox,
                        "Europe", "e")

                cy.get('[type="submit"]').contains('Save').click()




        })

        it('Check that user can edit/delete experience and education', () => {


                cy.get(selectors.croncycleUserPermission.profileIcon).should('be.visible').click();
                cy.contains('My Profile').should('be.visible').click()
                cy.contains('Resume').click()


                // edit experience
                cy.viewport('macbook-13');
                cy.contains('The draft').trigger('mouseover')
                cy.get('[data-cy=handleEditExperience]').eq(0).click({ force: true })
                cy.get('[data-cy="projectTitle"]').clear()
                cy.get('[data-cy="projectTitle"]').type('The Draft new')
                //cy.get('#functionalRole').clear()
                cy.get('#functionalRole').type('qu')
                cy.get('#react-select-functionalRole-listbox').contains("data quality analyst").click()
                cy.get('[data-cy="next"]').should('be.enabled').click()

                cy.get('#skillsAndTechnologiesUsed').type("React")
                cy.get('#react-select-skillsAndTechnologiesUsed-listbox').contains('React').click()
                cy.get('[type="submit"]').contains('Save').click()



                // edit education 


                cy.viewport('macbook-13');
                cy.contains('The draft').trigger('mouseover')
                cy.get('[data-cy=handleEditEducation]').eq(0).click({ force: true })
                cy.get(selectors.userOnboarding.EducationType).clear()

                cy.get(selectors.userOnboarding.EducationType).type('Post-Graduation')

                cy.get(selectors.userOnboarding.Fieldofstudy).clear()
                cy.get(selectors.userOnboarding.Fieldofstudy).type('MBA')


                cy.get(selectors.userOnboarding.Submit).contains('Next').should('be.enabled').click()
                // add skills for education
                cy.get(selectors.userOnboarding.SkillandTechnology)
                        .type("React")
                cy.get(selectors.userOnboarding.SkillandTechnologylistBox).contains('React').click()
                cy.get(selectors.userOnboarding.Submit).contains('Save').click()



                // delete experience

                cy.viewport('macbook-13');
                cy.contains("The Draft").trigger('mouseover')
                cy.get('[data-cy="handleDeleteExperience"]').eq(0).click({ force: true })
                cy.contains('Delete Experience').should('be.visible')
                cy.get('[data-cy="deleteBlock"]').click()
                cy.get('.Toastify__toast-body > div').should('be.visible')



                // delete education

                cy.viewport('macbook-13');
                cy.contains("Chitkara University").trigger('mouseover')

                cy.get('[data-cy="handleDeleteEducation"]').eq(0).click({ force: true })
                cy.contains('Delete Education').should('be.visible')
                cy.get('[data-cy="deleteBlock"]').click()
                cy.get('.Toastify__toast-body > div').should('be.visible')

        })


        it('Edit/ delete Article', () => {


                // edit article

                cy.contains("Workspace").click();
                cy.get('[data-cy="Content"]').click()
                cy.get('img').click()
                cy.get('ellipse[cy="11"]').eq(0).click()
                cy.get('[data-cy="editArticle"]').click()
                cy.get('[data-cy="deleteIcon"]').click()

                cy.contains(TestData.CreateArticle.Imagepreviewbox).click()
                const largeImage = 'im.jpg'
                cy.contains(TestData.CreateArticle.Imagepreviewbox).attachFile(largeImage, { subjectType: 'drag-n-drop' })
                cy.get(selectors.createArticle.Titlebox).clear()
                cy.get(selectors.createArticle.Titlebox).type('Windows 11 Update Brings New AI')

                cy.get(selectors.createArticle.NextButton).should('be.enabled').click()
                cy.get(selectors.createArticle.DescriptionBox).type(TestData.CreateArticle.articleContent)
                cy.get(selectors.createArticle.Tags).click().type('d')
                cy.ElementToVisible()
                cy.get(selectors.createArticle.TagsList).eq(0).click()
                cy.get(selectors.createArticle.PublishButton).should('be.enabled').click()
                cy.get('ellipse[cy="11"]').eq(0).click()
                cy.get('[data-cy="deleteArticle"]').click()
                cy.get('[data-testid="deleteDiscardButton"]').click()


        })


        
        it('Edit/Delete Post', () => {


                // edit article

                cy.contains("Workspace").click();
                cy.get('[data-cy="Content"]').click()
                cy.contains('Posts').click()
                cy.get('img').click()
                cy.get('ellipse[cy="11"]').eq(0).click()
               
                cy.get('[data-cy="deleteArticle"]').click()
                cy.get('[data-testid="deleteDiscardButton"]').click()











        })



})



