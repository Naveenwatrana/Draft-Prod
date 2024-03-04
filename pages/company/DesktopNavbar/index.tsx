import React, { useRef, useState } from 'react';
import BackIcon from 'components/Icons/BackIcon';
import ArrowDown from 'components/Icons/ArrowDown';
import TextComp from 'components/textComp';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { ICompanyData } from 'pages/org/components/CompanyNavBar/types';
import { useGlobals } from 'common/hooks/useGlobals';
import {
  orgContentUrl, orgInsightUrl, orgJobsUrl, orgProfileUrl,
} from 'common/utils/network/appRouts';
import lang from 'common/lang';
import {
  Count,
  FollowerContainer,
  NameContainer,
  NavbarContainer,
  PopOver,
  PopOverContainer,
  Tab,
  TabsContainer,
  UserNameWrapper,
  Username,
} from './style';
import { Tabs } from '../types';
type DesktopNavbarProps = {
  onBack: () => void;
  activeTab: number;
  companyData?: ICompanyData;
};

const {
  profile: { followersLabel, followingLabel },
  company: {
    profile: {
      navbarHeader: {
        brand, jobs, content, insights,
      },
    },
  },
} = lang;
const DesktopNavbar = ({
  onBack, companyData, activeTab,
}: DesktopNavbarProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const globals = useGlobals();
  const togglePopover = () => {
    setPopoverOpen((open) => !open);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => setPopoverOpen(false),
  });
  return (
    <NavbarContainer>
      <NameContainer>
        <BackIcon onClick={onBack} />
        <UserNameWrapper popoverOpen={popoverOpen}>
          <h1>
            <Username
              data-cy="companyUserName"
              active={false}
              label={companyData?.name ?? ''}
            />
          </h1>
          <PopOverContainer>
            <ArrowDown onClick={togglePopover} />
            {popoverOpen && (
              <PopOver ref={wrapperRef}>
                <TextComp>
                  @
                  {' '}
                  {companyData?.username}
                </TextComp>
              </PopOver>
            )}
          </PopOverContainer>
        </UserNameWrapper>
      </NameContainer>
      <TabsContainer>
        <Tab active={activeTab === Tabs.brand} href={`${globals?.origin}${orgProfileUrl(companyData?.username as string)}`}>{brand}</Tab>
        <Tab active={activeTab === Tabs.insights} href={`${globals?.origin}${orgInsightUrl(companyData?.username as string)}`}>{insights}</Tab>
        <Tab active={activeTab === Tabs.content} href={`${globals?.origin}${orgContentUrl(companyData?.username as string)}`}>{content}</Tab>
        <Tab active={activeTab === Tabs.jobs} href={`${globals?.origin}${orgJobsUrl(companyData?.username as string)}`}>{jobs}</Tab>
      </TabsContainer>
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
    </NavbarContainer>
  );
};

export default DesktopNavbar;
