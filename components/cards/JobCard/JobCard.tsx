import { formatNumberToCurrency } from 'common/utils/helpers';
import {
  CompanyText, JobContent, LocationText, RoleText, SalaryText,
} from 'components/cards/JobCard/styles';
import { JobCardType } from 'components/cards/JobCard/types';

const JobCard = ({
  companyName, role, location, jobType, locationType, salaryFrom, salaryTo,
}: JobCardType) => {
  return (
    <JobContent>
      <CompanyText>{companyName}</CompanyText>
      <RoleText>{role}</RoleText>
      <LocationText>
        {location && `${location},`}
        <br />
        {locationType}
        {jobType && `, ${jobType}`}
      </LocationText>
      <SalaryText>
        {salaryFrom && `${formatNumberToCurrency(salaryFrom)}`}
        {' '}
        {!salaryFrom && salaryTo && 0}
        {!!salaryTo && `- ${formatNumberToCurrency(salaryTo)}`}
      </SalaryText>
    </JobContent>
  );
};

export default JobCard;
