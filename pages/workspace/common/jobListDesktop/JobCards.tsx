import React, { useCallback, useState } from 'react';
import { formatDate } from 'common/utils/date/dateFormat';
import { ARTICLE_DATE_FORMAT } from 'common/constants';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { PINS_TYPES } from 'common/types';
import { jobDetailsUrl, loginUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { useNavigate } from 'common/utils/router-fill';
import { formatNumberToCurrency } from 'common/utils/helpers';
import AvailableSkillsIcon from 'components/Icons/MatchIcon.svg';
import MissingSkillsIcon from 'components/Icons/MissingSkill.svg';
import { useSelector } from 'react-redux';
import { IFeedData, MatchTypes } from 'pages/feed/types';
import {
  CompanyInfo, CompanyLogo, CompanyName, FeedDate, JobAttribute, JobContainer, JobDetailsContainer,
  JobTitle, JobTitleContainer, UserAvatar,
} from 'pages/feed/NewCards/style';
import { StyledDivider } from 'components/Divider/styles';
import {
  AvatarStack,
  GotoMessage, JobApplicationFooter, JobStatus, MatchScoreRow, Score,
} from './styles';
import { PlaceHolderText } from '../jobApplicationsDesktop/styles';

type JobCardsProps = {
  data: IFeedData;
  height?: number;
  width?: number;
  onClick?: () => void;
  clickable?: boolean;
  matchScore?: number;
  matchingSkills: number;
  totalSkills: number;
  createdAt: string;
  status: string;
};

const JobCards = ({
  data, width, height, onClick, clickable = true, matchScore, matchingSkills, totalSkills, createdAt, status,
}: JobCardsProps) => {
  const currentCompany = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const [saved, setSaved] = useState<boolean>(data?.saved || false);
  const saveJob = async (e:any, contentId: string) => {
    e.stopPropagation();
    setSaved(!saved);
    return saveContent(contentId, PINS_TYPES.JOBS, IInteractionItemTypes.jobs);
  };
  const handleCardClick = useCallback(() => {
    if (onClick) onClick();
    if (!clickable) return;
    if (loggedInUser && data?.id) {
      navigate(data?.slug ? `/${data?.slug}` : jobDetailsUrl(Number(data?.id)));
      return;
    }
    navigate(loginUrl);
  }, [onClick, clickable, loggedInUser, navigate, data?.id]);
  let extraMatchCount = 0;
  if (data.matches) {
    extraMatchCount = Object.keys(data.matches).filter((elem:string) => {
      return (data.matches as {[key: string]: boolean})[elem] === true && elem !== MatchTypes.baseSalaryMatch
      && elem !== MatchTypes.locationType && elem !== MatchTypes.location;
    }).length;
  }
  return (
    <JobContainer onClick={handleCardClick} width={width}>
      <JobStatus>
        {status}
      </JobStatus>
      <JobDetailsContainer>
        <CompanyInfo>
          <CompanyLogo src={data?.company?.logo} />
          <JobTitleContainer>
            <JobTitle>{data.title}</JobTitle>
            <CompanyName>{data?.company?.name}</CompanyName>
          </JobTitleContainer>
          <JobAttribute>
            {data.matches?.base_salary_match && !currentCompany && <AvailableSkillsIcon />}
            {!data.matches?.base_salary_match && !currentCompany && <MissingSkillsIcon />}
            {!data.salary_from && !data.salary_to ? <PlaceHolderText>Confirm salary</PlaceHolderText> : `${formatNumberToCurrency(data.salary_from || 0)} - ${formatNumberToCurrency(data.salary_to || data.salary_from || 0)}`}
          </JobAttribute>
          <JobAttribute>
            {data.matches?.location_type && !currentCompany && <AvailableSkillsIcon />}
            {!data.matches?.location_type && !currentCompany && <MissingSkillsIcon />}
            {data.location_type || <PlaceHolderText>Confirm work style</PlaceHolderText> }
          </JobAttribute>
          <JobAttribute>
            {data.matches?.location && !currentCompany && <AvailableSkillsIcon />}
            {!data.matches?.location && !currentCompany && <MissingSkillsIcon />}
            {data.location || <PlaceHolderText>Confirm location</PlaceHolderText>}
          </JobAttribute>
          <JobAttribute>
            {matchingSkills > 0 && !currentCompany && <AvailableSkillsIcon />}
            {matchingSkills === 0 && !currentCompany && <MissingSkillsIcon />}
            {totalSkills ? `${totalSkills} skills` : <PlaceHolderText>Confirm skills & technologies</PlaceHolderText>}
          </JobAttribute>
          {extraMatchCount > 0 && !currentCompany && (
            <JobAttribute>
              <AvailableSkillsIcon />
              {`+${extraMatchCount} More`}
            </JobAttribute>
          )}
        </CompanyInfo>
      </JobDetailsContainer>
      <JobApplicationFooter>
        <MatchScoreRow>
          Applicants
          <AvatarStack>
            {!!data?.applicants && data?.applicants.length < 5 && data?.applicants.map((applicant, index) => {
              const mediaValue = applicant?.user?.cards?.[0]?.fields?.media;
              return (
                <UserAvatar
                  key={mediaValue}
                  rectangle={false}
                  url={mediaValue}
                >
                  {!mediaValue && applicant?.user?.name.charAt(0)}
                </UserAvatar>
              );
            })}
            {!!data?.applicants && data?.applicants.length > 4 && data?.applicants.slice(0, 3).map((applicant, index) => {
              const mediaValue = applicant?.user?.cards?.[0]?.fields?.media;
              return (
                <UserAvatar
                  key={mediaValue}
                  rectangle={false}
                  url={mediaValue}
                >
                  {!mediaValue && applicant?.user?.name.charAt(0)}
                </UserAvatar>
              );
            })}
            {!!data?.applicants && data?.applicants.length > 4 && (
              <UserAvatar
                rectangle={false}
              >
                {`+${(data?.applicants.length || 0) - 3}`}
              </UserAvatar>
            )}
            {(!data?.applicants || data?.applicants.length === 0) && (
              <Score>
                N/A
              </Score>
            )}
          </AvatarStack>
        </MatchScoreRow>
        <StyledDivider />
        <MatchScoreRow>
          Messages
          <GotoMessage onClick={(e) => { e.stopPropagation(); navigate(data?.slug ? `/${data?.slug}/messages` : jobDetailsUrl(Number(data?.id))); }}>View messages</GotoMessage>
        </MatchScoreRow>
        <StyledDivider />
        {data.created_at && <FeedDate>{`Posted on ${formatDate(createdAt || data.created_at, ARTICLE_DATE_FORMAT)}`}</FeedDate>}
      </JobApplicationFooter>
    </JobContainer>
  );
};

export default JobCards;
