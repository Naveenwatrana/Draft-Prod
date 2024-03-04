import { NextApiHandler } from 'next';
import { validateUrlWithProtocol } from 'common/utils/validateUrlWithProtocol';
import axios from 'axios';
import { extractWebsiteName } from './utils';

export const findOgImage = (value: string) => {
  const indexOfTitle = value.indexOf('<meta property="og:image"');
  const indexOfTitleEnd = value.indexOf('>', indexOfTitle);
  const metaTitleTag = value.substring(indexOfTitle, indexOfTitleEnd);
  return metaTitleTag;
};
export const findOgTitle = (value: string) => {
  const indexOfTitle = value.indexOf('<meta property="og:title"');
  const indexOfTitleEnd = value.indexOf('>', indexOfTitle);
  const metaTitleTag = value.substring(indexOfTitle, indexOfTitleEnd).replace(new RegExp(`&#${'x27;'}`, 'g'), "'");
  return metaTitleTag;
};
export const extractContent = (value: string) => {
  const indexOfTitle = value.indexOf('content="');
  const content = value.substring(indexOfTitle + 9, value.length);
  const indexOfTitleEnd = content.indexOf('"');
  const metaTitleTag = content.substring(0, indexOfTitleEnd);
  return metaTitleTag;
};

const handler: NextApiHandler = async (req, res) => {
  const { url } = JSON.parse(req.body);
  const websiteLink = extractWebsiteName(url);
  if (req.method === 'POST') {
    try {
      const response = await axios.get(validateUrlWithProtocol(url));
      const ogImage = extractContent(findOgImage(response.data));
      const ogTitle = extractContent(findOgTitle(response.data));
      res.json({ image: ogImage, title: ogTitle, websiteLink });
    } catch (error) {
      console.error('error in fetching url', error);
      res.status(200).json({ image: '', title: '', websiteLink });
    }
  }
};

export default handler;
