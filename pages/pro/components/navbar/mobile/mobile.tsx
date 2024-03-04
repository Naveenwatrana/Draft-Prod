import { useAppSelector } from 'common/hooks/state';
import React, { useRef, useState } from 'react';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import EditFullName from 'pages/pro/basicDetails/mobile/EditBasicDetail/EditFullName';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { Tabs } from 'pages/pro/types';
import ChevronLeft from 'components/Icons/LeftChevron';
import { userContentUrl, userProfileUrl, userResumeUrl } from 'common/utils/network/appRouts';
import { getIsCurrentUser, getUser } from 'pages/pro/profileSlice';
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
  LocationContainer, UserNameWrapper,
} from '../desktop/style';
const {
  profile: {
    brand, content, followersLabel, followingLabel, resume,
  },
} = lang;

type MobileNavbarProps = {
  onBack: () => void;
  activeTab: number;
  name: string;
  location?: string | null;
}

const MobileNavbar = ({
  onBack, activeTab, name, location,
}: MobileNavbarProps) => {
  const {
    following, followers, firstName, lastName, username,
  } = useAppSelector(getUser);
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const [editFullNameDetail, setEditFullNameDetail] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
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
          <UserNameWrapper>
            <h1>
              <Username
                active={editFullNameDetail}
                label={name}
                data-cy="userName"
                onClick={() => isCurrentUser && setEditFullNameDetail(true)}
              />
            </h1>
            <LocationContainer>
              {location}
            </LocationContainer>
          </UserNameWrapper>
        </NameContainer>
      </NavbarContainer>
      {editFullNameDetail && isCurrentUser && (
        <EditFullName
          firstName={firstName}
          lastName={lastName}
          setEditFullNameDetail={setEditFullNameDetail}
          editFullNameDetail={editFullNameDetail}
          location={{ label: location || '', value: location || '' }}
        />
      )}
      <FollowerContainer>
        <TextComp>
          <Count>{followers}</Count>
          {followersLabel}
        </TextComp>
        <TextComp>
          <Count>{following}</Count>
          {followingLabel}
        </TextComp>
      </FollowerContainer>
      <StickyNavbar open={popoverOpen}>
        <TabsContainer>
          <Tab active={activeTab === Tabs.brand} href={userProfileUrl(username)}>{brand}</Tab>
          <Tab active={activeTab === Tabs.resume} href={userResumeUrl(username)}>{resume}</Tab>
          <Tab active={activeTab === Tabs.content} href={userContentUrl(username)}>{content}</Tab>
        </TabsContainer>
      </StickyNavbar>
    </>
  );
};

export default MobileNavbar;
