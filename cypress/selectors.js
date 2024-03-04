const userSignUp = {
  form: {
    email: '#email',
    password: '#password',
    button: '[data-cy="homeSignUpButton"]',
    checkBox: '[type="checkbox"]',
    confirmPassword: '#confirmPassword',
    validationError: '.input_error__rrlPn',
    wrongPassword: 'Test123',
    enterPassword: 'Test@123',
    TermsAndConditionsButton: 'label[for="terms"]',
    yopMailInputEmailBox: '#login',
    yopMailGoMailButton: '#refreshbut',
    signUpButton: '[data-cy="signup-submit"]',
    signUpOption: '[data-cy="signup-link"]',
    signUpValidation: '[data-cy="signup-validation-error"]'
  },


};

const userLogin = {
  form: {
    //loginOption: '[href="/account/signin"]',
    email: '#email',
    password: '#password',
    button: '[data-cy="signin-submit"]',
    validationError: '.input_error__rrlPn',
    wrongPassword: 'Test123',
    enterPassword: 'Test@123',
    LoginValidation: '[data-cy="login-validation-error"]'

  },
};


const resetPassword = {
  form: {
    resetText: '.recoverPassword_signin__OAFlR > h2',
    email: '#email',
    password: '#password',
    button: '[data-cy="recover-submit"]',
    cancelButton: '[data-cy="cancel-link"]',
    validationError: '.input_error__rrlPn',
    wrongPassword: 'Test123',
    enterPassword: 'Test@123',
    nonExistingUser: 'No user record found with provided email'

  },
};

const userProfile = {
  addBio: ':nth-child(3) > div > button',
  bioTextArea: '[data-cy="editBioText"]',
  saveButton: '[data-cy="editBioSave"]',
  cancelBioButton: '[data-cy="editBioCancel"]',
  addProject: 'div[class^="profile_profilePage"] button',
  newProjectButton: '[data-cy="addNewProject"]',
  projectTitle: '[data-cy="projectTitle"]',
  projectStartDate: '[data-cy="project-start-date"]',
  projectEndDate: '[data-cy="project-end-date"]',
  projectDescription: '#description',
  projectSaveButton: '[data-cy="saveEditProject"]',
  projectCancelButton: '[data-cy="cancelEditProject"]',
  savedProject: '.sc-ftTHYK.cwOWe',
  ongoingProjectRadioButton: 'label[for="ongoing"]',
  peojectSuccessfullyAddMessage: 'button[class^="Toastify__close-button"]',
  characterCounter: '.Bio_error__XzMmi',
  editBioButton: '[data-cy="editBio"]',
  newProjectButton: '[data-cy="addNewProject"]',
  editExperienceButton: 'svg[xmlns="http://www.w3.org/2000/svg"]',
  successMessageCloseButton: '.Toastify__close-button > svg > path',
  fileUpload: '.common_fileInputLabel__4K184',
  experienceName: '.sc-iAEawV',
  backgroundImage: '.previewCard_imageContainer__QyJ3x > img',
  userMantra: '.text_light__GPYSh.previewCard_mantra__2DD8O',
  fullNameEditButton: '[data-cy="editBasicDetails"]',
  fullName: '[data-cy="basicDetailFirstNameInput"]',
  lastName: '[data-cy="basicDetailFirstLastInput"]',
  userBasicDetailSaveButton: '[data-cy="basicDetailSave"]',
  userFullName: '[data-cy="user-fullname"]',
  backgroundImageEditButton: '[data-cy="editBasicImageDetails"]',
  addBackgroundImageArea: '.common_fileInputLabel__5fZm0',
  editImageSaveButton: '[data-cy="editImageDetailSave"]',
  editMantra: '[data-cy="basicDetailEditMantra"]',
  projectNameInTimeline: 'div[class^="profile_profilePage"] > div > div:nth-child(5)',
  projectTimelineBar: '[data-testid*="projectBar"]',
  timelineMore_lessButton: '[data-cy="moreOrLessGraph"] > div',
  skillsField: 'div[class^="select__value-"]',
  addProject: '[data-cy="add-project"]',
};

