import Bugsnag from '@bugsnag/js';
import lang from 'common/lang';

const { bugSnag } = lang;
const bugSnagApiKey: string = process.env.NEXT_PUBLIC_BUGSNAG_API_KEY || '';

export const bugsnagStart = () => {
  if (bugSnagApiKey) {
    Bugsnag.start({
      apiKey: bugSnagApiKey,
    });
  } else {
    console.error(bugSnag.errorText);
  }
};
