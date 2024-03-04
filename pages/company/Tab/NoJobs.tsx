import NoJobCompanyIcon from 'components/Icons/NoJobCompanyIcon';
import React from 'react';
import lang from 'common/lang';
import {
  AddFirstContentText,
  NoContentIconContainer,
  NoContentText,
  NoContentWrapper,
} from './styles';
const {
  company: { noJobs, noJobsMessage },
} = lang;

const NoJobs = () => {
  return (
    <NoContentWrapper>
      <NoContentIconContainer data-cy="no-jobs-icon">
        <NoJobCompanyIcon />
      </NoContentIconContainer>
      <NoContentText data-cy="no-jobs-title">
        {noJobs}
      </NoContentText>
      <AddFirstContentText data-cy="no-jobs-subtitle">
        {noJobsMessage}
      </AddFirstContentText>
    </NoContentWrapper>
  );
};

export default NoJobs;
