import React from 'react';
import lang from 'common/lang';
import Stepper from 'components/Stepper';
import ChevronLeft from 'components/Icons/LeftChevron';
import { JOB_VIEW_TYPE } from 'common/types';
import { useIsMobile } from 'common/hooks/useIsMobile';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { jobTabs } from 'pages/[slug]/utils';
import { JobStatus } from 'pages/workspace/type';
import { Tooltip } from 'react-tooltip';
import { StyledTooltip } from 'pages/post/create/Steps/style';

import { NavbarCompactProps } from './types';
import {
  Container, BackText, IconWrapper, ClippedUserName, TabsContainer, StapperContainer, Tab, NavbarContainer, StickyNavbar,
  MobileTabsContainer, HeaderRightSection, StatusText, TopHeader, ErrorButton, PrimaryButton, TabsLayoutTabs, SeconderyButton,
} from './style';
import { TabsLayoutTab } from '../TabsLayout/style';
const { jobs } = lang;

const NavbarCompact = ({
  step, onBack, title, stepsToRender, isAuthor, view, slug, jobData, onJobClose, onJobOpen, status, deleteJob,
}: NavbarCompactProps) => {
  const isMobile = useIsMobile();
  let toolTipText = '';
  let isJobOpenable = true;
  if (jobData?.skills?.length === 0 || (!jobData?.salary_from && !jobData?.salary_to) || !jobData?.location_type || !jobData?.employment_type || !jobData?.role_type) {
    toolTipText = 'Add missing information';
    isJobOpenable = false;
  } else if ((!jobData?.requirements || jobData?.requirements.length === 0) || (!jobData?.responsibilities || jobData?.responsibilities.length === 0)) {
    toolTipText = 'Add “Who you are” and “What you will do” blocks';
    isJobOpenable = false;
  }
  const BackButtonSession = (
    <TopHeader>
      <BackText>
        <IconWrapper onClick={onBack}>
          <ChevronLeft data-cy="goBack" />
        </IconWrapper>
        <ClippedUserName title={title}>
          {title}
        </ClippedUserName>
        <StatusText>
          {status || jobData?.status}
        </StatusText>
      </BackText>
      {isAuthor && view === JOB_VIEW_TYPE.JOB && (
        <BackText>
          <ErrorButton onClick={deleteJob} disabled={status === JobStatus.PUBLISHED}>
            <TrashIcon color={status === JobStatus.PUBLISHED ? theme.palette.gray[100].value : theme.palette.red[100].value} />
            Delete Job
          </ErrorButton>
          {status !== JobStatus.PUBLISHED && (
            <StyledTooltip data-tooltip-id={jobData?.id}>
              <Tooltip
                id={jobData?.id}
                place="bottom"
                variant="light"
                content={toolTipText}
              />
              <PrimaryButton disabled={!isJobOpenable} onClick={onJobOpen}>
                Open Job
              </PrimaryButton>
            </StyledTooltip>
          )}
          {status === JobStatus.PUBLISHED && <SeconderyButton onClick={onJobClose}>Close Job</SeconderyButton>}
        </BackText>
      )}
    </TopHeader>
  );

  if (isMobile) {
    return (
      <>
        <NavbarContainer>
          {BackButtonSession}
        </NavbarContainer>
        <StickyNavbar open={true}>
          <MobileTabsContainer>
            {isAuthor && slug
              && (
                <TabsLayoutTabs>
                  {jobTabs.map((tab, index) => {
                    return (
                      <TabsLayoutTab
                        key={tab.name}
                        className={`${view === tab.value ? 'active' : ''}`}
                        href={`/${slug}/${tab.onClick}`}
                      >
                        {tab.name}
                      </TabsLayoutTab>
                    );
                  })}
                </TabsLayoutTabs>
              )}
          </MobileTabsContainer>
        </StickyNavbar>
      </>
    );
  }
  return (
    <Container>
      {BackButtonSession}
      {isAuthor && (
        <TabsLayoutTabs>
          {jobTabs.map((tab, index) => {
            return (
              <TabsLayoutTab
                key={tab.name}
                className={`${view === tab.value ? 'active' : ''}`}
                href={`/${slug}/${tab.onClick}`}
              >
                {tab.name}
              </TabsLayoutTab>
            );
          })}
        </TabsLayoutTabs>
      )}
    </Container>
  );
};

export default NavbarCompact;
