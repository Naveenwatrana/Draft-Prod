import { useAppSelector } from 'common/hooks/state';
import useCompany from 'common/hooks/useCompany';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import { orgProfileUrl, userProfileUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import UserAccountList from 'components/NavBar/AccountsList';
import {
  UserDropDown,
  UserDropDownItem,
  LeftIcon,
  RightIcon,
  DropDownDivider,
  DropDownItem,
} from 'components/NavBar/styles';
import { selectCurrentUser } from 'pages/account/authSlice';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import ProfileIcon from 'components/Icons/ProfileIcon';
import SettingsIcon from 'components/Icons/SettingsIcon';
import { theme } from 'common/theme';
import QuestionMarkIcon from 'components/Icons/QuestionMarkIcon';
import CreateOrgIcon from 'components/Icons/CreateOrgIcon';
import LogoutIcon from 'components/Icons/LogoutIcon';
import ReportBugIcon from 'components/Icons/ReportBugIcon';
import SuggestIdeaIcon from 'components/Icons/SuggestIdeaIcon';
import Link from 'next/link';
import PreferenceIcon from 'components/Icons/PreferenceIcon';
import { UserMenuProps } from './type';
const {
  navBarText: { profile },
} = lang;
const UserMenu = ({
  onSwitch,
  onLogout,
  show,
  toggleShow,
}: UserMenuProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const companiesArray = useMemo(() => {
    const companies = currentUser?.companies;
    const uniqueAssociatedCompanies = currentUser?.associated_companies?.filter(
      (associated: { url: string }) => !companies?.some((company: { url: string }) => company?.url?.includes(associated?.url)),
    );
    return companies?.length >= 0 && uniqueAssociatedCompanies?.length >= 0
      ? [...companies, ...uniqueAssociatedCompanies]
      : [];
  }, [currentUser]);
  const { currentCompany } = useCompany();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => toggleShow(false),
  });
  useEffect(() => {
    if (!show) setIsDropdownOpen(false);
  }, [show]);
  if (!show) return null;
  return (
    <UserDropDown ref={wrapperRef}>
      {companiesArray?.length > 0 && (
        <>
          <DropDownItem
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            data-cy="switchAccounts"
            style={{
              justifyContent: !isDropdownOpen ? 'space-between' : 'flex-start',
            }}
          >
            {isDropdownOpen && (
              <LeftIcon color={theme.palette.gray[30].value} />
            )}
            <span>{profile.switchAccounts}</span>
            {!isDropdownOpen && (
              <RightIcon color={theme.palette.gray[30].value} />
            )}
          </DropDownItem>
          {isDropdownOpen && (
            <UserAccountList
              handleSwitch={onSwitch}
              firstName={currentUser?.first_name}
              companiesList={companiesArray}
            />
          )}
          <DropDownDivider />
        </>
      )}
      {!isDropdownOpen && (
        <>
          <UserDropDownItem
            as="a"
            href={
              !currentCompany
                ? userProfileUrl(currentUser?.username)
                : orgProfileUrl(currentCompany.username)
            }
            data-cy="myProfile"
          >
            <ProfileIcon />
            {profile.myProfile}
          </UserDropDownItem>
          <Link href="/workspace/preferences">
            <UserDropDownItem>
              <PreferenceIcon color="#5FF088" />
              {profile.preferences}
            </UserDropDownItem>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_REPORT_BUG_URL}`}
            target="_blank"
            data-cy="reportBug"
          >
            <UserDropDownItem>
              <ReportBugIcon />
              {profile.reportBug}
            </UserDropDownItem>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_SUGGEST_IDEA_URL}`}
            target="_blank"
            data-cy="suggestIdea"
          >
            <UserDropDownItem>
              <SuggestIdeaIcon />
              {profile.suggestIdea}
            </UserDropDownItem>
          </Link>
          <Link href="/workspace/settings">
            <UserDropDownItem>
              <SettingsIcon color="#5FF088" />
              {profile.settings}
            </UserDropDownItem>
          </Link>
          <UserDropDownItem>
            <QuestionMarkIcon />
            {profile.help}
          </UserDropDownItem>
        </>
      )}
      {(!companiesArray?.length || isDropdownOpen) && (
        <>
          {!isDropdownOpen && <DropDownDivider />}
          <UserDropDownItem
            onClick={() => navigate('/organization/create')}
            onKeyDown={() => navigate('/organization/create')}
            data-cy="createOrganization"
          >
            <CreateOrgIcon />
            {profile.createOrganization}
          </UserDropDownItem>
        </>
      )}
      {!isDropdownOpen && (
        <>
          <DropDownDivider />
          <UserDropDownItem
            onClick={onLogout}
            onKeyDown={onLogout}
            data-cy="logOut"
          >
            <LogoutIcon />
            {profile.logout}
          </UserDropDownItem>
        </>
      )}
    </UserDropDown>
  );
};

export default UserMenu;
