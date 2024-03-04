import { FILE_NAME_CHAR_LENGTH_LIMIT } from 'common/constants';
import CancelIcon from 'components/Icons/CrossIcon';
import { CloseIconButton, FileInputInfo } from 'pages/pro/onboarding/common/styles';
import { ImageTitleProps } from 'pages/pro/basicDetails/common/types';
import TextComp from 'components/textComp';

const ImageTitle = ({ fileName, removeImage }: ImageTitleProps) => {
  const truncatedFileName = fileName.length > FILE_NAME_CHAR_LENGTH_LIMIT
    ? `${fileName.slice(0, FILE_NAME_CHAR_LENGTH_LIMIT)}...`
    : fileName;

  return (
    <FileInputInfo>
      <TextComp>{truncatedFileName}</TextComp>
      <CloseIconButton
        type="button"
        data-cy="removeImage"
        onClick={removeImage}
      >
        <CancelIcon size={10} />
      </CloseIconButton>
    </FileInputInfo>
  );
};

export default ImageTitle;
