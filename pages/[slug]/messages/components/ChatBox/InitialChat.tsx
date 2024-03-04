import lang from 'common/lang';
import React from 'react';
import DefaultCard from 'components/DefaultCard';
import TextComp from 'components/textComp';
import { companyOrgType } from 'pages/organization/create/const';
import JobCards from 'pages/feed/NewCards/JobCards';
import PersonCard from 'pages/feed/NewCards/PersonCard';
import {
  JobMatchingSkillsCount, JobSkills, JobSkillsCount, LitCandidate, MantraText, ResCardContainer,
  ShortListElement, UserDetail, UserInfo, UserLocation, UserName, UserText,
} from 'pages/jobs/details/styles';
import { JOB_VIEW_TYPE } from 'common/types';
import { userProfileUrl } from 'common/utils/network/appRouts';
import { StyledDivider } from 'components/Divider/styles';
import { Avatar } from 'components/NavBar/styles';
import {
  JobApplicationFooter, MatchScoreRow, Score, GotoMessage,
} from 'pages/workspace/common/jobApplicationsDesktop/styles';
import { InitialChatProps } from './types';
import { CardsPreviewContainer, Ellipse, EmptyStateContainer } from './style';
const {
  messages: { beginningOfConversation, sendFirstMessage },
} = lang;
const InitialChat = ({
  loggedInUser, profileData, messageDisplay = true, jobData,
}: InitialChatProps) => {
  const score = (((jobData.user_matched_skills_count || 0) * 100) / (jobData.job_skills_count || 1));
  return (
    <EmptyStateContainer>
      <Ellipse></Ellipse>
      <CardsPreviewContainer>
        <ResCardContainer key={profileData.id} shortlisted={false} onClick={() => { }}>
          <UserInfo>
            <UserDetail>
              <Avatar
                rectangle={false}
                url={profileData.profile_image}
                size={80}
              >
                {!profileData.profile_image && (profileData.name?.charAt(0) || profileData.username?.charAt(0) || '?')}
              </Avatar>
              <UserText>
                <UserName>{profileData?.name || profileData.username}</UserName>
                <UserLocation>{`${profileData?.location || '-'}`}</UserLocation>
              </UserText>
              <MantraText>
                {profileData?.mantra}
              </MantraText>
            </UserDetail>
          </UserInfo>
          <JobApplicationFooter>
            <MatchScoreRow>
              Match score
              <Score>{`${score}%`}</Score>
            </MatchScoreRow>
            <StyledDivider />
            <MatchScoreRow>
              Skills
              <JobSkills>
                <JobSkillsCount>
                  <JobMatchingSkillsCount>{`${(jobData?.user_matched_skills_count || 0)}`}</JobMatchingSkillsCount>
                  /
                  {`${(jobData?.job_skills_count || jobData?.skills?.length || 0)}`}
                </JobSkillsCount>
              </JobSkills>
            </MatchScoreRow>
            <StyledDivider />
            {/* <MatchScoreRow>
              Messages
              <GotoMessage onClick={(e) => { e.stopPropagation(); navigate(`/${slug}/${JOB_VIEW_TYPE.MESSAGES}/pro/${profileData?.username}`); }}>View messages</GotoMessage>
            </MatchScoreRow>
            <StyledDivider />*/}
            <MatchScoreRow>
              Past applications
              <span>{profileData?.past_application_count || 0}</span>
            </MatchScoreRow>
          </JobApplicationFooter>
        </ResCardContainer>
        <JobCards
          data={{ ...jobData, match_score: score }}
          clickable={false}
          allowB2B={true}
          matchScore={score}
          styleClass="jobCard"
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
