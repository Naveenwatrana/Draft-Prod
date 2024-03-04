import * as CookieConsent from 'vanilla-cookieconsent';

const section1 = {
  id: 1,
  data: [
    {
      type: 'heading1',
      value: '1. Introduction',
    },
    {
      type: 'text',
      value: 'At The Draft Ecosystem Corp. , d/b/a The Draft ("us", "we", "our" or the "Company") we value your privacy and the importance of safeguarding your data. This Privacy Policy (the "Policy") describes our privacy practices for the activities set out below. As per your rights, we inform you how we collect, store, access, and otherwise process information relating to individuals. In this Policy, personal data ("Personal Data") refers to any information that on its own, or in combination with other available information, can identify an individual. We are committed to protecting your privacy in accordance with the highest level of privacy regulation. As such, we follow the obligations under the below regulations:',
    },
    {
      type: 'list',
      list: [
        'Canada\'s Personal Information Protection and Electronic Documents Act (PIPEDA) and the applicableprovincial legislations',
        'The EU\'s General Protection Data Regulation (GDPR)',
        'Brazil\'s Data Protection Legislation (LGPD)',
        'California\'s Consumer Protection Act (CCPA) / California Privacy Rights Act (CPRA) and California OnlinePrivacy Protection Act (CalOPPA)',
        'Colorado Privacy Act (CPA)',
        'Utah Consumer Privacy Act (UCPA)',
        'Connecticut Data Privacy Act (CTDPA)',
        'Virginia Consumer Data Protection Act (VCDPA)',
        'South Africa\'s Protection of Personal Information Act (POPIA)',
      ],
    },
    {
      type: 'heading2',
      value: 'Scope',
    },
    {
      type: 'text',
      value: 'This policy applies to the The Draft Ecosystem Corp. websites, domains, applications, services, and products. This Policy does not apply to third-party applications, websites, products, services or platforms that may be accessed through (non-) links that we may provide to you. These sites are owned and operated independently from us, and they have their own separate privacy and data collection practices. Any Personal Data that you provide to these websites will be governed by the third-party\'s own privacy policy. We cannot accept liability for the actions or policies of these independent sites, and we are not responsible for the content or privacy practices of such sites.',
    },
    {
      type: 'heading2',
      value: 'Processing Activities',
    },
    {
      type: 'text',
      value: 'This Policy applies when you interact with us by doing any of the following:',
    },
    {
      type: 'list',
      list: [
        'Make use of our application and services as an authorized user',
        'Visit any of our websites that link to this Privacy Statement',
      ],
    },
  ],
};
const section2 = {
  id: 2,
  data: [
    {
      type: 'heading1',
      value: '2. Personal Data We Collect',
    },
    {
      type: 'heading2',
      value: 'What Personal Data We Collect',
    },
    {
      type: 'text',
      value: 'When you make a purchase, or attempt to make a purchase, we collect the following types of Personal Data:',
    },
    {
      type: 'text',
      value: 'This includes:',
    },
    {
      type: 'list',
      list: [
        'Account Information such as your name, email address, and password',
        'Payment Information such as your billing address, phone number, credit card, debit card or other payment method',
      ],
    },
    {
      type: 'text',
      value: 'When you use our products and/or features, we collect the following types of Personal Data:',
    },
    {
      type: 'list',
      list: [
        'Account Information such as your name, email address, and password',
        'Payment Information such as your billing address, phone number, credit card, debit card or other paymentmethod',
      ],
    },
    {
      type: 'heading2',
      value: 'How We Collect Your Personal Data',
    },
    {
      type: 'text',
      value: 'We collect Personal Data from the following sources:',
    },
    {
      type: 'paragraphTitle',
      value: 'From You:',
    },
    {
      type: 'text',
      value: 'You may give us your Account Information, Payment Information, Financial Information, Demographic Data, Purchase Information, Content, Feedback, Product Information, by filling in forms, using our products or services, entering information online or by corresponding with us by post, phone, email or otherwise. This includes Personal Data you provide, for example, when you:',
    },
    {
      type: 'list',
      list: [
        'Create an account or purchase products on our website;',
        'Use our products or services;',
        'Create content through our products or services;',
        'Express interest in our products or services;',
        'Downloading software and/or our mobile application;',
        'Subscribe to our newsletter;',
        'Complete a voluntary market research survey;',
        'Contact us with an inquiry or to report a problem (by phone, email, social media, or messaging service);',
        'When you log in to our website via social media;',
      ],
    },
    {
      type: 'text',
      value: 'Automated technologies or interactions: As you interact with our website, we may automatically collect the following types of data (all as described above): Device Data about your equipment, Usage Data about your browsing actions and patterns, and Contact Data where tasks carried out via our website remain uncompleted, such as incomplete orders or abandoned baskets. We collect this data by using cookies, server logs and other similar technologies. Please see our Cookie section (below) for further details.',
    },
    {
      type: 'text',
      value: 'Third parties: We may receive Personal Data about you from various third parties, including:',
    },
    {
      type: 'list',
      list: [
        'Account Information and Payment Information from another individual when they purchase a gift for you on our website;',
        'Device and Usage Data from third parties, including analytics providers such as Google;',
        'Account Information and Payment Data from social media platforms when you log in to our website using such social media platforms;',
        'Content from communication services, including email providers and social networks, when you give us permission to access your data on such third-party services or networks;',
        'Account Information and Payment Data from third parties, including organizations {such as law enforcement agencies). associations and groups, who share data for the purposes of fraud prevention and detection and credit risk reduction; and',
        'Account Information, Payment Data, and Financial Data from providers of technical, payment and delivery services.',
      ],
    },
    {
      type: 'text',
      value: 'If you provide us, or our service providers, with any Personal Data relating to other individuals, you represent that you have the authority to do so and acknowledge that it will be used in accordance with this Policy. If you believe that your Personal Data has been provided to us improperly, or to otherwise exercise your rights relating to yourPersonal Data, please contact us by using the information set out in the "Contact us" section below.',
    },
    {
      type: 'heading2',
      value: 'Device and Usage Data',
    },
    {
      type: 'text',
      value: 'When you visit a The Draft website, we automatically collect and store information about your visit using browser cookies (files which are sent by us to your computer). or similar technology. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help Feature on most browsers will provide information on how to accept cookies, disable cookies or to notify you when receiving a new cookie. If you do not accept cookies, you may not be able to use some features of our Service and we recommend that you leave them turned on.',
    },
    {
      type: 'heading2',
      value: 'Data we collect from third parties',
    },
    {
      type: 'text',
      value: 'We may receive your Personal Data from third parties such as companies subscribing to The Draft EcosystemCorp. services, partners and other sources. This Personal Data is not collected by us but by a third party and is subject to the relevant third party\'s own separate privacy and data collection policies. We do not have any control or input on how your Personal Data is handled by third parties. As always, you have the right to review and rectify this information. If you have any questions you should first contact the relevant third party for further information about your Personal Data. Where that third party is unresponsive to your rights, you may contact the DataProtection Officer at The Draft Ecosystem Corp. (contact details below).Our websites and services may contain links to other websites, applications and services maintained by third parties. The information practices of such other services, or of social media networks that host our branded social media pages, are governed by third parties\' privacy statements, which you should review to better understand those third parties\' privacy practices.',
    },
    {
      type: 'heading2',
      value: 'Purpose and Legal Basis for the Processing of Personal Data',
    },
    {
      type: 'text',
      value: 'We collect and use your Personal Data with your consent to provide, maintain, and develop our products and services and understand how to improve them.',
    },
    {
      type: 'text',
      value: 'These purposes include:',
    },
    {
      type: 'list',
      list: [
        'To deliver your product or service',
        'To fulfill orders including electronic and non-electronic shipment',
        'To verify or authenticate your identity; and',
        'Investigate and prevent security incidents such as breaches, attacks and hacks',
        'Providing, Developing, and Improving our Products and Services',
        'Deliver, maintain, debug and improve our products and services.',
        'Enable you to access The Draft Ecosystem Corp. services and set up accounts.',
        'Provide you with technical and customer support',
        'Organize and Deliver Advertising and Marketing',
        'Send you newsletters and other marketing communications about current and future products, programs and services, events, competitions, surveys and promotions held by us or hosted on our behalf; and',
        'Organize events or register attendees and schedule meetings for events.',
      ],
    },
    {
      type: 'heading2',
      value: 'International Data Transfer and Storage',
    },
    {
      type: 'text',
      value: 'Where possible, we store and process data on servers within the general geographical region where you reside(note: this may not be within the country in which you reside). Your Personal Data may also be transferred to, and maintained on, servers residing outside of your state, province, country or other governmental jurisdiction where the data laws may differ from those in your jurisdiction. We will take appropriate steps to ensure that your PersonalData is treated securely and in accordance with this Policy as well as applicable data protection law. More information about these clauses can be found',
      href: { url: 'https://eur-lex.europa.eu/homepage.html', label: 'here.' },
    },
    {
      type: 'heading2',
      value: 'Sharing and Disclosure',
    },
    {
      type: 'text',
      value: 'We will share your Personal Data with third parties only in the ways set out in this Policy or set out at the point when the Personal Data is collected.We also use Google Analytics to help us understand how our customers use the site. You can read more about how Google uses your Personal Data',
      href: { url: 'https://policies.google.com/privacy', label: 'here.' },
    },
    {
      type: 'text',
      value: 'You can also opt-out of Google Analytics',
      href: { url: 'https://tools.google.com/dlpage/gaoptout', label: 'here.' },
    },
    {
      type: 'text',
      value: 'We may also use your Personal Data to provide you with targeted marketing via advertisements or communications(such as newsletters).',
    },
    {
      type: 'text',
      value: 'For more information about how targeted advertising works, you can visit the Network Advertising Initiative\'s ("NAI") educational page',
      href: { url: 'https://thenai.org/about-online-advertising/how-does-it-work/', label: 'here.' },
    },
    {
      type: 'text',
      value: 'Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance\'s opt-out portal',
      href: { url: 'https://optout.aboutads.info/', label: 'here.' },
    },
    {
      type: 'heading2',
      value: 'Legal Requirement',
    },
    {
      type: 'text',
      value: 'We may use or disclose your Personal Data in order to comply with a legal obligation, in connection with a request from a public or government authority, or in connection with court or tribunal proceedings, to prevent loss of life or injury, or to protect our rights or property. Where possible and practical to do so, we will tell you in advance of such disclosure.',
    },
    {
      type: 'heading2',
      value: 'Service Providers and Other Third Parties',
    },
    {
      type: 'text',
      value: 'We may use a third party service provider, independent contractors, agencies, or consultants to deliver and help us improve our products and services. We may share your Personal Data with marketing agencies, database service providers, backup and disaster recovery service providers, email service providers and others but only to maintain and improve our products and services. For further information on the recipients of your Personal Data, please contact us by using the information in the "Contacting us" section below.',
    },
  ],
};
const section3 = {
  id: 3,
  data: [
    {
      type: 'heading1',
      value: '3. Cookies',
    },
    {
      type: 'heading2',
      value: 'What are Cookies?',
    },
    {
      type: 'text',
      value: 'A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business. The collection of this information may be used in the function of the site and/or to improve your experience.',
    },
    {
      type: 'heading3',
      value: 'How we use cookies',
    },
    {
      type: 'list',
      list: [
        'To give you the best experience possible, we use the following types of cookies:',
        'Strictly Necessary. As a web application, we require certain necessary cookies to run our service.',
        'Analytics. Analytics allow us to count visits and traffic sources to the website, so that we can measure and improve the performance of our site. Analytics let us know which pages are the most and least popular and see how visitors move around the site.  All of the information collected from analytics cookies is aggregated so it is anonymous.',
        'Preference.',
      ],
    },
    {
      type: 'subList',
      list: [
        'We use preference cookies to help us remember the way you like to use our service.',
        'Some cookies are used to personalize content and present you with a tailored experience. For example, location could be used to give you services and offers in your area.',
      ],
    },
    {
      type: 'heading3',
      value: 'How to control your cookies',
    },
    {
      type: 'text',
      value: 'So long as the cookie is not strictly necessary, you may opt in or out of cookie use at any time. To alter the way in which we collect information from you, visit our Cookie Manager and manage your settings',
      button: {
        label: ' here.',
        onClick: () => { CookieConsent.showPreferences(); },
      },
    },
  ],
};
const section4 = {
  id: 4,
  data: [
    {
      type: 'heading1',
      value: '4. Retention & Deletion',
    },
    {
      type: 'text',
      value: 'We will only retain your Personal Data for as long as necessary for the purpose for which that data was collected and to the extent required by applicable Jaw. When we no longer need Personal Data, we will remove it from our systems and/or take steps to anonymize it.',
    },
  ],
};
const section5 = {
  id: 5,
  data: [
    {
      type: 'heading1',
      value: '5. Merger or Acquisition',
    },
    {
      type: 'text',
      value: 'If we are involved in a merger, acquisition or asset sale, your personal information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy.Under certain circumstances, we may be required to disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).',
    },
  ],
};
const section6 = {
  id: 6,
  data: [
    {
      type: 'heading1',
      value: '6. How We Keep Your Data Safe',
    },
    {
      type: 'text',
      value: 'We have appropriate organizational safeguards and security measures in place to protect your Personal Data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.',
    },
    {
      type: 'text',
      value: 'The communication between your browser and our website uses a secure encrypted connection wherever yourPersonal Data is involved.',
    },
    {
      type: 'text',
      value: 'We require any third party who is contracted to process your Personal Data on our behalf to have security measures in place to protect your data and to treat such data in accordance with the law.',
    },
    {
      type: 'text',
      value: 'In the unfortunate event of a Personal Data breach, we will notify you and any applicable regulator when we are legally required to do so.',
    },
  ],
};
const section7 = {
  id: 7,
  data: [
    {
      type: 'heading1',
      value: '7. Children\'s Privacy',
    },
    {
      type: 'text',
      value: 'We do not knowingly collect Personal Data from children under the age of 16 Years',
    },
  ],
};
const section8 = {
  id: 8,
  data: [
    {
      type: 'heading1',
      value: '8. Your Rights for Your Personal Data',
    },
    {
      type: 'text',
      value: 'Depending on your geographical location and citizenship, your rights are subject to local data privacy regulations.',
    },
    {
      type: 'text',
      value: 'These rights may include:',
    },
    {
      type: 'list',
      list: [
        'Right to Access (PIPEDA, GDPR Article 15, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD, POPIA)',
        'You have the right to learn whether we are processing your Personal Data and to request a copy of thePersonal Data we are processing about you.',
        'Right to Rectification (PIPEDA, GDPR Article 16, CPRA, CPA, VCDPA, CTDPA, LGPD, POPIA)',
        'You have the right to have incomplete or inaccurate Personal Data that we process about you rectified.',
        'Right to be Forgotten (right to erasure) (GDPR Article 17, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD,POPIA)',
        'You have the right to request that we delete Personal Data that we process about you, unless we need to retain such data in order to comply with a legal obligation or to establish, exercise or defend legal claims.',
        'Right to Restriction of Processing (GDPR Article 18, LGPD)',
        'You have the right to restrict our processing of your Personal Data under certain circumstances. In this case, we will not process your Data for any purpose other than storing it.',
        'Right to Portability (PIPEDA, GDPR Article 20, LGPD)',
        'You have the right to obtain Personal Data we hold about you, in a structured, electronic format, and to transmit such Personal Data to another data controller, where this is (a) Personal Data which you have provided to us, and (b) if we are processing that data on the basis of your consent or to perform a contract with you or the third party that subscribes to services.',
        'Right to Opt Out (CPRA, CPA, VCDPA, CTDPA, UCPA)',
        'You have the right to opt out of the processing of your Personal Data for purposes of: (1) Targeted advertising;(2) The sale of Personal Data; and/or (3) Profiling in furtherance of decisions that produce legal or similarly significant effects concerning you. Under CPRA, you have the right to opt out of the sharing of your PersonalData to third parties and our use and disclosure of your Sensitive Personal Data to uses necessary to provide the products and services reasonably expected by you.',
        'Right to Objection (GDPR Article 21, LGPD, POPIA)',
        'Where the legal justification for our processing of your Personal Data is our legitimate interest, you have the right to object to such processing on grounds relating to your particular situation. We will abide by your request unless we have compelling legitimate grounds for processing which override your interests and rights, or if we need to continue to process the Personal Data for the establishment, exercise or defense of a legal claim.',
        'Nondiscrimination and nonretaliation (CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA)',
        'You have the right not to be denied service or have an altered experience for exercising your rights.',
        'File an Appeal (CPA, VCDPA, CTDPA)',
        'You have the right to file an appeal based on our response to you exercising any of these rights. In the eventyou disagree with how we resolved the appeal, you have the right to contact the attorney general locatedhere:',
        {
          value: 'If you are based in Colorado, please visit this',
          href: { url: 'https://complaints.coag.gov/s/contact-us', label: 'website' },
          value2: 'to file a complaint.',
        },
        {
          value: 'If you are based in Virginia, please visit this ',
          href: { url: 'https://portal.ct.gov/AG/Common/Complaint-Form-Landing-page', label: 'website' },
          value2: ' to file a complaint.',
        },
        {
          value: 'If you are based in Connecticut, please visit this ',
          href: { url: 'https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint', label: 'website' },
          value2: ' to file a complaint.',
        },
        'File a Complaint (GDPR Article 77, LGPD, POPIA)',
        {
          value: 'You have the right to bring a claim before their competent data protection authority.If you are based in the EEA, please visit this ',
          href: { url: 'https://commission.europa.eu/law/law-topic/data-protection_en', label: 'website' },
          value2: ' for a list of local data protection authorities.',
        },
      ],
    },
    {
      type: 'heading2',
      value: 'Withdrawing Consent',
    },
    {
      type: 'text',
      value: 'If you have consented to our processing of your Personal Data, you have the right to withdraw your consent at anytime, free of charge, such as where you wish to opt out from marketing messages that you receive from us. If you wish to withdraw your consent, please contact us using the information found at the bottom of this page.',
    },
    {
      type: 'heading2',
      value: 'How to Exercise Your Rights',
    },
    {
      type: 'text',
      value: 'You can make a request to exercise any of these rights in relation to your Personal Data by sending the request to our privacy team by using the form below.For your own privacy and security, at our discretion, we may require you to prove your identity before providing the requested information.',
    },
  ],
};
const section9 = {
  id: 9,
  data: [
    {
      type: 'heading1',
      value: '9. Changes',
    },
    {
      type: 'text',
      value: 'We may modify this Policy at any time. If we make changes to this Policy then we will post an updated version of this Policy at this website. When using our services, you will be asked to review and accept our Privacy Policy. In this manner, we may record your acceptance and notify you of any future changes to this Policy.',
    },
  ],
};
const section10 = {
  id: 10,
  data: [
    {
      type: 'heading1',
      value: '10. Contact Us',
    },
    {
      type: 'text',
      value: 'To request a copy of your information, unsubscribe from our email list, request for your data to be deleted, or ask a question about your data privacy contact us at ',
      href: {
        url: 'mailto:comms@thedraft.io',
        label: 'comms@thedraft.io',
      },
    },
  ],
};
export const privacySections = [section1, section2, section3, section4, section5, section6, section7, section8, section9, section10];
