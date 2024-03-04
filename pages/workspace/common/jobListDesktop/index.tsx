import TextComp from 'components/textComp';
import React, { useEffect, useState } from 'react';
import lang from 'common/lang';
import { useCompanyJobListMutation } from 'pages/jobs/jobsService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { IJobData, nullJob } from 'pages/workspace/type';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import JobCard from './JobCards';
import SubSidebar from '../SubSidebar';
import NoJob from '../NoJob';

import {
  ApplicationsWrapper, JobDetailPreviewCards, NoApplicationsWrapper, Content
  ,
} from './styles';
import { SideBarFilters } from '../SubSidebar/types';
const {
  workspace: {
    jobStatus: { open, close, pending },
    jobFilters, status, opened, jobStatus, applicants,
  },
} = lang;

export const JobList = () => {
  const [step, setStep] = useState(open);
  const currentCompany = useSelector(selectCurrentCompany);
  const [currentApplicationPage, setCurrentApplicationPage] = useState(0);
  const [applicationList, result] = useCompanyJobListMutation();
  const [hasMoreApplications, setHasMoreApplications] = useState(false);
  const [filtersList, setFiltersList] = useState<SideBarFilters[]>([]);
  const [applicationsList, setApplicationsList] = useState<IJobData[]>([]);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [isDataLoad, setIsDataLoad] = useState(true);
  const [selectedJob, setSelectedJob] = useState<IJobData>(nullJob);

  useEffect(() => {
    setCurrentApplicationPage(0);
    setApplicationsList([]);
  }, [step]);

  useEffect(() => {
    loadAppFilters();
    const fetchData = setTimeout(() => {
      setIsDataLoad(false);
      if (!applicationsList.length) fetchMoreApplicationsData();
    }, 50);
    return () => {
      clearTimeout(fetchData);
    };
  }, [currentApplicationPage, step]);

  const loadAppFilters = () => {
    const filters: SideBarFilters[] = [];
    Object.keys(jobFilters).forEach((key: string) => {
      const filter: SideBarFilters = {
        label: jobFilters[key as keyof typeof jobFilters],
        type: key,
        options: [],
      };
      filters.push(filter);
    });
    setFiltersList([...filters]);
  };

  const handleMoreClick = (job: IJobData) => {
    setSelectedJob(job);
  };

  const fetchMoreApplicationsData = () => {
    let statusFilter = 'open';
    setIsDataLoad(true);
    if (step === close) { statusFilter = 'close'; } else if (step === pending) { statusFilter = 'pending'; }
    applicationList({
      id: currentCompany?.username, company: currentCompany?.username, page: currentApplicationPage + 1, statusFilter,
    })
      .unwrap()
      .then((response) => {
        if (response?.data) {
          const alData = response.data.data || [];
          setApplicationsList(applicationsList.concat(alData));
          setApplicationsCount(response?.data.total);
          if (alData.length) {
            setHasMoreApplications(response?.data?.to !== response?.data?.total);
            setCurrentApplicationPage(response?.data?.current_page);
          }
        }
      }).catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };

  const {
    workspace: { menu: { jobs } },
  } = lang;
  const { noJob } = lang.jobs;
  if (applicationsList.length < 1 && isDataLoad && !result.isLoading) {
    return (
      <Content>
        {result.isLoading && <Loader fullScreen={true} />}
        <SubSidebar
          checkbox
          title={status}
          items={[open, pending, close]}
          onSelect={(item) => { setStep(item); }}
          filters={filtersList}
          selected={step}
        />
        <NoApplicationsWrapper>
          <NoJob />
        </NoApplicationsWrapper>
      </Content>
    );
  }
  return (
    <Content>
      {result.isLoading && <Loader fullScreen={true} />}
      <SubSidebar
        checkbox
        title={status}
        items={[open, pending, close]}
        onSelect={(item) => { setStep(item); }}
        filters={filtersList}
        selected={step}
      />
      <ApplicationsWrapper>
        {!result.isLoading && (
          <TextComp component="h3">
            {`${jobs} (${applicationsCount})`}
          </TextComp>
        )}
        <JobDetailPreviewCards>
          <InfiniteScrollComponent
            data={applicationsList}
            fetchMoreData={fetchMoreApplicationsData}
            hasMore={hasMoreApplications}
            scrollableTarget="infinite-scroll"
            showLoader={false}
          >
            {applicationsList?.map((application) => (
              <JobCard
                data={{ ...application, id: application.id.toString() }}
                key={application.uuid}
                totalSkills={application.skills?.length || 0}
                matchingSkills={application.matching_skills?.length || 0}
                createdAt={application?.createdAt ? application.createdAt : ''}
                matchScore={application.applicants_count}
                status={jobStatus[application.status] ? jobStatus[application.status] : '-'}
              />
            ))}
          </InfiniteScrollComponent>

        </JobDetailPreviewCards>
      </ApplicationsWrapper>
    </Content>
  );
};
