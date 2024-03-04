import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import React, { useEffect, useMemo, useState } from 'react';
import { useJobListMutation } from 'pages/jobs/jobsService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { formateJobListData } from 'common/utils/helpers';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import NoJob from 'pages/workspace/common/NoJob';
import { Container } from 'pages/workspace/MobileWorkspace/styles';
import JobSelect from 'pages/workspace/MobileWorkspace/JobSelect';
import {
  IJobData, MELTWATER_ITEMS, nullJob, Option, Tabs, WorkspaceProps,
} from 'pages/workspace/type';
import { selectCurrentUser } from 'pages/account/authSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'common/hooks/state';
import useCompany from 'common/hooks/useCompany';
import { JobList } from '../common/jobListDesktop';
import { JobApplications } from '../common/jobApplicationsDesktop';
import { getCurrentTab, setCurrentTab } from '../workspaceSlice';
import SavedCards from '../SavedCards';
import Settings from '../common/Settings';
import Feed from '../common/Feed';
import CreatedCards from '../common/createdCards';
import CreatedPosts from '../common/createdPosts';
import Preferences from '../common/Preferences';
import CreatedLinks from '../common/createdLinks';

const {
  workspace: { menu, draftCompanyUrl },
} = lang;

const Options: Option[] = [
  { label: menu.jobs, value: Tabs.JOB },
  { label: menu.createdCards, value: Tabs.CONTENT },
  { label: menu.createdPosts, value: Tabs.POSTS },
  { label: menu.createdLinks, value: Tabs.LINKS },
  { label: menu.savedCards, value: Tabs.SAVED },
  { label: menu.myApplications, value: Tabs.APPLICATIONS },
  { label: menu.preferences, options: [{ label: menu.jobs, value: Tabs.PREFERENCES }] },
];

const meltwaterOption: Option = {
  label: menu.meltwater,
  options: [
    {
      label: MELTWATER_ITEMS.settings,
      value: Tabs.SETTINGS,
    },
    {
      label: MELTWATER_ITEMS.newsFeed,
      value: Tabs.MELTWATER,
    },
  ],
};

const MobileWorkspace = ({
  postCards, linkCards, meltwaterSettings, jobJoiningPreferenceOptions, industryOptions,
}: WorkspaceProps) => {
  const currentTab = useSelector(getCurrentTab);
  const dispatch = useAppDispatch();
  const [jobList, result] = useJobListMutation();
  const [jobsList, setJobsList] = useState<IJobData[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobData>(nullJob);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const [currentJobPage, setCurrentJobPage] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const { currentCompany } = useCompany();

  const jobsData = React.useMemo(() => jobsList, [jobsList]);

  const isUserB2C = currentCompany === null;

  const draftCompanyUser = useMemo(() => currentCompany?.url?.includes(draftCompanyUrl), [currentCompany]);

  const isUserHasCompany = !!(currentUser?.companies || []).length;

  useEffect(() => {
    const fetchData = setTimeout(() => {
      if (isUserHasCompany && currentTab === Tabs.JOB && !jobsList.length) {
        fetchMoreJobsData();
      }
    }, 50);
    return () => clearTimeout(fetchData);
  }, [currentTab, isUserHasCompany]);

  const fetchMoreJobsData = () => {
    if (currentTab === Tabs.JOB) {
      jobList(currentJobPage + 1)
        .unwrap()
        .then((response) => {
          if (response?.data) {
            const {
              jobsListData, total, currentPage, to,
            } = formateJobListData(
              response?.data,
            );
            setJobsList(jobsList.concat(jobsListData));
            setHasMoreJobs(to !== total);
            setCurrentJobPage(currentPage);
          }
        })
        .catch((error: any) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        });
    }
  };

  const NoJobContent = result.isLoading ? <Loader fullScreen={false} /> : <NoJob />;

  const updateRow = (data : IJobData) => {
    const matchedJobList = jobsList.map((list) => list.uuid === data.uuid ? { ...list, ...data } : list);
    setJobsList(matchedJobList);
  };

  return (
    <LayoutWithNavbar>
      <Container data-cy="mobileWorkspace">
        <JobSelect
          Options={draftCompanyUser ? [...Options, meltwaterOption] : Options}
          currentTab={currentTab}
          setCurrentTab={(e) => {
            dispatch(setCurrentTab(e));
          }}
        />
        {currentTab === Tabs.SAVED && <SavedCards />}
        {currentTab === Tabs.JOB && (
          <JobList />
        )}
        {currentTab === Tabs.APPLICATIONS && isUserB2C && <JobApplications />}
        {currentTab === Tabs.CONTENT && <CreatedCards />}
        {currentTab === Tabs.POSTS && <CreatedPosts cards={postCards} />}
        {currentTab === Tabs.LINKS && <CreatedLinks cards={linkCards} />}
        {currentTab === Tabs.SETTINGS && <Settings isUserB2C={isUserB2C} draftCompanyUser={draftCompanyUser} data={meltwaterSettings} />}
        {currentTab === Tabs.MELTWATER && draftCompanyUser && <Feed />}
        {currentTab === Tabs.PREFERENCES && <Preferences jobJoiningPreferenceOptions={jobJoiningPreferenceOptions} industryOptions={industryOptions} />}
      </Container>
    </LayoutWithNavbar>
  );
};

export default MobileWorkspace;
