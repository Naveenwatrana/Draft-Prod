import React from 'react';
import lang from 'common/lang';
import { useSelector } from 'react-redux';

import { JobPageProps } from 'pages/jobs/details/types';
import TextComp from 'components/textComp';
import {
  Avatar,
} from 'components/NavBar/styles';
import FlagIcon from 'components/Icons/JobIcons/flag.svg';
import PiechartIcon from 'components/Icons/JobIcons/piechart.svg';
import PeopleIcon from 'components/Icons/JobIcons/community.svg';
import LocationIcon from 'components/Icons/JobIcons/location.svg';

import { selectCurrentUser } from 'pages/account/authSlice';
import { PlaceHolderText } from 'pages/workspace/common/jobApplicationsDesktop/styles';
import {
  DividerComp, HeighlightIcon, HeighlightTag, HeighlightValues, JobDetailSectionSubTitle,
} from 'pages/jobs/details/styles';
import {
  CompanyContainer, CompanyInfoContainer, CompanyNameContainer, CompanyHighLightContainer, CompanyHighLightDiv, CompanyHighlight,
} from './style';
const { jobs } = lang;

const CompanyBlock = ({ jobData, isAuthor, loggedInUser } : JobPageProps) => {
  const companyData = jobData?.company;
  const currentUser = useSelector(selectCurrentUser) || loggedInUser;
  return (
    <CompanyContainer>
      <CompanyInfoContainer>
        <Avatar
          rectangle={false}
          url={companyData?.logo}
          size={84}
        >
          {!companyData?.logo && (companyData?.name?.charAt(0) || companyData?.username?.charAt(0) || '?')}
        </Avatar>
        <CompanyNameContainer>
          <TextComp component="h3">{companyData?.name}</TextComp>
          <JobDetailSectionSubTitle>{companyData?.type}</JobDetailSectionSubTitle>
          <TextComp>{companyData?.mantra}</TextComp>
        </CompanyNameContainer>
      </CompanyInfoContainer>
      <DividerComp />
      <CompanyHighLightContainer>
        {(companyData?.organisation_type || companyData?.gics_sub_industries) && (
          <CompanyHighLightDiv>
            {companyData?.organisation_type && (
              <CompanyHighlight>
                <HeighlightIcon>
                  <FlagIcon />
                </HeighlightIcon>
                <HeighlightTag>{companyData?.organisation_type}</HeighlightTag>
              </CompanyHighlight>
            )}
            {companyData?.gics_sub_industries && (
              <CompanyHighlight>
                <HeighlightIcon>
                  <PiechartIcon />
                </HeighlightIcon>
                <HeighlightValues>
                  <HeighlightTag>{companyData?.gics_sub_industries}</HeighlightTag>
                </HeighlightValues>
              </CompanyHighlight>
            )}
          </CompanyHighLightDiv>
        )}
        {(companyData?.headcount || companyData?.hq_location) && (
          <CompanyHighLightDiv>
            {companyData?.headcount && (
              <CompanyHighlight>
                <HeighlightIcon>
                  <PeopleIcon />
                </HeighlightIcon>
                <HeighlightTag>{!!companyData?.headcount && companyData?.headcount.replace('[', '').replace(']', '').replace('-', ' - ')}</HeighlightTag>
              </CompanyHighlight>
            )}
            {companyData?.hq_location && (
              <CompanyHighlight>
                <HeighlightIcon>
                  <LocationIcon />
                </HeighlightIcon>
                <HeighlightValues>
                  <HeighlightTag>{companyData?.hq_location}</HeighlightTag>
                </HeighlightValues>
              </CompanyHighlight>
            )}
          </CompanyHighLightDiv>
        )}
      </CompanyHighLightContainer>
    </CompanyContainer>
  );
};

export default CompanyBlock;
