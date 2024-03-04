import React from 'react';
import { formatNumberToCurrency } from 'common/utils/helpers';
import {
  JobDetailsButton,
} from 'components/cards/ApplicationCard/styles';
import { ApplicationCardType } from 'components/cards/ApplicationCard/types';
import lang from 'common/lang';
import { CompanyText, JobContent } from '../styles';
import { LocationText, RoleText, SalaryText } from '../JobCard/styles';

const ApplicationCard = ({
  companyName,
  role,
  location,
  jobType,
  locationType,
  salaryFrom,
  salaryTo,
  onViewJobDetails,
}: ApplicationCardType) => {
  const {
    workspace: { jobDetails },
  } = lang;
  const isText = location || locationType || jobType;
  const locationText = location ? `${location},` : '';
  const jobTypeText = jobType ? `${jobType},` : '';

  const isSalary = salaryFrom || salaryTo;
  const salaryText = `${salaryFrom ? formatNumberToCurrency(salaryFrom) : ''} ${
    !salaryFrom && salaryTo ? 0 : ''
  }${salaryTo ? `- ${formatNumberToCurrency(salaryTo)}` : ''}`;

  return (
    <JobContent>
      <CompanyText>{companyName}</CompanyText>
      <RoleText>{role}</RoleText>
      {isText && (
        <LocationText>
          {locationText}
          <br />
          {locationType}
          {jobTypeText}
        </LocationText>
      )}
      {isSalary && <SalaryText>{salaryText}</SalaryText>}
      <JobDetailsButton
        variant="link"
        size="small"
        label={jobDetails}
        onClick={onViewJobDetails}
      />
    </JobContent>
  );
};

export default ApplicationCard;