const userOnboarding = {
  firstName: '#firstName',
  lastName: '#lastName',
  nextButton: 'button[type="submit"]',
  mantra: '#mantra',
  skipButton: '[data-cy="skip"]',
  skipBioButton: '[data-cy="skip-bio"]',
  skipProjectButton: '[data-cy="skip-project"]',
  skipModalButton: '[data-cy="skip-modal-skip"]',
  characterCounter: '.addBio_counter__3CYWi',
  addBioTextArea: '#bio',
  projectTitle: '[data-cy="project-title"]',
  projectRole: '[data-cy="project-role"]',
  projectStartDate: '[data-cy="project-start-date"]',
  ongoingButton: '[for="ongoing"]',
  projectNextButton: '[data-cy="submit-project"]',
  exploreFeedButton: '[data-cy="explore-feed"]',
  removeImage: '[data-cy="removeImage"]',
  editProfileButton: '[data-cy="edit-profile"]',
  startOnboarding: '[data-cy="startOnboarding"]',
  Button: '[type="button"]',
  LocationInput: '[id^="react-select-location-input"]',
  LocationListbox: '#react-select-location-listbox',
  SkillandTechnology: '#skillsAndTechnologiesUsed',
  SkillandTechnologylistBox: '#react-select-skillsAndTechnologiesUsed-listbox',
  Description: '#description',
  Submit: '[type="submit"]',
  AddEducation: '[data-cy="add-Education"]',
  InstituteName: '#institutionName',
  InstituteListbox: '#react-select-institutionName-listbox',
  EducationType: '#educationType',
  Fieldofstudy: '#fieldOfStudy',
  Startdate: '#startDate',
  Currentdate: '[aria-current="date"]',
  EndDate: '[data-cy="project-end-date"]',
  Back: '[data-cy="back"]',
  Next: '[data-cy="next"]',
  GoProfilebutton: '[data-cy="Go to profile"]',
  nextButton1: '[data-cy="nextCreateCompany"]'

};

const companyProfile = {
  userProfileIcon: 'div[class^="NavBar_avatar"]',
  dropDownMenu: 'div[class*="NavBar_userDropDownItem"]',
  dropDownMenuOptions: '.NavBar_userDropDownItem__BtnWj',
  companyURL: '[data-cy="addCompanyURL"]',
  nextButton: '[data-cy="nextCreateCompany"]',
  cancelButton: '[data-cy="cancelCreateCompany"]'
};

const jobDescription = {
  savedCardsOptions: '[data-cy="workspaceSidebar"]',
  noJObsAddedImage: '.sc-dEVLtI.eipXex > img',
  // mobile_savedCardOptions: 'div[class*="-control"]',
  // mobile_savedCardOptionsDropdown: '.react-select-2-listbox',
  previewCardDetails: '[data-cy="job-image-container"] > div > span',
  previeCardImage: 'img[alt^="/_next/static/media/defaultProfile"]',
  previeCardActualImage: 'img[alt^="blob:https://draft-uat.herokuapp.com"]',
  roleInputBox: '[data-cy="roleInput"]',
  locationDropdown: '#location',
  locationTypeDropdown: '#locationType',
  jobTypeDropdown: '#jobType',
  dropDown: '.css-gjwru7-control',
  salaryFromInputBox: '[data-cy="salaryFromInput"]',
  salaryToInputBox: '[data-cy="salaryToInput"]',
  fileUploadBox: '.common_fileInputLabel__4K184',
  descriptionInputBox: '#description',
  nextButton: '[data-cy="nextButton"]',
  mobile_locatioDropdownFirstOption: '#react-select-3-option-1',
  addJobButton: '[data-cy="addJobFromNoJob"]',
  addJobButtonAfterAddJob: '[data-cy="addJob"]',
  AddJob: '[data-cy="addJobFromNoJob"]',
  addJobManuallyBUtton: '[data-cy="addJobManually"]',
  reviewScreenThumbIcon: 'svg[viewBox="0 0 40 37"]',
  cardDefaultImage: 'img[alt*="/static/media/defaultProfile"]',
  CardImage: 'img[src*="blob:https://draft-uat.herokuapp.com"]',
  locatioDropdownFirstOption: '#react-select-location-option-0',
  toggleButton: '.slick-dots > li:nth-child(2)',
  removeImageButton: '[data-cy="removeImage"]',
  nextButtonInJobSnapshot: '[data-cy="createJobSnapshortForm"] button[type="submit"]',
  previewCardDetailsOnReviewScreen: '.slick-slide.slick-active.slick-current span',
  viewJobColumns: 'tr > th',
  viewJobsMoreOptionButton: 'tr > td > svg',
  viewJobMoreOptionBox: 'div[data-cy^="moreMenuBox"] > div',
  viewJobsMoreOptionList: 'div[data-cy^="moreMenuBox"] > div',
  viewJobEdit: '[data-cy="editJobDetails"]',
  viewJobDetails: '[data-cy="viewJobDetails"]',
  publishJobButton: '[data-cy="PublishJob"]',
  unpublishJobButton: '[data-cy="UnpublishJob"]',
  editJobButton: '[data-cy="editJob"]',
  viewJobStatus: 'tr > td> div',
  infiniteScrollBar: '#infinite-scroll',
  totalJobsInViewJob: 'tbody > tr',
  companyLogo: 'img[src]',
  jobCardOnAdminPage: '[data-cy="job-image-container"]',
  loadMoreButton: '[data-cy="showMoreJobDescription"]',
  showLessButton: '[data-cy="showMoreJobDescription"]'

}

