import GitHubCalendar from 'react-github-calendar';
import lang from 'common/lang';
import { useEffect, useMemo, useState } from 'react';
import { Contributions } from 'common/utils/types';
import { GITHUB_URL } from 'common/constants';
import useGithub from 'common/hooks/useGithub';
import LinkIcon from 'components/Icons/LinkIcon';
import {
  SocialBlockTitle, CalendarContainer, Wrap, Stats, Stat, GithubContainer, StatLabel, StatValue, MoreButton, SocialBlockDescription, SocialBlockInfo, StatsCalendarContainer,
  InfoContainer, NoDescription, LinkIconContainer,
} from './styles';
import { GithubBlockProps } from './types';

const githubCalendarStyle = {
  maxWidth: 'none',
  '& > div': {
    maxWidth: 'none',
  },
};
const {
  title, daysOfCoding, totalContributions, mostContributions, discoverText,
} = lang.githubCard;

const GithubBlock = ({
  username, gitBlockTitle, gitBlockDescription, buttonText, maxLength, minLength,
}: GithubBlockProps) => {
  const { getUserContributions } = useGithub();
  const year = useMemo(() => new Date().getFullYear(), []);
  const [contributions, setContributions] = useState<Contributions>({
    totalDays: 0, totalCommits: 0, mostContributionsInSingleDay: '',
  });
  useEffect(() => {
    getUserContributions(username, year)
      .then((data) => setContributions(data))
      .catch((data) => setContributions(data));
  }, []);

  return (
    <GithubContainer maxLength={maxLength}>
      {username ? (
        <StatsCalendarContainer maxLength={maxLength} minLength={minLength}>
          <Stats>
            <Stat>
              <StatValue>{contributions.totalDays}</StatValue>
              <StatLabel>{daysOfCoding}</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{contributions.totalCommits}</StatValue>
              <StatLabel>{totalContributions}</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{contributions.mostContributionsInSingleDay}</StatValue>
              <StatLabel>{mostContributions}</StatLabel>
            </Stat>
          </Stats>
          <br />
          <br />
          <CalendarContainer>
            <Wrap>
              <GitHubCalendar style={githubCalendarStyle} year={year - 1} username={username} />
            </Wrap>
          </CalendarContainer>
        </StatsCalendarContainer>
      ) : (
        <LinkIconContainer><LinkIcon /></LinkIconContainer>
      )}

      <br />
      <InfoContainer maxLength={maxLength}>
        <SocialBlockInfo maxLength={maxLength}>
          <SocialBlockTitle>
            {gitBlockTitle}
          </SocialBlockTitle>
          {gitBlockDescription ? (
            <SocialBlockDescription>
              {gitBlockDescription}
            </SocialBlockDescription>
          ) : <NoDescription maxLength={maxLength} />}

        </SocialBlockInfo>
        <br />
        <MoreButton
          label={buttonText || discoverText}
          fullWidth
          onClick={() => window.open(`${GITHUB_URL}/${username}`)}
        />
      </InfoContainer>
    </GithubContainer>
  );
};

export default GithubBlock;
