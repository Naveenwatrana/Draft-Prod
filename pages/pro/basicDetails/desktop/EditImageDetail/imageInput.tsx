import { useCallback, useEffect, useState } from 'react';
import lang from 'common/lang';
import { Controller } from 'react-hook-form';
import ImageTitle from 'pages/pro/basicDetails/common/imageTitle';
import { ImageInputProps } from 'pages/pro/basicDetails/desktop/EditImageDetail/types';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { ImageContainerHeader } from './style';

const ImageInput = ({
  control,
  error,
  imagePreview,
  setValue,
  trigger,
  labelText,
  editPictureName,
}: ImageInputProps) => {
  const [imageName, setImageName] = useState('');
  const { onBoarding: { image } } = lang;

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setValue('image', file);
    const isSuccess = await trigger('image');
    if (isSuccess) {
      imagePreview(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const removeImage = useCallback(() => {
    setValue('image', '');
    trigger('image');
    imagePreview('');
    setImageName('');
  }, []);

  useEffect(() => {
    editPictureName && setImageName(editPictureName);
  }, [editPictureName]);

  return (
    <Controller
      name="image"
      control={control}
      render={() => (
        <>
          <ImageContainerHeader>{labelText}</ImageContainerHeader>
          {imageName && (
            <ImageTitleWrapper height="276px">
              <ImageTitle fileName={imageName} removeImage={removeImage} />
            </ImageTitleWrapper>
          )}
          {!imageName && (
            <ImageUpload
              onDrop={onDrop}
              height="276px"
              error={!!error?.message}
              labelText={image.imageInputLabel}
              labelBrowse={image.imageInputBrowse}
              info={image.imageInputInfo}
            />
          )}
        </>
      )}
    />
  );
};

export default ImageInput;
