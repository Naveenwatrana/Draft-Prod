import React from 'react';
import lang from 'common/lang';
import Stepper from 'components/Stepper';
import ChevronLeft from 'components/Icons/LeftChevron';
import { JOB_VIEW_TYPE } from 'common/types';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { NavbarCompactProps } from './types';
import {
  Container, BackText, IconWrapper, ClippedUserName, TabsContainer, StapperContainer, Tab, NavbarContainer, StickyNavbar, MobileTabsContainer, HeaderRightSection,
} from './style';
const { jobs } = lang;

const NavbarCompact = ({
  step, onBack, title, stepsToRender, isAuthor, view, slug,
}: NavbarCompactProps) => {
  const isMobile = useIsMobile();

  const BackButtonSession = (
    <BackText>
      <IconWrapper onClick={onBack}>
        <ChevronLeft data-cy="goBack" />
      </IconWrapper>
      <ClippedUserName title={title}>
        {title}
      </ClippedUserName>
    </BackText>
  );

  const AllTabs = (
    <>
      <Tab href={`/${slug}`} active={view === JOB_VIEW_TYPE.JOB}>{jobs.jobHeader.edit}</Tab>
      <Tab href={`/${slug}/${JOB_VIEW_TYPE.APPLICATIONS}`} active={view === JOB_VIEW_TYPE.APPLICATIONS}>{jobs.jobHeader.applicants}</Tab>
      <Tab href={`/${slug}/${JOB_VIEW_TYPE.MESSAGES}`} active={view === JOB_VIEW_TYPE.MESSAGES}>{jobs.jobHeader.messages}</Tab>
      <Tab href={`/${slug}/${JOB_VIEW_TYPE.SOURCING}`} active={view === JOB_VIEW_TYPE.SOURCING}>{jobs.jobHeader.sourcing}</Tab>
    </>
  );
  if (isMobile) {
    return (
      <>
        <NavbarContainer>
          {BackButtonSession}
        </NavbarContainer>
        <StickyNavbar open={true}>
          <MobileTabsContainer>
            {isAuthor && slug && (AllTabs)}
          </MobileTabsContainer>
        </StickyNavbar>
      </>
    );
  }
  return (
    <Container>
      {BackButtonSession}
      {isAuthor && slug ? (
        <TabsContainer>
          {AllTabs}
        </TabsContainer>
      )
        : (
          <StapperContainer>
            <Stepper steps={stepsToRender} activeStep={step} />
          </StapperContainer>
        )}
      <HeaderRightSection />
    </Container>
  );
};

export default NavbarCompact;
