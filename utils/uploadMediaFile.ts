import { deleteMedia, uploadToAkamai } from 'common/utils/network/endpoints';

export const uploadMediaFile = async (file: File, userName: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userName);
    const result = await fetch(uploadToAkamai, {
      method: 'POST',
      body: formData,
    });
    const { path } = await result.json();
    return path;
  } catch (error) {
    throw new Error('error uploading media files to akamai');
  }
};
export const deleteMediaFile = async (fileToDelete: string) => {
  try {
    const result = await fetch(deleteMedia, {
      method: 'POST',
      body: fileToDelete,
    });
    const { done } = await result.json();
    return done;
  } catch (error) {
    throw new Error('error deleting media file');
  }
};
