export const isAkamaiImage = (media?: string) => {
  if (media && media.includes(process.env.NEXT_PUBLIC_AKAMAI_LINK as string)) {
    return true;
  }
  return false;
};

export const getImageCropSize = (width = 1920, height = 1080) => {
  if (height >= 1055) {
    return {
      width: 440,
      height: 780,
    };
  } else if (height >= 855) {
    return {
      width: 364,
      height: 650,
    };
  }
  return {
    width: 291,
    height: 520,
  };
};