const croncycleUserPermission = {
  croncycleFeedsOption: '[data-cy="Cronycle Feeds"]',
  profileIcon: '[data-cy="profileIcon"]',
  switchAccountsButton: '[data-cy="switchAccounts"]',
  b2bCompany: '[data-cy="setCompanytrsl"]',
  b2bCompanys: '[data-cy="setCompanyjip"]',
  EddoxCompany: '[data-cy="setCompanyeddox"]',
  secondB2BCompany: '[data-cy="setCompanyFigma"]',
  draftCompany: '[data-cy="setCompanyThe Draft "]',
  croncycleFeedsListRightSide: '[data-cy="desktopWorkspace"] > div:nth-child(2) span:nth-child(2)',
  croncycleFeedsListLeftSide: '[data-cy="Cronycle Feeds"] > div',
  cronycleFeedRadioButton: 'input[data-cy^="feedCheck"]',
  connectButton: '[data-cy="connectCronycleFeeds"]',
  refreshFeedListButton: '[data-cy="refreshCronycleFeeds"]',
  cronycleContent: '[data-cy="desktopWorkspace"]  > div:nth-child(2) > div > div > span',
  cronycleContentTitle: '[data-cy="desktopWorkspace"]  > div:nth-child(2) > div > div:nth-child(1)',
  MyprofileOption: '[data-cy="myProfile"]',
};

const createArticle = {
  Titlebox: 'div[role="textbox"]',
  createdCardsOption: '[data-cy="Created Cards"]',
  createCardsButton: '[data-cy="createCards"]',
  textFormatOption: '.ql-picker-label',
  sizeOptions: '.ql-picker-item',
  formatOptions: '#ql-picker-options-1',
  textAlignmentOptions: '#ql-picker-options-2',
  boldButton: '.ql-bold',
  italicButton: '.ql-italic',
  underscoreButton: '.ql-underline',
  orderedButton: '[value="ordered"]',
  bulletButton: '[value="bullet"]',
  linkButton: '.ql-link',
  imageButton: '.ql-image',
  videoButton: '.ql-video',
  formulaButton: '.ql-formula',
  codeblockButton: '.ql-code-block',
  cleanformatButton: '.ql-clean',
  editorArea: '.ql-editor',
  enterLinkSaveButton: '.ql-action',
  formulaInputBox: '[data-formula="e=mc^2"]',
  nextButton: '[data-cy="Next"]',
  cancelButton: '[data-cy="Cancel"]',
  previewButton: '[data-cy="PreviewArticle"]',
  backButton: '[data-cy="BackArticle"]',
  topicsInputBox: '.select__input-container',
  tagOptions: '.select__menu-list > div',
  listOfTags: '.select__menu-list > div',
  selectedTags: '.select__value-container',
  publishArticleButton: '[data-cy="publishArticle"]',
  noCardsTitle: '[data-cy="no-cards-title"]',
  createdCard: '[data-cy="desktopWorkspace"] a[href*="/article/view/"]',
  publishButtonArticlePage: '[data-cy="carouselActionContainer"]',
  cardMoreOptionButton: '[data-cy="toggleMenu"]',
  moreOptions: '[data-cy="articleMenu"] > ul',
  commentButton: '[data-cy="commentsIcon"]',
  addCommentButton: '[data-cy="addComment"]',
  commentBox: '[data-cy="commentsTextArea"]',
  listOfComments: '[data-cy^="comment-"]',

  AddNewCard: '[data-cy="AddNewCardContainer"]',
  AddMantra: '#description',
  AddDescription: 'textarea[placeholder="Add text"]',

  CardContainer: '[data-cy="cardContainer]',

  CreateArticleOption: '[data-cy="Create-Article"]',
  ImageDeletebutton: 'button >svg ',
  NextButton: '[data-cy="Next"]',
  Discardbutton: '[data-cy="Discard"]',
  Button: '[type="button"]',
  DescriptionBox: '.DraftEditor-editorContainer',
  PublishButton: '[data-cy="Publish"]',
  Tags: '#tags',
  TagsList: '#react-select-tags-listbox',
  CancelOption: '[data-testid="cancelSelect"]'
};


