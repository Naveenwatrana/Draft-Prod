import { UploadData } from 'pages/pro/onboarding/common/types';

export const uploadData: UploadData = (data, onboarding, presignedUrl) => {
  return new Promise((resolve, reject) => {
    (async () => {
      let profileImagePath = '';

      if (data?.image && presignedUrl) {
        const file = data.image;
        const imagePath = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_UPLOAD_PATH;

        try {
          const getPreSignedUrl = await presignedUrl({
            location: imagePath,
            fileName: data.image.name,
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

      try {
        onboarding({
          ...(data?.mantra ? { mantra: data.mantra } : {}),
          ...(profileImagePath ? { profile_cover: profileImagePath } : {}),
          type: 'onboarding',
          onboarding_step: 2,
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    })();
  });
};
