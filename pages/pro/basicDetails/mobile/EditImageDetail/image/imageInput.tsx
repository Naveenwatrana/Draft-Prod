import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ImageInputProps } from 'pages/pro/basicDetails/mobile/EditImageDetail/image/types';
import ImageUpload from 'components/ImageUpload/ImageUpload';

const ImageInput = ({
  labelText,
  labelBrowse,
  info,
  error,
  control,
  setValue,
  trigger,
  setEditPictureName,
  setPicture,
}: ImageInputProps) => {
  const [, setLoading] = useState(false);
  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    setValue('image', file);
    const isSuccess = await trigger('image');
    if (isSuccess) {
      setPicture(URL.createObjectURL(file));
      setEditPictureName(file.name);
    }
    setLoading(false);
  };

  return (
    <Controller
      name="image"
      control={control}
      render={() => (
        <ImageUpload
          onDrop={onDrop}
          height="450px"
          error={!!error?.message}
          labelText={labelText}
          labelBrowse={labelBrowse}
          info={info}
          withHeader
        />
      )}
    />
  );
};

export default ImageInput;
