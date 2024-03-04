import UploadIcon from 'components/Icons/UploadIcon';
import { UploadContentProps } from 'pages/pro/onboarding/common/types';
import {
  LabelBrowse, UploadContentInfo, UploadContentInfo1, UploadContentLabel,
} from './styles';

const UploadContent = ({
  labelText, labelBrowse, info1, info2,
}: UploadContentProps) => {
  return (
    <>
      <UploadIcon />
      <UploadContentLabel>
        {labelText}
        <LabelBrowse>{labelBrowse}</LabelBrowse>
      </UploadContentLabel>
      {info1 && <UploadContentInfo1>{info1}</UploadContentInfo1>}
      {info2 && <UploadContentInfo>{info2}</UploadContentInfo>}
    </>
  );
};

export default UploadContent;
