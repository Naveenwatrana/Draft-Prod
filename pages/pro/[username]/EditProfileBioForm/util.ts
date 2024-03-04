import { IEditProfileBioFormFields } from './type';

export const mapProfileData = (
  data: IEditProfileBioFormFields,
  image: string | null,
) => {
  const dataToReturn = {
    mantra: data.mantra,
    location: data.location?.label,
    first_name: data.firstName,
    last_name: data.lastName,
    cards: data.cards,
  };
  if (image) {
    return {
      ...dataToReturn,
      profile_image: image,

    };
  }
  return dataToReturn;
};
