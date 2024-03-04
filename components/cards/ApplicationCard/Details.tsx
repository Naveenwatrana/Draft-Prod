import { CompanyText } from 'components/cards/JobCard/styles';
import { JobContent } from 'components/cards/styles';
import lang from 'common/lang';
import { DetailsText, JobDetailsButton } from './styles';
import { ApplicationDetailsCardType } from './types';

const ApplicationDetailsCard = ({
  text,
  companyName,
  onViewJobDetails,
}: ApplicationDetailsCardType) => {
  const {
    workspace: { jobDetails },
  } = lang;
  return (
    <JobContent>
      <CompanyText>{companyName}</CompanyText>
      <DetailsText>{text}</DetailsText>
      <JobDetailsButton
        variant="link"
        size="small"
        label={jobDetails}
        onClick={onViewJobDetails}
      />
    </JobContent>
  );
};

export default ApplicationDetailsCard;
