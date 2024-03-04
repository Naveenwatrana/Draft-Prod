import { getImageExtension, getImageName } from 'common/utils/image';
import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { IProjectPictureNames } from 'pages/pro/types';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { IProjectValues } from 'pages/pro/components/Projects/types';

const imagePath = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_UPLOAD_PATH;

export const useProjects = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [presignedUrl] = usePresignedUrlMutation();

  const saveProjectImages = async (formData: IProjectValues) => {
    let profileImagePath: IProjectPictureNames[] = [];
    if (formData.image && formData.image.length > 0) {
      setLoading(true);
      const allImages = formData.image.map(async (imageFile) => {
        const imageExtension = getImageExtension(imageFile?.file?.name || '');
        const fileName = `${uuidv4()}.${imageExtension}`;
        const getPreSignedUrl = await presignedUrl({
          location: imagePath,
          fileName,
        }).unwrap();
        const uploadToS3 = await fetch(getPreSignedUrl.data.pre_signed_url, {
          method: 'PUT',
          body: imageFile.file,
        });
        if (uploadToS3.ok) {
          return { name: `${imagePath}/${fileName}`, featured: imageFile.featured };
        }
        return { name: '', featured: false };
      });
      profileImagePath = await Promise.all(allImages);
      setLoading(false);
    }
    if (formData.savedImages && formData.savedImages.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for await (const imageFile of formData.savedImages) {
        if (imageFile.imagePath) {
          profileImagePath.push({ name: `${imagePath}/${getImageName(imageFile.imagePath)}`, featured: imageFile.featured });
        }
      }
    }
    return profileImagePath;
  };
  return { saveProjectImages, loading };
};
