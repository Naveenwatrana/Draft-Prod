import lang from 'common/lang';
import { formatNumberToCurrency } from 'common/utils/helpers';
import { JobListItemProps, JobStatus, nullJob } from 'pages/workspace/type';
import { MoreMenuIcon } from 'pages/workspace/common/jobListDesktop/styles';
import MoreMenuContent from 'pages/workspace/common/MoreMenuContent';
import {
  JobDataKey,
  JobDataRow,
  JobDataValue,
  JobRole,
  JobRoleWrapper,
  JobStatusWrapper,
  ListItem,
} from 'pages/workspace/common/jobListMobile/styles';
const {
  jobs: { list },
} = lang;

const JobListItem = ({
  jobListItem,
  selectedJob,
  handleMoreClick,
  updateRow,
}: JobListItemProps) => {
  return (
    <ListItem>
      <JobRoleWrapper>
        <JobRole>
          {jobListItem.role}
        </JobRole>
        <MoreMenuIcon data-cy={`jobItemActionMobile${jobListItem.id}`} onClick={() => handleMoreClick(jobListItem)} />
        {
          (selectedJob && selectedJob.id === jobListItem.id) && <MoreMenuContent updateRow={updateRow} selectedJob={selectedJob} closeMenu={() => handleMoreClick(nullJob)} />
        }
      </JobRoleWrapper>
      <JobDataRow>
        <JobDataKey>
          {list.id}
          :
          {' '}
        </JobDataKey>
        <JobDataValue>{jobListItem.id}</JobDataValue>
      </JobDataRow>
      <JobDataRow>
        <JobDataKey>
          {list.location}
          :
          {' '}
        </JobDataKey>
        <JobDataValue>{jobListItem.location}</JobDataValue>
      </JobDataRow>
      <JobDataRow>
        <JobDataKey>
          {list.type}
          :
          {' '}
        </JobDataKey>
        <JobDataValue>{jobListItem.locationType}</JobDataValue>
      </JobDataRow>
      <JobDataRow>
        <JobDataKey>
          {list.salary}
          :
          {' '}
        </JobDataKey>
        <JobDataValue>
          {jobListItem.salaryFrom && `${formatNumberToCurrency(jobListItem.salaryFrom)}`}
          {' '}
          {!jobListItem.salaryFrom && jobListItem.salaryTo && 0}
          {!!jobListItem.salaryTo && `- ${formatNumberToCurrency(jobListItem.salaryTo)}`}
        </JobDataValue>
      </JobDataRow>
      <JobStatusWrapper isPublished={jobListItem.status === JobStatus.PUBLISHED}>
        {jobListItem.status}
      </JobStatusWrapper>
      <JobDataRow>
        <JobDataKey>
          {list.applicants}
          :
          {' '}
        </JobDataKey>
        <JobDataValue>{jobListItem.applicantsCount}</JobDataValue>
      </JobDataRow>
    </ListItem>
  );
};

export default JobListItem;
