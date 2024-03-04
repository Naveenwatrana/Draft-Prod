import { UploadData } from 'pages/pro/basicDetails/common/types';

// Add types to the arguments
export const uploadData: UploadData = async (
  data: { image: File | string; mantra: string, path?: string },
  updateUserDetail,
  presignedUrl,
  shouldUploadImage,
  shouldDeleteImage,
) => {
  return new Promise((resolve, reject) => {
    (async () => {
      let profileImagePath = '';

      if (shouldUploadImage && data.image) {
        const file = data.image as File;
        const imagePath = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_UPLOAD_PATH;

        try {
          const getPreSignedUrl = await presignedUrl({
            location: imagePath,
            fileName: file.name,
          }).unwrap();

          const uploadToS3 = await fetch(getPreSignedUrl.data.pre_signed_url, {
            method: 'PUT',
            body: file,
          });

          if (uploadToS3.ok) {
            profileImagePath = `${imagePath}/${file.name}`;
          }
        } catch (error: any) {
          reject(error);
        }
      }

      const profileCoverData = {
        ...((shouldDeleteImage && data.path) ? { profile_cover: null } : {}),
      };

      try {
        updateUserDetail({
          ...(data.mantra ? { mantra: data.mantra } : { mantra: null }),
          ...(profileImagePath ? { profile_cover: profileImagePath } : profileCoverData),
          ...((shouldDeleteImage && data.path) ? { deleted_profile_cover: data.path } : {}),
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    })();
  });
};
