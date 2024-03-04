import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import UploadContainer from 'pages/pro/onboarding/common/uploadContainer';
import Loading from 'pages/pro/onboarding/common/loading';
import UploadContent from 'pages/pro/onboarding/common/uploadContent';
import { ImageInputProps } from 'pages/pro/onboarding/mobile/addImage/image/types';
import { ErrorMessage, FileInput, FileInputBorder } from '../../styles';

const ImageInput = ({
  labelText,
  labelBrowse,
  info,
  error,
  id,
  type,
  control,
  setValue,
  trigger,
  setPicture,
  setFileName,
}: ImageInputProps) => {
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      const file = acceptedFiles[0];
      setValue('image', file);
      const isSuccess = await trigger('image');
      if (isSuccess) {
        setPicture(URL.createObjectURL(file));
        setFileName(file.name);
      }
      setLoading(false);
    },
  });

  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { onChange } }) => (
        <FileInputBorder error={!!error}>
          <ErrorMessage havingError={!!error} component="p">
            {error?.message}
          </ErrorMessage>
          <UploadContainer getRootProps={getRootProps}>
            {loading && <Loading />}
            {!loading && (
              <UploadContent
                labelText={labelText}
                labelBrowse={labelBrowse}
                info={info}
              />
            )}
            <FileInput
              id={id}
              type={type}
              defaultValue=""
              data-cy="onboarding-image"
              {...getInputProps({ onChange })}
            />
          </UploadContainer>
        </FileInputBorder>
      )}
    />
  );
};

export default ImageInput;
