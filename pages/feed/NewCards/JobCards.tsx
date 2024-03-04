import React, { MouseEvent, useCallback, useState } from 'react';
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
import { IJob } from 'pages/jobs/details/types';

import SaveIcon from 'components/Icons/SaveIcon';

import { IFeedData, MatchTypes } from '../types';
import {
  CardIcon, CompanyInfo, CompanyLogo, CompanyName, FeedDate, IconWrapper, JobAttribute, JobContainer, JobDetailsContainer, JobFooter,
  JobTitle, JobTitleContainer, MatchPercent,
} from './style';
type JobCardsProps = {
  data: IFeedData | IJob;
  height?: number;
  width?: number;
  onClick?: () => void;
  clickable?: boolean;
  matchScore?: number;
  styleClass?: any;
  allowB2B?: boolean;
};

const JobCards = ({
  data, width, height, onClick, clickable = true, matchScore, styleClass, allowB2B = false,
}: JobCardsProps) => {
  const currentCompany = useSelector(selectCurrentCompany);
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const [saved, setSaved] = useState<boolean>(data?.saved || false);
  const saveJob = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!clickable) return;
    const contentId = data.id.toString();
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
    <JobContainer data-cy="jobCard" onClick={handleCardClick} width={width} className={styleClass}>
      <CardIcon data-testid="cardIcon" data-cy="cardIcon">
        <IconWrapper onClick={(e) => saveJob(e)} disabled={isLoading}>
          <SaveIcon size={16} active={saved} />
        </IconWrapper>
      </CardIcon>
      <JobDetailsContainer>
        <CompanyInfo>
          <CompanyLogo src={data?.company?.logo} />
          <JobTitleContainer>
            <JobTitle>{data.title}</JobTitle>
            <CompanyName>{data?.company?.name}</CompanyName>
          </JobTitleContainer>
          <JobAttribute>
            {data.matches?.base_salary_match && (!currentCompany || allowB2B) && <AvailableSkillsIcon />}
            {!data.matches?.base_salary_match && (!currentCompany || allowB2B) && <MissingSkillsIcon />}
            {`${formatNumberToCurrency(data.salary_from || 0)} ${data.salary_from ? `- ${formatNumberToCurrency(data.salary_to || data.salary_from || 0)}` : ''}`}
          </JobAttribute>
          <JobAttribute>
            {data.matches?.location_type && (!currentCompany || allowB2B) && <AvailableSkillsIcon />}
            {!data.matches?.location_type && (!currentCompany || allowB2B) && <MissingSkillsIcon />}
            {data.location_type}
          </JobAttribute>
          <JobAttribute>
            {data.matches?.location && (!currentCompany || allowB2B) && <AvailableSkillsIcon />}
            {!data.matches?.location && (!currentCompany || allowB2B) && <MissingSkillsIcon />}
            {data.location}
          </JobAttribute>
          <JobAttribute>
            {(data?.user_matched_skills_count || 0) > 0 && (!currentCompany || allowB2B) && <AvailableSkillsIcon />}
            {(data?.user_matched_skills_count || 0) === 0 && (!currentCompany || allowB2B) && <MissingSkillsIcon />}
            {(!currentCompany || allowB2B) && `${(data?.user_matched_skills_count || 0)}/${(data?.job_skills_count || data?.skills?.length || 0)} ${(data?.job_skills_count || data?.skills?.length || 0) > 1 ? 'skills' : 'skill'}`}
            {(currentCompany && !allowB2B) && `${(data?.job_skills_count || data?.skills?.length || 0)} ${(data?.job_skills_count || data?.skills?.length || 0) > 1 ? 'skills' : 'skill'}`}
          </JobAttribute>
          {extraMatchCount > 0 && (!currentCompany || allowB2B) && (
            <JobAttribute>
              <AvailableSkillsIcon />
              {`+${extraMatchCount} More`}
            </JobAttribute>
          )}
        </CompanyInfo>
      </JobDetailsContainer>
      <JobFooter>
        {data.created_at && <FeedDate>{formatDate(data.created_at, ARTICLE_DATE_FORMAT)}</FeedDate>}
        {(!currentCompany || allowB2B) && <MatchPercent>{`${matchScore || data.match_score || 0}%`}</MatchPercent>}
      </JobFooter>
    </JobContainer>
  );
};

export default JobCards;