const logout = {

  profileIcon: '[data-cy="profileIcon"]',
  LogoutOption: '[data-cy="logOut"]',


};

const ProfileOptions = {
  userProfileoption: '[data-cy="myProfile"]',
  switchAccout: '[data-cy="switchAccounts"]',
  AddBlock: '[data-cy="add-block"]',
  ImageUpload: '[data-cy="imageUpload"]',
  nextButton: '[data-cy="nextCreateCompany"]',
  cancelButton: '[data-cy="basicDetailCancel"]',
  saveButton: '[data-cy="basicDetailSave"]',
};

const Onboarding = {
  addExperience: '[data-cy="add-Experience"]',
  addEducation: '[data-cy="add-Education"]',
  projectTitle: '[data-cy="projectTitle"]',
  functionalRole: '#functionalRole',
  functionalRoleListBox: '#react-select-functionalRole-listbox',
  organizationName: '#organisationName',
  organizationNameListBox: '#react-select-organisationName-listbox',
  employementType: '#employmentType',
  employementTypeListBox: '#react-select-employmentType-listbox',
  Location: '#location',
  locationListBox: '#react-select-location-listbox',
  locationType: '#locationType',
  locationTypeListBox: '#react-select-locationType-listbox',
  roleType: '#roleType',
  roleTypeListBox: '#react-select-roleType-listbox',
  projectStartDate: '[data-cy="resume-start-date"]',
  projectCurrentDate: '[aria-current="date"]',
  ProjectNextButton: '[data-cy="next"]',
  ProjectCancelButton: '[data-cy="cancel"]',
};

const profileFollow = {
  CardContainer: '[data-cy="cardContainer"] ',
  saveProfile: '[type="button"]',
  saveContent: '[data-cy="savedContent"]',
  ImageUpload: '[data-cy="imageUpload"]',
  unsavedContent: '[data-cy="followProfile"]',

};

const UseraddBlock = {
  addBlock: '[data-cy="add-block"]',
  firstName: '[data-cy="basicDetailFirstNameInput"]',
  Description: '#description',
  saveButton: '[data-cy="basicDetailSave"]',
  unsavedContent: '[data-cy="unsavedContent"]',
  deleteTextBlock: '[data-cy="delete-text-block"]',
  deleteCancel: '[data-cy="deleteCancel"]',
  deleteBlock: '[data-cy="deleteBlock"]',
  CancelOption: '[data-cy="basicDetailCancel"]',
  deleteIcon: '[data-cy="userBlockCancelIconCOntainer"]',
  deleteConfirm: '[data-cy="deleteBlock"]'

};

const ArticleComments = {
  CardContainer: '[data-cy="cardContainer"] ',
  CommentIcon: '[data-cy="commentsIcon"]',
  Iconsvg: '[data-cy="commentsIcon"]>svg',
  commentTextAera: '[data-cy="commentsTextArea"]',
  unsavedContent: '[data-cy="unsavedContent"]',

};

const addhighlightBlock = {
  addBlock: '[data-cy="add-block"]',
  Title: '#title',
  deleteHighlightBlock: '[data-cy="delete-hightlight-block"]',
  cancelButton: '[data-cy="deleteCancel"]',
  deleteCancel: '[data-cy="deleteCancel"]',
  deleteBlock: '[data-cy="deleteBlock"]',
  imageUpload: '[data-cy="imageUpload"]',
};

const editNamelocation = {
  addBlock: '[data-cy="add-block"]',
  userName: '[data-cy="userName"]',
  firstName: '[data-cy="basicDetailFirstNameInput"]',
  lastName: '[data-cy="basicDetailFirstLastInput"]',
  detailsCancel: '[data-cy="basicDetailCancel"]',
  detailSave: '[data-cy="basicDetailSave"]',
  imageUpload: '[data-cy="imageUpload"]',
};

