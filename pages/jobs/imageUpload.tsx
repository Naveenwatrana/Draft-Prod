import placeholderImage from 'components/Icons/defaultProfile.svg';
import { getImageExtension } from 'common/utils/image';
import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { v4 as uuidv4 } from 'uuid';
import { IJobsImages, IJobsPictureNames } from './details/types';

const imagePath = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_UPLOAD_PATH;

export const useUploadJobsImages = () => {
  const [presignedUrl] = usePresignedUrlMutation();

  const jobsImages = async (jobImages: IJobsImages) => {
    let jobsImagePath: IJobsPictureNames[] = [];
    if (jobImages.images && jobImages.images.length > 0) {
      const allImages = jobImages.images.map(async (imageFile) => {
        if (imageFile?.file?.name !== placeholderImage) {
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
            return { [imageFile?.returnKeyName]: `${imagePath}/${fileName}` };
          }
        }
        return {};
      });
      jobsImagePath = await Promise.all(allImages);
    }
    return jobsImagePath;
  };
  return { jobsImages };
};
