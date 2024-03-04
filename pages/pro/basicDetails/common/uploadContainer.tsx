import { UploadContainerProps } from 'pages/pro/basicDetails/common/types';
import { FileInputLabel } from 'pages/pro/onboarding/common/styles';

const UploadContainer = ({ getRootProps, imageName, children }: UploadContainerProps) => {
  const divProps = imageName ? null : getRootProps();

  return (
    <FileInputLabel {...divProps}>
      {children}
    </FileInputLabel>
  );
};

export default UploadContainer;
