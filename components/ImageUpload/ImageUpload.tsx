import { useDropzone } from 'react-dropzone';
import { SUPPORTED_IMAGE_FORMATS, SUPPORTED_IMAGE_VIDEO_FORMATS } from 'common/constants';
import lang from 'common/lang';
import { InputType } from 'components/input/types';
import UploadContent from 'components/Molecules/ArticleUploadContent';
import { Error, ImageUploadInput } from 'components/ImageUpload/styles';
import { ImageUploadProps } from 'components/ImageUpload/types';
import UploadContainer from '../../pages/pro/onboarding/common/uploadContainer';

const { onBoarding: { image }, projects } = lang;

export const ImageUpload = ({
  labelText, info, onDrop, onChange, error, height, labelBrowse, withHeader, errorMessage, accept, fileSize, imageOnly, info1, info2, styles, ...props
}: ImageUploadProps) => {
  const supportedFormats = imageOnly ? SUPPORTED_IMAGE_FORMATS : SUPPORTED_IMAGE_VIDEO_FORMATS;
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept || supportedFormats,
    onDrop,
  });
  return (
    <ImageUploadInput error={error} height={height} withHeader={withHeader} style={styles?.container}>
      {error && <Error>{errorMessage || projects.fileUploadLimitError}</Error>}
      <UploadContainer getRootProps={getRootProps}>
        <UploadContent
          labelText={labelText}
          info={info}
          labelBrowse={labelBrowse || image.imageInputBrowse}
          info1={info1}
          info2={info2}
          fileSize={fileSize}
        />
        <input
          id="image"
          multiple
          type={InputType.FILE}
          data-cy="image-upload"
          {...props}
          {...getInputProps({ onChange })}
        />
      </UploadContainer>
    </ImageUploadInput>
  );
};

export default ImageUpload;
