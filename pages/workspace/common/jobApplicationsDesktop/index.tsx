import TextComp from 'components/textComp';
import React, { useEffect, useState } from 'react';
import lang from 'common/lang';
import NoJobIcon from 'components/Icons/noJob.svg';
import { useApplicationListMutation } from 'pages/jobs/jobsService';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl } from 'common/utils/network/appRouts';
import { showNotification } from 'pages/pro/components/Projects/util';
import { jobMatchScore } from 'common/utils/jobMatchScore';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { formateApplicationListData } from 'common/utils/helpers';
import { IApplicationItemResponseData, IJobData } from 'pages/workspace/type';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import Loader from 'components/Loader/Loader';
import JobCard from './JobApplicationCards';
import SubSidebar from '../SubSidebar';
import {
  ApplicationsWrapper, JobDetailPreviewCards, NoApplicationsWrapper, SearchJobsButton, Wrapper, Content,
  IconWrapper,
} from './styles';
import { SideBarFilters } from '../SubSidebar/types';

const {
  workspace: {
    applicationFilters, viewJob, skills, applied,
  },
} = lang;

export const JobApplications = () => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const [currentApplicationPage, setCurrentApplicationPage] = useState(0);
  const [applicationList, result] = useApplicationListMutation();
  const [hasMoreApplications, setHasMoreApplications] = useState(false);
  const [filtersList, setFiltersList] = useState<SideBarFilters[]>([]);
  const [applicationsList, setApplicationsList] = useState<IJobData[]>([]);

  useEffect(() => {
    loadAppFilters();
    const fetchData = setTimeout(() => {
      if (!applicationsList.length) fetchMoreApplicationsData();
    }, 50);
    return () => {
      clearTimeout(fetchData);
    };
  }, []);

  const handleClick = (slug: string) => {
    if (loggedInUser) {
      navigate(`/${slug}`);
      return;
    }
    navigate(loginUrl);
  };

  const loadAppFilters = () => {
    const filters: SideBarFilters[] = [];
    Object.keys(applicationFilters).forEach((key: string) => {
      const filter: SideBarFilters = {
        label: applicationFilters[key as keyof typeof applicationFilters],
        type: key,
        options: [],
      };
      filters.push(filter);
    });
    setFiltersList([...filters]);
  };

  const fetchMoreApplicationsData = () => {
    applicationList(currentApplicationPage + 1)
      .unwrap()
      .then((response:any) => {
        if (response?.data) {
          const {
            total, currentPage, to,
          } = formateApplicationListData(response?.data);
          const alData = response?.data?.data.map((application:IApplicationItemResponseData) => { return { ...application.job, createdAt: application.created_at }; });
          setApplicationsList(applicationsList.concat(alData));
          if (alData.length) {
            setHasMoreApplications(to !== total);
            setCurrentApplicationPage(currentPage);
          }
        }
      }).catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };

  const {
    workspace: { menu: { myApplications } },
  } = lang;
  const { noJob } = lang.jobs;
  if (applicationsList.length < 1 && !result.isLoading) {
    return (
      <NoApplicationsWrapper>
        <Wrapper>
          <IconWrapper>
            <NoJobIcon />
          </IconWrapper>
          <TextComp component="h2">{noJob.noApplication}</TextComp>
          <IconWrapper />
          <TextComp component="h4">{noJob.noApplicationMessage}</TextComp>
          <SearchJobsButton onClick={() => { navigate('/feed'); }} label="Search Jobs" primary />
        </Wrapper>
      </NoApplicationsWrapper>
    );
  }
  return (
    <Content>
      {result.isLoading && <Loader fullScreen={true} />}
      <SubSidebar
        title=""
        items={[]}
        onSelect={() => { }}
        filters={filtersList}
      />
      <ApplicationsWrapper>
        {!result.isLoading && (
          <TextComp component="h3">
            {`${myApplications}(${applicationsList.length})`}
          </TextComp>
        )}
        <JobDetailPreviewCards>
          <InfiniteScrollComponent
            data={applicationsList}
            fetchMoreData={fetchMoreApplicationsData}
            hasMore={hasMoreApplications}
            scrollableTarget="infinite-scroll"
          >
            {applicationsList?.map((application) => (
              <JobCard
                data={{ ...application, id: application.id.toString() }}
                key={application.uuid}
                totalSkills={application.skills?.length || 0}
                matchingSkills={application.matching_skills?.length || 0}
                createdAt={application?.createdAt ? application.createdAt : ''}
                matchScore={jobMatchScore(application.skills?.length as number, application.matching_skills?.length as number)}
              />
            ))}
          </InfiniteScrollComponent>

        </JobDetailPreviewCards>
      </ApplicationsWrapper>
    </Content>
  );
};
