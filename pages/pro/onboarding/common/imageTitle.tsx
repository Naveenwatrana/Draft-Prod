import { FILE_NAME_CHAR_LENGTH_LIMIT } from 'common/constants';
import CancelIcon from 'components/Icons/CrossIcon';
import TextComp from 'components/textComp';
import { ImageTitleProps } from 'pages/pro/onboarding/common/types';
import { CloseIconButton, FileInputInfo } from './styles';

const ImageTitle = ({ fileName, removeImage }: ImageTitleProps) => {
  const truncatedFileName = fileName.length > FILE_NAME_CHAR_LENGTH_LIMIT
    ? `${fileName.slice(0, FILE_NAME_CHAR_LENGTH_LIMIT)}...`
    : fileName;

  return (
    <FileInputInfo>
      <TextComp>{truncatedFileName}</TextComp>
      <CloseIconButton type="button" onClick={removeImage} data-cy="removeImage">
        <CancelIcon size={10} />
      </CloseIconButton>
    </FileInputInfo>
  );
};

export default ImageTitle;
