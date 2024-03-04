import React, { useRef, useState } from 'react';
import ChevronLeft from 'components/Icons/LeftChevron';
import ArrowDown from 'components/Icons/ArrowDown';
import TextComp from 'components/textComp';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import {
  orgContentUrl, orgInsightUrl, orgJobsUrl, orgProfileUrl,
} from 'common/utils/network/appRouts';
import { ICompanyData } from 'pages/org/components/CompanyNavBar/types';
import {
  Count,
  FollowerContainer,
  NameContainer,
  NavbarContainer,
  StickyNavbar,
  Tab,
  TabsContainer,
  Username,
} from './style';
import {
  PopOver,
  PopOverContainer,
  UserNameWrapper,
} from '../DesktopNavbar/style';
import { Tabs } from '../types';
type MobileNavbarProps = {
  onBack: () => void;
  activeTab: number;
  companyData?: ICompanyData;
}
const {
  profile: { followersLabel, followingLabel },
  company: {
    profile: {
      navbarHeader: {
        brand, insights, jobs, content,
      },
    },
  },
} = lang;
const MobileNavbar = ({
  onBack, companyData, activeTab,
}: MobileNavbarProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const togglePopover = () => {
    setPopoverOpen((open) => !open);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => setPopoverOpen(false),
  });
  return (
    <>
      <NavbarContainer>
        <NameContainer>
          <ChevronLeft data-cy="goBack" onClick={onBack} />
          <UserNameWrapper popoverOpen={popoverOpen}>
            <Username
              active={false}
              label={companyData?.name ?? ''}
              onClick={() => undefined}
              data-cy="companyUserName"
            />
            <PopOverContainer>
              <ArrowDown onClick={togglePopover} />
              {popoverOpen && (
                <PopOver ref={wrapperRef}>
                  <TextComp>
                    @
                    {companyData?.username}
                  </TextComp>
                </PopOver>
              )}
            </PopOverContainer>
          </UserNameWrapper>
        </NameContainer>
      </NavbarContainer>
      <FollowerContainer>
        <TextComp>
          <Count>{companyData?.followersCount || 0}</Count>
          {followersLabel}
        </TextComp>
        <TextComp>
          <Count>{companyData?.followingsCount || 0}</Count>
          {followingLabel}
        </TextComp>
      </FollowerContainer>
      <StickyNavbar open={popoverOpen}>
        <TabsContainer>
          <Tab active={activeTab === Tabs.brand} href={orgProfileUrl(companyData?.username as string)}>{brand}</Tab>
          <Tab active={activeTab === Tabs.insights} href={orgInsightUrl(companyData?.username as string)}>{insights}</Tab>
          <Tab active={activeTab === Tabs.content} href={orgContentUrl(companyData?.username as string)}>{content}</Tab>
          <Tab active={activeTab === Tabs.jobs} href={orgJobsUrl(companyData?.username as string)}>{jobs}</Tab>
        </TabsContainer>
      </StickyNavbar>
    </>
  );
};

export default MobileNavbar;
