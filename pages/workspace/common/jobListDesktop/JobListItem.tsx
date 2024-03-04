import { jobDateFormat } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { formatNumberToCurrency } from 'common/utils/helpers';
import { JobListItemProps, JobStatus, nullJob } from 'pages/workspace/type';
import { theme } from 'common/theme';
import { JobStatusWrapper } from 'pages/workspace/common/jobListMobile/styles';
import MoreMenuContent from 'pages/workspace/common/MoreMenuContent';

import {
  ListRow,
  ListRowItem,
  MoreMenuIcon,
} from 'pages/workspace/common/jobListDesktop/styles';

const JobListItem = ({
  jobListItem, selectedJob, handleMoreClick, updateRow,
}: JobListItemProps) => {
  return (
    <ListRow>
      <ListRowItem title={jobListItem.role} width="20%" isOverFlow semiBold color={theme.palette.green['80'].value}>
        {jobListItem.role}
      </ListRowItem>
      <ListRowItem title={jobListItem.id.toString()} width="5%">{jobListItem.id}</ListRowItem>
      <ListRowItem title={formatDate(jobListItem.createdAt, jobDateFormat)} width="10%">{formatDate(jobListItem.createdAt, jobDateFormat)}</ListRowItem>
      <ListRowItem title={jobListItem.location} isOverFlow width="15%">{jobListItem.location}</ListRowItem>
      <ListRowItem title={jobListItem.locationType} width="8%">{jobListItem.locationType}</ListRowItem>
      <ListRowItem title={jobListItem.salaryFrom && jobListItem.salaryFrom ? `${formatNumberToCurrency(jobListItem.salaryFrom)} - ${formatNumberToCurrency(jobListItem.salaryTo)} ` : ''} maxWidth="130px" width="15%">
        {jobListItem.salaryFrom && `${formatNumberToCurrency(jobListItem.salaryFrom)}`}
        {' '}
        {!jobListItem.salaryFrom && jobListItem.salaryTo && 0}
        {!!jobListItem.salaryTo && `- ${formatNumberToCurrency(jobListItem.salaryTo)}`}
      </ListRowItem>
      <ListRowItem width="10%"><JobStatusWrapper isPublished={jobListItem.status === JobStatus.PUBLISHED}>{jobListItem.status}</JobStatusWrapper></ListRowItem>
      <ListRowItem width="10%" center semiBold>{jobListItem.applicantsCount}</ListRowItem>
      <ListRowItem style={{ position: 'static' }} width="7%">
        <MoreMenuIcon data-cy={`jobItemActionDesktop${jobListItem.id}`} onClick={() => handleMoreClick(jobListItem)} />
        {
          (selectedJob && selectedJob.id === jobListItem.id) && <MoreMenuContent updateRow={updateRow} selectedJob={selectedJob} closeMenu={() => handleMoreClick(nullJob)} />
        }
      </ListRowItem>
    </ListRow>
  );
};

export default JobListItem;
