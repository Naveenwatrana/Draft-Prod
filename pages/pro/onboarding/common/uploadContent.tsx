import UploadIcon from 'components/Icons/UploadIcon';
import { UploadContentProps } from 'pages/pro/onboarding/common/types';
import {
  LabelBrowse, UploadContentInfo, UploadContentLabel, UploadFileSize,
} from './styles';

const UploadContent = ({
  labelText, labelBrowse, info, fileSize,
}: UploadContentProps) => {
  return (
    <>
      <UploadIcon />
      <UploadContentLabel>
        {labelText}
        {' '}
        <LabelBrowse>{labelBrowse}</LabelBrowse>
      </UploadContentLabel>
      <UploadContentInfo>{info}</UploadContentInfo>
      {fileSize && <UploadFileSize>{fileSize}</UploadFileSize>}
    </>
  );
};

export default UploadContent;
