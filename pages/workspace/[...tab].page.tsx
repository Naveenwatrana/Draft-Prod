import React, { useEffect, useMemo } from 'react';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'common/hooks/state';
import lang from 'common/lang';
import { theme } from 'common/theme';
import CopyIcon from 'components/Icons/CopyIcon';
import SaveContentIcon from 'components/Icons/SaveContentIcon';
import ApplicationIcon from 'components/Icons/applicationsIcon.svg';
import JobsIcon from 'components/Icons/JobsIcon';
import SettingsIcon from 'components/Icons/SettingsIcon';
import PreferenceIcon from 'components/Icons/PreferenceIcon';
import NewsFeedIcon from 'components/Icons/NewsFeedIcon';
import useCompany from 'common/hooks/useCompany';
import { useRouter } from 'next/router';
import { useNavigate } from 'common/utils/router-fill';
import {
  Tabs, TabsMapper, WorkspaceProps,
} from './type';
import { getCurrentTab, setCurrentTab } from './workspaceSlice';
import {
  Container, Content, IconWrapper, SideBar, SideBarItem,
} from './DesktopWorkspace/styles';
import SavedCards from './SavedCards';
import { JobList } from './common/jobListDesktop';
import { JobApplications } from './common/jobApplicationsDesktop';
import Settings from './common/Settings';
import Feed from './common/Feed';
import ContentCards from './common/Content';
import Preferences from './common/Preferences';

const {
  workspace: { menu, draftCompanyUrl },
} = lang;

const WorkSpaceTabs = ({
  jobJoiningPreferenceOptions, industryOptions, meltwaterSettings, meltwaterArticlesData, postCards, linkCards,
}: WorkspaceProps) => {
  const currentTab = useSelector(getCurrentTab);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const router = useRouter();
  const { currentCompany } = useCompany();
  const isUserB2C = currentCompany === null;
  const draftCompanyUser = useMemo(() => currentCompany?.url === draftCompanyUrl, [currentCompany]);
  useEffect(() => {
    const tabValue = router.query?.tab?.[0];
    if (tabValue && Object.keys(TabsMapper).includes(tabValue)) {
      dispatch(setCurrentTab(TabsMapper[tabValue]));
    }
  }, [dispatch, router.query?.tab]);

  return (
    <LayoutWithNavbar>
      <Container>
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
              onClick={() => navigate('/workspace/application')}
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

export default WorkSpaceTabs;
