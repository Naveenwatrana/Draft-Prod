export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
export const getFileExtension = (fileType: string) => {
  return fileType.split('/')[1];
};

const fileTypes = {
  'video/quicktime': 'mov',
};

export const getFileFromUrl = async (url: string, fileType?: string) => {
  const responding = await fetch(url);
  const response = await responding.blob();
  const fileName = `img_${getRandomNumber(25, 100)}.${fileTypes[fileType as keyof typeof fileTypes] || getFileExtension(response.type)}`;
  return new File([response], fileName, { type: fileType || response.type });
};

export const checkLocalImage = (url: string) => {
  try {
    const localUrl = window.location.origin;
    return url.includes(localUrl);
  } catch (e) {
    return false;
  }
};
