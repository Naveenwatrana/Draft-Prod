import {
  ChangeEvent,
  useEffect, useMemo, useState,
} from 'react';
import lang from 'common/lang';
import { useAppDispatch } from 'common/hooks/state';
import { useHandleLogout } from 'common/hooks/useHandleLogout';
import { useSelector } from 'react-redux';
import Search from 'components/Icons/Search';
import LogoIcon from 'components/Icons/icon';
import { useLocation, useNavigate } from 'common/utils/router-fill';
import { useSignOutMutation } from 'pages/account/userService';
import Notification from 'components/Notification';
import { useGetNotificationsQuery } from 'services/NotificationService';
import Link from 'next/link';
import {
  selectCurrentUser,
  setCompany,
  setUserAuth,
} from 'pages/account/authSlice';
import useCompany from 'common/hooks/useCompany';
import CreateContentButton from 'components/Molecules/CreateContent';
import { messagesUrl } from 'common/utils/network/appRouts';
import { useIsMobile } from 'common/hooks/useIsMobile';
import IconButton from 'components/Icons/IconButton';
import PaperPlaneIcon from 'components/Icons/PaperPlane';
import { useProfileQuery } from 'pages/pro/profileService';
import Loader from 'components/Loader/Loader';
import { useGetUnreadConversationsQuery } from 'pages/messages/messagesService';
import {
  Avatar,
  CrossIcon,
  InputSearchIcon,
  LeftSideContainer,
  MiddlePart,
  MiddlePartText,
  Navbar,
  RightPart,
  SearchContainer,
  SearchInput,
} from './styles';
import { getSearchTerm, setSearchTerm } from './slice';
import UserMenu from './Profile/UserMenu';

const { navBarText } = lang;

const TopNavigation = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signOut] = useSignOutMutation();
  const { handleLogout } = useHandleLogout(dispatch);
  const currentUser = useSelector(selectCurrentUser);
  const { currentCompany } = useCompany();
  const searchTerm = useSelector(getSearchTerm);
  const [firstName, setFirstName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: notificationsData } = useGetNotificationsQuery('1');
  const { data: unreadMessageData, refetch } = useGetUnreadConversationsQuery(currentCompany?.username);
  useEffect(() => {
    refetch();
  }, [location.pathname]);
  const [skip, setSkip] = useState(true);
  const { isLoading, data } = useProfileQuery({
    username: currentUser?.username,
    company: currentCompany?.username,
  }, { skip: skip || !currentUser?.username });

  useEffect(() => {
    if (currentUser) {
      const { first_name: firstNameValue = '' } = currentUser;
      setFirstName(firstNameValue);
    }
    setSkip(!!currentUser?.cards?.length);
  }, [currentUser]);
  useEffect(() => {
    if (data?.data) {
      dispatch(setUserAuth(data.data));
    }
  }, [data]);
  const handleLogoutClick = async () => {
    await signOut();
    await fetch('/api/logout', {
      method: 'POST',
    });
    handleLogout();
  };

  const handleSwitchAccount = async (company: any) => {
    await fetch('/api/company/switch', {
      method: 'POST',
      body: JSON.stringify({ company }),
      cache: 'no-store',
    });
    dispatch(setCompany({ currentCompany: company }));
    window?.location.reload();
    setShowUserMenu(false);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    if (location.pathname !== '/feed') {
      navigate('/feed');
    }
  };

  const autoFocus = useMemo(() => pathName === '/feed' && searchTerm, [pathName]);

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <Navbar>
      <LeftSideContainer>
        {isLoading && <Loader />}
        <Link href="/feed"><LogoIcon theme="light" /></Link>
        {!isMobile && (
          <MiddlePart>
            <MiddlePartText
              handleClick={() => navigate('/feed')}
              isActive={pathName.includes('feed')}
              component="h4"
            >
              {navBarText.feed}
            </MiddlePartText>
            <MiddlePartText
              handleClick={() => navigate('/workspace')}
              isActive={pathName.includes('workspace')}
              component="h4"
            >
              {navBarText.workspace}
            </MiddlePartText>
          </MiddlePart>
        )}
      </LeftSideContainer>
      {!isMobile && (
        <MiddlePart>
          <SearchContainer>
            <SearchInput
              placeholder={navBarText.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearch}
              autoFocus={autoFocus}
            />
            <InputSearchIcon size={25} />
            {searchTerm && <CrossIcon size={14} onClick={clearSearch} />}
          </SearchContainer>
        </MiddlePart>
      )}
      <RightPart>
        {isMobile && <Search onClick={() => navigate('/feed/search')} />}
        {!isMobile && <CreateContentButton />}
        <IconButton onClick={() => navigate(messagesUrl)} active={pathName === messagesUrl}>
          <PaperPlaneIcon hasNotification={!!unreadMessageData?.data?.unread_conversation_count} />
        </IconButton>
        <Notification list={notificationsData?.data?.data} />
        {firstName && (
          <div>
            <Avatar
              aria-hidden="true"
              onClick={(event) => {
                event.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              data-cy="profileIcon"
              rectangle={!currentCompany}
              url={currentCompany?.logo || currentUser?.cards?.[0]?.fields?.media}
            >
              {!!currentCompany && !currentCompany?.logo && currentCompany.name.charAt(0)}
              {!currentCompany && !currentUser?.cards?.[0]?.fields?.media && firstName.charAt(0)}
            </Avatar>
            <UserMenu onSwitch={handleSwitchAccount} onLogout={handleLogoutClick} toggleShow={setShowUserMenu} show={showUserMenu} />
          </div>
        )}
      </RightPart>
    </Navbar>
  );
};

export default TopNavigation;
