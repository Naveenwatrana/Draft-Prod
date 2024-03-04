import lang from 'common/lang';
import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const { cookieConsentText } = lang;
const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
  },

  language: {
    default: 'en',

    translations: {
      en: {
        consentModal: {
          title: cookieConsentText.consentModal.title,
          description: cookieConsentText.consentModal.description,
          acceptAllBtn: cookieConsentText.consentModal.acceptAllBtn,
          acceptNecessaryBtn: cookieConsentText.consentModal.acceptNecessaryBtn,
          showPreferencesBtn: cookieConsentText.consentModal.showPreferencesBtn,
          footer: `
            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          `,
        },
        preferencesModal: { ...cookieConsentText.preferencesModal },
      },
    },
  },
};

export default pluginConfig;
