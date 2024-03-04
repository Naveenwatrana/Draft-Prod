import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'common/hooks/state';
import { useJobListMutation } from 'pages/jobs/jobsService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { selectCurrentUser } from 'pages/account/authSlice';
import {
  formateJobListData,
} from 'common/utils/helpers';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import NoJob from 'pages/workspace/common/NoJob';
import {
  Container,
  Content,
  SideBar,
  SideBarItem,
  IconWrapper,
} from 'pages/workspace/DesktopWorkspace/styles';
import useCompany from 'common/hooks/useCompany';
import CopyIcon from 'components/Icons/CopyIcon';
import ApplicationIcon from 'components/Icons/applicationsIcon.svg';
import { theme } from 'common/theme';
import JobsIcon from 'components/Icons/JobsIcon';
import SaveContentIcon from 'components/Icons/SaveContentIcon';
import NewsFeedIcon from 'components/Icons/NewsFeedIcon';
import SettingsIcon from 'components/Icons/SettingsIcon';
import PreferenceIcon from 'components/Icons/PreferenceIcon';
import { useRouter } from 'next/router';
import { useNavigate } from 'common/utils/router-fill';
import { JobList } from '../common/jobListDesktop';
import {
  IJobData,
  nullJob,
  Tabs,
  TabsMapper,
  WorkspaceProps,
} from '../type';
import { JobApplications } from '../common/jobApplicationsDesktop';
import { getCurrentTab, setCurrentTab } from '../workspaceSlice';
import SavedCards from '../SavedCards';
import ContentCards from '../common/Content';
import Settings from '../common/Settings';
import Feed from '../common/Feed';
import Preferences from '../common/Preferences';

const {
  workspace: { menu, draftCompanyUrl },
} = lang;

const DesktopWorkspace = ({
  postCards, linkCards, meltwaterSettings, meltwaterArticlesData, jobJoiningPreferenceOptions, industryOptions,
}: WorkspaceProps) => {
  const currentTab = useSelector(getCurrentTab);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);
  const { currentCompany } = useCompany();
  const [jobList, result] = useJobListMutation();
  const [jobsList, setJobsList] = useState<IJobData[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobData>(nullJob);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const [currentJobPage, setCurrentJobPage] = useState(0);

  const isUserB2C = currentCompany === null;

  const jobsData = React.useMemo(
    () => jobsList.filter((list) => list.companyId === currentCompany?.id),
    [jobsList, currentCompany],
  );

  const isUserHasCompany = !!(currentUser?.companies || []).length;

  useEffect(() => {
    const fetchData = setTimeout(() => {
      if (isUserHasCompany && currentTab === Tabs.JOB && !jobsList.length) {
        fetchMoreJobsData();
      }
    }, 50);
    return () => clearTimeout(fetchData);
  }, [currentTab, isUserHasCompany]);

  useEffect(() => {
    const tabValue = router.query?.tab?.[0];
    if (tabValue && Object.keys(TabsMapper).includes(tabValue)) {
      dispatch(setCurrentTab(TabsMapper[tabValue]));
    }
  }, [dispatch, router.query?.tab]);

  const updateRow = (data: IJobData) => {
    const matchedJobList = jobsList.map((list) => list.uuid === data.uuid ? { ...list, ...data } : list);
    setJobsList(matchedJobList);
  };

  const fetchMoreJobsData = () => {
    if (currentTab === Tabs.JOB) {
      jobList(currentJobPage + 1)
        .unwrap()
        .then((response) => {
          if (response?.data) {
            const {
              jobsListData, total, currentPage, to,
            } = formateJobListData(response?.data);
            setJobsList(jobsList.concat(jobsListData));
            setHasMoreJobs(to !== total);
            setCurrentJobPage(currentPage);
          }
        }).catch((error: any) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        });
    }
  };
  const draftCompanyUser = useMemo(() => currentCompany?.url === draftCompanyUrl, [currentCompany]);

  const NoJobContent = result.isLoading ? <Loader fullScreen={false} /> : <NoJob />;

  return (
    <LayoutWithNavbar>
      <Container data-cy="desktopWorkspace">
        <SideBar data-cy="workspaceSidebar">
          <SideBarItem
            selected={currentTab === Tabs.CONTENT}
            onClick={() => navigate('/workspace/content')}
            data-cy={menu.createdCards}
          >
            <IconWrapper>
              <CopyIcon color={theme.palette.white[100].value} />
              {menu.createdCards}
            </IconWrapper>
          </SideBarItem>
          <SideBarItem
            selected={currentTab === Tabs.SAVED}
            onClick={() => navigate('/workspace/saved')}
            data-cy={menu.savedCards}
          >
            <IconWrapper>
              <SaveContentIcon />
              {menu.savedCards}
            </IconWrapper>
          </SideBarItem>
          {isUserB2C ? (
            <SideBarItem
              selected={currentTab === Tabs.APPLICATIONS}
              onClick={() => navigate('/workspace/applications')}
              data-cy={menu.myApplications}
            >
              <IconWrapper>
                <ApplicationIcon />
                {menu.myApplications}
              </IconWrapper>
            </SideBarItem>
          ) : (
            <SideBarItem
              selected={currentTab === Tabs.JOB}
              onClick={() => navigate('/workspace/job')}
              data-cy={menu.jobs}
            >
              <IconWrapper>
                <JobsIcon />
                {menu.jobs}
              </IconWrapper>
            </SideBarItem>
          )}
          <SideBarItem
            selected={currentTab === Tabs.SETTINGS}
            onClick={() => navigate('/workspace/settings')}
            data-cy={menu.settings}
          >
            <IconWrapper>
              <SettingsIcon />
              {menu.settings}
            </IconWrapper>
          </SideBarItem>
          <SideBarItem
            selected={currentTab === Tabs.PREFERENCES}
            onClick={() => navigate('/workspace/preferences')}
            data-cy={menu.preferences}
          >
            <IconWrapper>
              <PreferenceIcon />
              {menu.preferences}
            </IconWrapper>
          </SideBarItem>
          {draftCompanyUser
          && (
            <SideBarItem
              selected={currentTab === Tabs.MELTWATER}
              onClick={() => navigate('/workspace/melt')}
              data-cy={menu.meltwater}
            >
              <IconWrapper>
                <NewsFeedIcon />
                {menu.meltwater}
              </IconWrapper>
            </SideBarItem>
          )}
        </SideBar>
        {currentTab === Tabs.SAVED && (
          <Content>
            <SavedCards />
          </Content>
        )}
        {currentTab === Tabs.JOB && (
          <JobList />
        )}
        {currentTab === Tabs.APPLICATIONS && isUserB2C && <JobApplications />}
        {currentTab === Tabs.SETTINGS && <Settings isUserB2C={isUserB2C} draftCompanyUser={draftCompanyUser} data={meltwaterSettings} />}
        {currentTab === Tabs.MELTWATER && draftCompanyUser && <Feed meltwaterArticlesData={meltwaterArticlesData} />}
        {currentTab === Tabs.CONTENT && <ContentCards linkCards={linkCards} postCards={postCards} />}
        {currentTab === Tabs.PREFERENCES && <Preferences jobJoiningPreferenceOptions={jobJoiningPreferenceOptions} industryOptions={industryOptions} />}
      </Container>
    </LayoutWithNavbar>
  );
};

export default memo(DesktopWorkspace);
