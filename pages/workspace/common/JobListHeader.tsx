import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import { createJob } from 'common/utils/network/appRouts';
import { JobListHeaderProps } from '../type';
import { AddJobBtn, JobListHeaderItem, JobListHeaderWrapper } from './styles';

const {
  jobs: { jobsCount },
  workspace: { addJob },
} = lang;

const JobListHeader = ({ jobListCount }: JobListHeaderProps) => {
  const navigate = useNavigate();
  return (
    <JobListHeaderWrapper data-cy="jobListHeader">
      <JobListHeaderItem>
        {jobsCount}
        {' '}
        {`(${jobListCount})`}
      </JobListHeaderItem>
      <AddJobBtn
        primary
        label={addJob}
        type="submit"
        onClick={() => navigate(createJob)}
        data-cy="addJob"
      />
    </JobListHeaderWrapper>
  );
};

export default JobListHeader;
