import JobCards from 'pages/feed/NewCards/JobCards';
import React from 'react';
import LogoIcon from 'components/Icons/icon';
import { JobsContainer } from './styles';
import { LogoWrapper } from '../style';
import NoJobs from './NoJobs';

const JobsTab = ({ jobs }: any) => {
  return (
    <JobsContainer>
      {jobs?.length > 0
        ? jobs.map((job: any) => (
          <JobCards matchScore={job.score} width={358} data={job} key={`CompanyJob${job?.id}`} />
        )) : <NoJobs /> }
      <LogoWrapper>
        <LogoIcon theme="grey" />
      </LogoWrapper>
    </JobsContainer>
  );
};

export default JobsTab;
