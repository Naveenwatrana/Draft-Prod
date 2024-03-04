import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import { IJobData, JobListProps } from 'pages/workspace/type';
import { Wrapper } from 'pages/workspace/common/jobListDesktop/styles';
import JobListItem from 'pages/workspace/common/jobListMobile/JobListItem';

const JobListMobile = ({
  jobsList,
  fetchMoreJobsData,
  selectedJob,
  setSelectedJob,
  hasMoreJobs,
  updateRow,
}: JobListProps) => {
  const handleMoreClick = (job: IJobData) => {
    setSelectedJob(job);
  };

  return (
    <Wrapper id="infinite-scroll" data-cy="jobListMobile">
      <InfiniteScrollComponent
        data={jobsList}
        fetchMoreData={fetchMoreJobsData}
        hasMore={hasMoreJobs}
        scrollableTarget="infinite-scroll"
      >
        {jobsList.length && jobsList.map((ele) => (
          <JobListItem
            updateRow={updateRow}
            key={`job-list-item-${ele.id}`}
            jobListItem={ele}
            selectedJob={selectedJob}
            handleMoreClick={handleMoreClick}
          />
        ))}
      </InfiniteScrollComponent>
    </Wrapper>
  );
};

export default JobListMobile;
