import { CompanyText } from 'components/cards/JobCard/styles';
import { JobContent } from 'components/cards/styles';
import {
  SnapShotText,
} from 'components/cards/JobSnapShotCard/styles';
import { JobSpanshotCardType } from 'components/cards/JobSnapShotCard/types';

const JobSnapshotCard = ({
  text, companyName,
}: JobSpanshotCardType) => {
  return (
    <JobContent>
      <CompanyText>{companyName}</CompanyText>
      <SnapShotText>{text}</SnapShotText>
    </JobContent>
  );
};

export default JobSnapshotCard;