const createJob = {
  jobButtonworkspace: '[data-cy="Jobs"]',
  addJobButton: '[data-cy="addJobFromNoJob"]',
  jobRole: '#role',
  nextbutton: "button[type=button]",
  canjobroleoption: 'Can’t find your role?',
  functionalRoleInput: '[id^="react-select-roleType-input"]',
  funtionalRoleListbox: '[id^="react-select-roleType-listbox"]',
  whoyouareOption: "Who you are",
  addRequirementsotion: "Add requirements",
  employementTypefield: '#employmentType',
  employementTypeListBox: '[id^="react-select-employmentType-listbox"]',
  bulletpoint: "#institutionName",
  saveButton: '[data-cy="submit"]',
  salaryTo: '[data-cy="salaryTo"]',

  salaryFrom: '[data-cy="salaryFrom"]',
  OTEfrom: '[data-cy="oteFrom"]',
  OTEto: '[data-cy="oteTo"]',
  Languagefield: '#languages',
  LanguagaListbox: '#react-select-languages-listbox',
  jobButton: '[data-cy="addJob"]',
  addRequirement1: '[data-cy="Add requirement"]',
  skillTechnologyOption: 'Add skills and technologies',
  skillTechnologyInputbox: "#react-select-skillsAndTechnologiesUsed-input",
  skillTechnologylist: '#react-select-skillsAndTechnologiesUsed-listbox',
  JobCard: '[data-cy="addJobCard"]',
  addCovercardButton: '[data-cy="addJobCardBtn"]',
  CardContainer: '[data-cy="cardContainer"]',
  addAboutcard: '[data-cy="addNewCardAbout"]',
  HeadingInputBox: '[placeholder^="What is this card about?"]',
  AboutcardDescriptionbox: '[placeholder^="Add text"]',
  AddLinkcard: '[data-cy="addNewCardLink"]',
  LinkcardNameInputBox: '#name',
  LinkCardUrlbox: '#url',
  Donebutton: '[data-cy="done"]',
  AddResponsibilitiesOption: "Add responsibilities",
  CancelOption: '[data-cy="close"]',
  RoleTypebox: '#roleType',
  RoleTypeListBox: "#react-select-roleType-listbox",
  workstyle: "#workStyle",
  WorkStyleListBoxValue: "#react-select-workStyle-listbox",
  Location: "#location",
  LocationListbox: '#react-select-location-listbox',
  Profileicon: '[data-cy="profileIcon"]',
  Switchoption: '[data-cy="switchAccounts"]',
  button: '[type= "button"]',
  Addrequirement: '[data-cy="Add requirement"]',
  deleteicon: "svg[width=17]",
  AddResponsibility: '[data-cy="Add responsibility"]',
  Addskillbutton: '[data-cy="addSkillButton"]',
  Nextcreatebutton: '[data-cy="nextCreateCompany"]',
  Jobcard1: '[data-cy="addJobCard"]'


};

const whatYouWillDo = {
  RoleType: "#react-select-roleType-input",
  RoleTypeListBox: "div[id='react-select-roleType-listbox']",
  RoleTypeListBoxValue: "div[id='react-select-roleType-listbox'] > div > div",
  PeopleRange: "#react-select-range-input",
  PeopleRangeListBox: "div[id='react-select-range-listbox']",
  PeopleRangeListBoxValue: "div[id='react-select-range-listbox'] > div > div",
  WorkStyle: "#react-select-workStyle-input",
  WorkStyleListBoxValue: "div[id='react-select-workStyle-listbox'] > div > div",
  LocationAndCountires: "#react-select-regions-input",
  LocationAndCountiresValue: "div[id='react-select-regions-listbox'] > div >div >div >div",
  LocationRemote: "#react-select-location-input",
  LocationRemoteValue: "div[id='react-select-location-listbox'] > div >div ",
  DaysPerWeekInOffice: "#react-select-officeDaysPerWeekType-input",
  DaysPerWeekInOfficeValue: "div[id='react-select-officeDaysPerWeekType-listbox'] > div >div",
  AddResponsibilities: "[data-cy='Add responsibility']",
  AddResponsibilitiesInput: "#institutionName",
  SaveBtn: "[data-cy='submit']",
  RoleTypeValue: "[data-cy='role-type-value']",
  RegionValue: "[data-cy='region-value']",
  WorkStyleValue: "[data-cy='work-style-value']",
  TotalPeopleManage: "[data-cy='total-people-managed-value']",
  LocationValue: "[data-cy='location-value']",
  LocationInput: '[id^="react-select-location-input"]',
  LocationListbox: '[id^="react-select-location-listbox"]',
};

