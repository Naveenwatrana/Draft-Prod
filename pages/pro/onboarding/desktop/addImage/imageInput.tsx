import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import lang from 'common/lang';
import { InputType } from 'components/input/types';
import { Controller } from 'react-hook-form';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import { ImageInputProps } from 'pages/pro/onboarding/desktop/addImage/types';
import UploadContainer from 'pages/pro/onboarding/common/uploadContainer';
import Loading from 'pages/pro/onboarding/common/loading';
import UploadContent from 'pages/pro/onboarding/common/uploadContent';
import {
  ErrorText, FileInput, FileInputWrapper, UploadLabel, UploadWrapper,
} from './styles';

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
  const [loading, setLoading] = useState(false);
  const {
    onBoarding: { image },
  } = lang;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      if (!imageName) {
        setLoading(true);
        const file = acceptedFiles[0];
        setValue('image', acceptedFiles[0]);
        const isSuccess = await trigger('image');
        if (isSuccess) {
          imagePreview(URL.createObjectURL(file));
          setImageName(file.name);
        }
        setLoading(false);
      }
    },
  });

  const removeImage = useCallback(() => {
    setValue('image', '');
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
      render={({ field: { onChange } }) => (
        <>
          <UploadLabel>{labelText}</UploadLabel>
          <FileInputWrapper error={!!error}>
            <UploadContainer getRootProps={getRootProps} imageName={imageName}>
              {error && <ErrorText component="p">{error.message}</ErrorText>}
              <UploadWrapper>
                {loading && <Loading />}

                {!loading && !imageName && (
                  <UploadContent
                    labelText={image.imageInputLabel}
                    labelBrowse={image.imageInputBrowse}
                    info={image.imageInputInfo}
                  />
                )}

                {imageName && (
                  <ImageTitle fileName={imageName} removeImage={removeImage} />
                )}
              </UploadWrapper>
              {!imageName && (
                <FileInput
                  id="image"
                  data-cy="onboarding-image"
                  type={InputType.FILE}
                  {...getInputProps({ onChange })}
                />
              )}
            </UploadContainer>
          </FileInputWrapper>
        </>
      )}
    />
  );
};

export default ImageInput;
