import UploadIcon from 'components/Icons/UploadIcon';
import { TextComp } from 'components/textComp';
import { UploadContentProps } from 'pages/pro/basicDetails/common/types';
import { UploadContentInfo, UploadContentLabel } from './styles';

const UploadContent = ({ labelText, labelBrowse, info }: UploadContentProps) => {
  return (
    <>
      <UploadIcon />
      <UploadContentLabel data-cy="uploadContentLabel">
        {labelText}
        {' '}
        <TextComp>{labelBrowse}</TextComp>
      </UploadContentLabel>
      <UploadContentInfo data-cy="uploadContentInfo">{info}</UploadContentInfo>
    </>
  );
};

export default UploadContent;