const Preferences = {
  PreferenceTab: "[data-cy='Preferences']",
  PreferenceJobTab: "[data-cy='subSidebarItemJob']",
  JoiningPreference: "#react-select-joiningPreference-input",
  JoiningPreferenceListBoxValue: "div[id='react-select-joiningPreference-listbox'] > div > div",
  BaseSalary: "#salary",
  Compasation: "#compensation",
  LanguageInput: "#react-select-languages-input",
  LanguageListBox: "div[id='react-select-languages-listbox'] > div > div",
  LocationInput: "#react-select-location-input",
  LocationListbox: "#react-select-location-listbox",
  RegionInput: "#react-select-region-input",
  RegoinListBox: "#react-select-region-listbox",
}


const createOrganization = {
  OrgOption: '[data-cy="createOrganization"]',
  StartOnboarding: '[data-cy="startOnboarding"]',
  CancelOption: '[data-cy="cancelCreateCompany"]',
  NextButton: '[data-cy="nextCreateCompany"]',
  orgURL: '[data-cy="organizationURL"]',
  OrgTypeOption: '#react-select-orgType-option-1',
  OrgTitle: '[data-cy="projectTitle"]',
  WorkEmail: '[data-cy="workEmail"]',
  NextorgButton: '[data-cy="nextCreateOrganization"]',
  ConfirmEmailmessage: '#confirmEmailMessage',
  Cancelorgbutton: '[data-cy="cancelCreateOrganization"]'

};


const createJobView = {
  profileIcon: '[data-cy="profileIcon"]',
  switchAccout: '[data-cy="switchAccounts"]',
  JobsOption: '[data-cy="Jobs"]',
  checkBox: 'svg[width="20"]',
  Jobcard: ".infinite-scroll-component > :nth-child(1)"

};


const shareLink = {
  ShareLinkOption: '[data-cy="Create-Share link"]',
  ShareLinkInputBox: 'input[placeholder="Enter or paste a link"]',
  backArrowBtn: '.jBgHQa',
  nextBtn: '[data-cy="Next"]',
  discardBtn: '[data-cy="Discard"]',
  linkPreviewImage: '.idTgrx img',
  linkPreviewTitle: '[data-ph="Add link title"]',
  shareBtn: '[data-cy="Share"]',
  tagTopics: '#tags > div',
  addDescription: '.DraftEditor-editorContainer',
  tagList: 'div[id*="react-select-tags-option"]',
  removeTag: '[data-testid="cancelSelect"]',
  backBtn: '[data-cy="backButton"]',
  discardPopupBtn: '[data-testid="deleteDiscardButton"]'
}

const Articlef = {
  Articlecontainerbox: '[cardtype="horizontal"]',
  ImagePreview: '[alt="Preview Image"]',
  commentBox: '[data-cy="commentsTextArea"]',
  PostOption: '[data-cy="addComment"]',
  saveButton: '[data-cy="saveButton"]',
  UpvoteButton: '[data-cy="upvoteButton"]',
  ShareLink: '[data-cy="shareLinkButton"]'

}

const createpost = {

  CreatepostOption: '[data-cy="Create-Post"]',
  button: '[type="button"]',
  Discardbutton: '[data-testid="cancelDiscardButton"]',
  Descriptionblock: ".DraftEditor-editorContainer",
  Submit: '[type="submit"]',
  Tags: "#tags",
  TagList: "#react-select-tags-listbox",
  CancelOption: '[data-testid="cancelSelect"]'

}

const Follow = {
  button: '[type="button"]',
  followedoption: '[data-cy="followProfile"]',
}

const Resizing = {
  resizeButton: '.react-grid-layout .react-resizable-handle.react-resizable-handle-se',
  contentBlock: '.react-grid-item.react-draggable',
}

const JobsOption={
  Jobscard: '[data-cy="jobCard"]',
  CardIcon:'[data-cy="cardIcon"]',
  JobBox: '[data-cy="addJobCard"]',
  SaveIcon: '[data-cy="saveUserProfile"]',
  ApplyOption : '[data-cy="ApplyJob"]'
}



const selectors = {
  userSignUp,
  userLogin,
  resetPassword,
  userProfile,
  createpost,
  userOnboarding,
  companyProfile,
  jobDescription,
  Articlef,
  Follow,
  croncycleUserPermission,
  createArticle,
  logout,
  ProfileOptions,
  JobsOption,
  Onboarding,
  profileFollow,
  UseraddBlock,
  ArticleComments,
  addhighlightBlock,
  editNamelocation,
  createJob,
  whatYouWillDo,
  Preferences,
  createOrganization,
  createJobView,
  shareLink,
  Resizing 
};

export default selectors;