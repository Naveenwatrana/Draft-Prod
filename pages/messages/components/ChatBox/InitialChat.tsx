import lang from 'common/lang';
import React from 'react';
import DefaultCard from 'components/DefaultCard';
import TextComp from 'components/textComp';
import { companyOrgType } from 'pages/organization/create/const';
import JobCards from 'pages/feed/NewCards/JobCards';
import { InitialChatProps } from './types';
import {
  CardsPreviewContainer, Ellipse, EllipseBlank, EmptyStateContainer,
} from './style';
const {
  messages: { beginningOfConversation, sendFirstMessage },
} = lang;
const InitialChat = ({
  loggedInUser, profileData, currentJob, messageDisplay = true,
}: InitialChatProps) => {
  return (
    <EmptyStateContainer>
      {profileData && <Ellipse></Ellipse>}
      {currentJob && <EllipseBlank></EllipseBlank>}
      <CardsPreviewContainer>
        {profileData && (
          <DefaultCard
            type="info"
            height="100%"
            width="100%"
            secondaryText={profileData?.cards?.[0]?.fields?.mantra}
            primaryText={profileData?.name}
            cover={profileData?.cards?.[0]?.fields?.media}
            hideHeader
            userId={profileData?.username}
            isAuthorCompany={companyOrgType === profileData?.user_type}
          />
        )}
        {currentJob && (
          <JobCards
            data={currentJob}
            clickable={false}
            styleClass="jobCard"
          />
        )}
        <DefaultCard
          type="info"
          height="100%"
          width="100%"
          secondaryText={loggedInUser?.cards?.[0]?.fields?.mantra}
          primaryText={loggedInUser?.name}
          cover={loggedInUser?.cards?.[0]?.fields?.media}
          hideHeader
          userId={loggedInUser?.username}
          isAuthorCompany={companyOrgType === profileData?.user_type}
        />
      </CardsPreviewContainer>
      {messageDisplay
      && (
        <>
          <TextComp component="h3">{sendFirstMessage}</TextComp>
          <TextComp component="h4">{beginningOfConversation}</TextComp>
        </>
      )}
    </EmptyStateContainer>
  );
};

export default InitialChat;
