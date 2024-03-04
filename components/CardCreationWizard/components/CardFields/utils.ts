import {
  FILE_SIZE_TWENTY_MB, FILE_SIZE_ONE_MB, FILE_SIZE_VIDEO_LIMIT, SUPPORTED_FORMATS, VIDEO_LENGTH_LIMIT, VIDEO_WIDTH_LIMIT,
} from 'common/constants';

export const validateMedia = async (file: { file: File }): Promise<boolean> => {
  if (file && file.file) {
    return mediaValidations(file.file);
  } else {
    return false;
  }
};

export const mediaValidations = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    if (['image/jpeg', 'image/png'].some((url) => file.type?.includes(url))) {
      if (file.size <= FILE_SIZE_TWENTY_MB) {
        resolve(true);
      } else {
        resolve(false);
      }
    }
    if (['video/quicktime', 'video/mp4'].some((url) => file.type?.includes(url))) {
      window.URL = window.URL || window.webkitURL;
      const video = document.createElement('video');
      video.preload = 'metadata';

      if (file.size > FILE_SIZE_VIDEO_LIMIT) {
        resolve(false);
      }
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const {
          duration, videoWidth, videoHeight,
        } = video;
        if (file.size <= FILE_SIZE_VIDEO_LIMIT && duration <= VIDEO_LENGTH_LIMIT && videoWidth <= VIDEO_WIDTH_LIMIT && videoHeight <= VIDEO_WIDTH_LIMIT) {
          resolve(true);
        } else {
          resolve(false);
        }
      };

      video.src = URL.createObjectURL(file);
    }
  });
};

export const validateUserMediaOptional = async (file: { file: File }): Promise<boolean> => {
  if (typeof file === 'string' || !file) {
    return true;
  }
  if (file && file.file) {
    return validateMedia(file);
  } else {
    return false;
  }
};

export const validateLogoFile = async (file: { file: File }): Promise<boolean> => {
  if (typeof file === 'string' || !file) {
    return true;
  }
  return file?.file?.size <= FILE_SIZE_ONE_MB && SUPPORTED_FORMATS.includes(file?.file?.type);
};

export const removeURLSpace = (url: string) => url.replaceAll(' ', '%20');
