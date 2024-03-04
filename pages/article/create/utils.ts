import { checkLocalImage, getFileFromUrl } from 'components/CardCreationWizard/components/CardFields/CoverCardFields/util';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { ApiCard } from './types';

export const getMediaFiles = async (allMediaFiles: ApiCard[], userName :string): Promise<ApiCard[]> => {
  try {
    const cards = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const card of allMediaFiles) {
      if (card.fields.media || card.fields.logo) {
        const isLocal = checkLocalImage(card.fields.media as string);
        const isLogoLocal = checkLocalImage(card.fields.logo as string);
        let filePath = '';
        let logoFilePath = '';
        if (isLocal) {
          const file = await getFileFromUrl(card.fields.media as string, card.fields?.fileType);
          filePath = await uploadMediaFile(file, userName);
        } else {
          filePath = card.fields.media as string;
        }
        if (isLogoLocal) {
          const file = await getFileFromUrl(card.fields.logo as string, card.fields?.fileType);
          logoFilePath = await uploadMediaFile(file, userName);
        } else {
          logoFilePath = card.fields.logo as string;
        }
        cards.push({
          ...card,
          fields: {
            ...card.fields,
            media: filePath,
            logo: logoFilePath,
          },
        });
      } else {
        cards.push(card);
      }
    }
    return cards;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('e', e);
    return [];
  }
};
