import { UploadContainerProps } from 'pages/pro/onboarding/common/types';
import { FileInputLabel } from './styles';

const UploadContainer = ({
  getRootProps,
  imageName,
  children,
}: UploadContainerProps) => {
  const divProps = imageName ? null : getRootProps();

  return (
    <FileInputLabel {...divProps}>
      {children}
    </FileInputLabel>
  );
};

export default UploadContainer;
