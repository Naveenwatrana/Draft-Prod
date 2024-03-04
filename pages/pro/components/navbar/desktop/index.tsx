import { useAppSelector } from 'common/hooks/state';
import React, { useRef, useState } from 'react';
import BackIcon from 'components/Icons/BackIcon';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import EditFullName from 'pages/pro/basicDetails/desktop/EditBasicDetail/EditFullName';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { Tabs } from 'pages/pro/types';
import { userContentUrl, userProfileUrl, userResumeUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { getIsCurrentUser, getUser } from 'pages/pro/profileSlice';
import { useGlobals } from 'common/hooks/useGlobals';
import {
  Count,
  FollowerContainer,
  LocationContainer,
  NameContainer,
  NavbarContainer,
  Tab,
  TabsContainer,
  UserNameWrapper,
  Username,
  UsernameH1,
} from './style';
const {
  profile: {
    brand, content, followersLabel, followingLabel, resume,
  },
} = lang;
type DesktopNavbarProps = {
  onBack: () => void;
  activeTab: number;
  followerCount: number;
  followingCount: number;
  name: string;
  location?: string | null;
  userName: string;
  setSkip?: () => void;
}
const DesktopNavbar = ({
  onBack, activeTab, followerCount, followingCount, name, userName, location: userLocation, setSkip,
} : DesktopNavbarProps) => {
  const {
    following, followers, firstName, lastName, username: usernameFromStore, location,
  } = useAppSelector(getUser);
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const globals = useGlobals();
  const loggedInUser = useLoggedInUser();
  const [editFullNameDetail, setEditFullNameDetail] = useState<boolean>(false);
  const [, setPopoverOpen] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => setPopoverOpen(false),
  });
  const handleUserNameClick = () => {
    if (isCurrentUser) {
      setEditFullNameDetail(true);
    }
    if (setSkip) {
      setSkip();
    }
  };
  const finalUserName = userName || usernameFromStore;
  return (
    <NavbarContainer>
      <NameContainer>
        <BackIcon onClick={onBack} />
        <UserNameWrapper>
          {isCurrentUser && (
            <h1>
              <Username
                active={editFullNameDetail}
                label={(name || userName)}
                onClick={handleUserNameClick}
                data-cy="userName"
                disable={!loggedInUser}
              />
            </h1>
          )}
          {!isCurrentUser && <UsernameH1>{(name || userName)}</UsernameH1>}
          <LocationContainer>
            {location?.label || userLocation}
          </LocationContainer>
        </UserNameWrapper>
      </NameContainer>
      {editFullNameDetail && isCurrentUser && (
        <EditFullName
          firstName={firstName}
          lastName={lastName}
          location={{ label: location, value: location }}
          setEditFullNameDetail={setEditFullNameDetail}
          editFullNameDetail={editFullNameDetail}
        />
      )}
      <TabsContainer>
        <Tab active={activeTab === Tabs.brand} href={`${globals?.origin}/${userProfileUrl(finalUserName)}`}>{brand}</Tab>
        <Tab active={activeTab === Tabs.resume} href={`${globals?.origin}/${userResumeUrl(finalUserName)}`}>{resume}</Tab>
        <Tab active={activeTab === Tabs.content} href={`${globals?.origin}/${userContentUrl(finalUserName)}`}>{content}</Tab>
      </TabsContainer>
      <FollowerContainer>
        <TextComp>
          <Count>{followers || followerCount}</Count>
          {followersLabel}
        </TextComp>
        <TextComp>
          <Count>{following || followingCount}</Count>
          {followingLabel}
        </TextComp>
      </FollowerContainer>
    </NavbarContainer>
  );
};

export default DesktopNavbar;
