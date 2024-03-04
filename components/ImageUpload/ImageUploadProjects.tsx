import lang from 'common/lang';
import { useState, useEffect } from 'react';
import CancelIcon from 'components/Icons/CrossIcon';
import { getImageName } from 'common/utils/image';
import { theme } from 'common/theme';
import {
  IDeletedImages, ImageField, IProjectImage,
} from 'pages/pro/components/Projects/types';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import {
  File, Files, ImageDetails, Thumbnail, ThumbnailContent, ThumnailText,
} from 'components/ImageUpload/styles';
import { IImage, ImageUploadProjectsProps } from 'components/ImageUpload/types';
import ButtonComp from 'components/buttonComp';
import CheckIcon from 'components/Icons/CheckIcon';
import TextComp from 'components/textComp';
import { SUPPORTED_IMAGE_FORMATS } from 'common/constants';
import { ImagesMeta, UploadedImage, UploadedImageContainer } from '../../pages/pro/components/Projects/styles';

const { projects } = lang;
const totalVideoLimit = 2;

export const ImageUploadProjects = ({
  labelText, info, updateValue, savedImages, setDeletedImages, persistedImages,
}: ImageUploadProjectsProps) => {
  const [picture, setPicture] = useState<IImage[]>(persistedImages || []);
  const [error, setError] = useState<boolean>(false);
  const [storedImages, setStoredImages] = useState<IProjectImage[] | undefined>(savedImages);
  const [removedPicture, setRemovedPicture] = useState<IDeletedImages[]>();
  const storedImagesLength = storedImages?.length || 0;
  const totalUploadedImages = (picture?.length || 0) + storedImagesLength;
  const onDrop = (files: File[]) => {
    const existingPictures = picture || [];
    const filesWithTimeStamp: IImage[] = files.map((file) => ({ file, id: uuidv4() }));
    const pictures = [...existingPictures, ...filesWithTimeStamp];
    // Set the first picture as default thumbnail
    if (existingPictures.length === 0 && (storedImages?.length === 0 || !storedImages)) {
      filesWithTimeStamp[0].featured = true;
    }
    if ((pictures.length + storedImagesLength) > totalVideoLimit) {
      setError(true);
      return;
    }
    setPicture(pictures);
    updateValue(pictures.map(({ file, featured }) => ({ file, featured })), ImageField.IMAGE);
    if (pictures.length >= totalVideoLimit) {
      setError(true);
    } else {
      setError(false);
    }
  };
  useEffect(() => {
    if (totalUploadedImages >= 2) {
      setError(true);
    }
  }, [totalUploadedImages]);
  const onChange = () => {
    // TODO:
  };
  const removePhoto = (id: string) => {
    const images = picture?.filter((pic) => pic.id !== id);
    setPicture(images);
    setError(false);
  };
  const removeSavedPhoto = (id: string) => {
    if (!storedImages) {
      return;
    }
    const images = storedImages.filter((pic) => pic.imagePath !== id);
    if (images.length > 0) {
      images[0].featured = true;
    }
    setStoredImages(images);
    updateValue(images.map(({ imagePath, featured }) => ({ imagePath, featured })), ImageField.SAVEDIMAGES);

    const deletedPicture = storedImages.find((pic) => pic.imagePath === id);
    if (deletedPicture) {
      const removed = removedPicture || [];
      const allRemovedPictures = [...removed, { id: deletedPicture.id, imagePath: deletedPicture?.imagePath }];
      setRemovedPicture(allRemovedPictures);
      setDeletedImages(allRemovedPictures);
    }
    setError(false);
  };
  const selectUploadPhotoThumbnails = (imageId: string, photos: IImage[]) => {
    const pics = photos.map(({ id, file }) => id === imageId ? ({ id, file, featured: true }) : ({ id, file, featured: false }));
    setPicture(pics);
    updateValue(pics, ImageField.IMAGE);
  };
  const selectSavedPhotoThumbnails = (imageId: string, photos: IProjectImage[]) => {
    const storedImagesPic = photos.map((p) => p.imagePath === imageId ? ({ ...p, featured: true }) : ({ ...p, featured: false }));
    setStoredImages(storedImagesPic);
    updateValue(storedImagesPic, ImageField.SAVEDIMAGES);
  };
  const handleSelectThumbnail = (imageId: string, photos: IImage[], storedPhotos: IProjectImage[]) => {
    const pics = photos.map((p) => ({ ...p, featured: false }));
    let selectedImage = pics.findIndex((p) => p.id === imageId);
    const storedImagesPic = storedPhotos.map((p) => ({ ...p, featured: false }));
    if (selectedImage === -1) {
      selectedImage = storedImagesPic.findIndex((p) => p.imagePath === imageId);
      storedImagesPic[selectedImage].featured = true;
    } else {
      pics[selectedImage].featured = true;
    }
    setPicture(pics);
    setStoredImages(storedImagesPic);
    updateValue(pics, ImageField.IMAGE);
    updateValue(storedImagesPic, ImageField.SAVEDIMAGES);
  };
  const selectThumbnail = (imageId: string) => {
    if (picture && !storedImages) {
      // handle only new uploaded pictures
      selectUploadPhotoThumbnails(imageId, picture);
    }
    if (!picture && storedImages) {
      // handle only stored images
      selectSavedPhotoThumbnails(imageId, storedImages);
    }
    if (!picture || !storedImages) {
      return;
    }
    handleSelectThumbnail(imageId, picture, storedImages);
  };
  return (
    <>
      <ImageUpload
        error={error}
        labelText={labelText}
        info={info}
        onDrop={onDrop}
        onChange={onChange}
        data-cy="projectImageUpload"
        accept={SUPPORTED_IMAGE_FORMATS}
      />
      <ImagesMeta>
        <TextComp>{projects.uploadLimit}</TextComp>
        <TextComp>
          {totalUploadedImages}
          /
          {totalVideoLimit}
        </TextComp>
      </ImagesMeta>
      {(picture || storedImages) && (
        <Files>
          {storedImages?.map(({ imagePath, featured }) => (
            <File key={getImageName(imagePath)}>
              <UploadedImageContainer onClick={() => selectThumbnail(imagePath)} data-cy="projectSelectThumbnail">
                {featured && (
                  <Thumbnail>
                    <ThumbnailContent>
                      <CheckIcon size={16} color={theme.palette.white['100'].value} />
                      <ThumnailText>{projects.thumbnail}</ThumnailText>
                    </ThumbnailContent>
                  </Thumbnail>
                )}
                <UploadedImage src={imagePath} />
              </UploadedImageContainer>
              <ImageDetails>
                <TextComp>{getImageName(imagePath)}</TextComp>
                <ButtonComp
                  onClick={() => removeSavedPhoto(imagePath)}
                  label={<CancelIcon size={10} />}
                  variant="link"
                  data-cy="projectRemoveImage"
                />
              </ImageDetails>
            </File>
          ))}
          {picture?.map(({ file, id, featured }) => (
            <File key={id}>
              <UploadedImageContainer onClick={() => selectThumbnail(id)} data-cy="projectSelectThumbnail">
                {featured && (
                  <Thumbnail>
                    <ThumbnailContent>
                      <CheckIcon size={16} color={theme.palette.white['100'].value} />
                      <ThumnailText>Thumbnail</ThumnailText>
                    </ThumbnailContent>
                  </Thumbnail>
                )}
                <UploadedImage src={URL.createObjectURL(file)} />
              </UploadedImageContainer>
              <ImageDetails>
                <TextComp>{file.name}</TextComp>
                <ButtonComp
                  onClick={() => removePhoto(id)}
                  label={<CancelIcon size={10} />}
                  data-cy="projectRemoveImage"
                  variant="link"
                />
              </ImageDetails>
            </File>
          ))}
        </Files>
      )}
    </>
  );
};

export default ImageUploadProjects;
