import lang from 'common/lang';

const { errorInFetchingUrl } = lang.errorMessages;
export function extractWebsiteName(url: string): string | null {
  try {
    const urlObject = new URL(url);
    let websiteName = urlObject.hostname;

    websiteName = websiteName.replace(/^www\./, '');
    if (websiteName.includes('play.google.com')) {
      return 'Google Play';
    }
    if (websiteName.includes('apps.apple.com')) {
      return 'App Store';
    }
    if (websiteName.includes('open.spotify.com')) {
      return 'spotify.com';
    }
    if (websiteName.includes('instagram.com')) {
      return 'Instagram';
    }
    return websiteName;
  } catch (error) {
    console.error('Error extracting website name:', (error as Error).message);
    return null;
  }
}
export function extractGithubUsername(url: string): string | null {
  try {
    const urlObject = new URL(url);
    let websiteName = urlObject.hostname;

    websiteName = websiteName.replace(/^www\./, '');
    if (websiteName.includes('github.com')) {
      return urlObject.pathname.split('/')[1];
    }
    return null;
  } catch (error) {
    console.error(errorInFetchingUrl, (error as Error).message);
    return null;
  }
}
