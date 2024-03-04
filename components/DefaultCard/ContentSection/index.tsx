import LinkCardButton from 'components/Atoms/LinkCardButton';
import EllipseIcon from 'components/Icons/EllipseIcon';
import { theme } from 'common/theme';
import { formatNumberToCurrency } from 'common/utils/helpers';
import UserNameView from 'components/Atoms/UserNameView';
import { ContentSectionProps } from '../types';
import {
  CompanyLogo,
  ContentContainer,
  LongText,
  Secondary,
  Tertiary,
  LongTextTitle,
  FollowButton,
  UserInfo,
  TertiaryPairTextContainer,
  TertiaryPairText,
  JobTertiary,
  JobSalaryContent,
  JobRange,
  JobSecondaryText,
  JobContent,
} from './styles';

const ContentSection = ({
  longText,
  icon,
  secondaryText,
  type,
  range,
  tertiaryText,
  tertiaryPairText,
  links,
  primaryText,
  longTextTitle,
  shrinkText,
  size,
  withFollowButton,
  userId,
  isAuthorCompany,
  followUser,
  following,
  userNameClickable = true,
}: ContentSectionProps) => {
  const renderInfoCard = () => {
    return (
      <>
        {icon && (
          <CompanyLogo
            src={icon}
            alt="icon"
            data-testid="cardLogo"
            data-cy="cardLogo"
          />
        )}
        {secondaryText && <Secondary component="h3">{secondaryText}</Secondary>}
        {tertiaryText && <Tertiary component="p">{tertiaryText}</Tertiary>}
        <UserInfo>
          <UserNameView
            userNameClickable={userNameClickable}
            primaryText={primaryText}
            size={size}
            isAuthorCompany={isAuthorCompany}
            userId={userId}
          />
          {withFollowButton && followUser && <FollowButton onClick={followUser} isFollowing={!!following} />}
        </UserInfo>
      </>
    );
  };

  const renderJobCard = () => {
    return (
      <JobContent>
        {icon && (
          <CompanyLogo
            src={icon}
            alt="icon"
            data-testid="cardLogo"
            data-cy="cardLogo"
          />
        )}
        {secondaryText && <JobSecondaryText component="h2">{secondaryText}</JobSecondaryText>}
        <JobSalaryContent>
          {type === 'job' && !!range?.from && (
            <JobRange component="h4">
              {`${formatNumberToCurrency(range.from)}${range?.to ? ` - ${formatNumberToCurrency(range.to)}` : ''}`}
            </JobRange>
          )}
          {tertiaryPairText && <JobTertiary title={tertiaryPairText[1]}>{tertiaryPairText[1]}</JobTertiary>}
          {tertiaryPairText && (
            <TertiaryPairTextContainer>
              <TertiaryPairText>{tertiaryPairText[0]}</TertiaryPairText>
              <EllipseIcon
                color={theme.palette.gray[30].value}
                variant="small"
              />
              <TertiaryPairText>{tertiaryText}</TertiaryPairText>
            </TertiaryPairTextContainer>
          )}
        </JobSalaryContent>
        <UserInfo>

          <UserNameView
            userNameClickable={userNameClickable}
            primaryText={primaryText}
            size={size}
            isAuthorCompany={isAuthorCompany}
            userId={userId}
          />
          {withFollowButton && followUser && <FollowButton onClick={followUser} isFollowing={!!following} />}
        </UserInfo>
      </JobContent>
    );
  };

  const renderAboutCard = () => {
    return (
      <>
        {longTextTitle && <LongTextTitle>{longTextTitle}</LongTextTitle>}
        {longText && <LongText size={size} component="h3" shrinkText={shrinkText}>{longText}</LongText>}

        <UserInfo>

          <UserNameView
            userNameClickable={userNameClickable}
            primaryText={primaryText}
            size={size}
            isAuthorCompany={isAuthorCompany}
            userId={userId}
          />
          {withFollowButton && followUser && <FollowButton onClick={followUser} isFollowing={!!following} />}
        </UserInfo>
      </>
    );
  };

  const renderLinkCard = () => {
    return (
      <>
        {links
          && links?.length > 0
          && links?.map(({ name, url }, index) => (
            <LinkCardButton
              name={name}
              size={size}
              url={url}
              key={index /* eslint-disable-line react/no-array-index-key */}
            />
          ))}
        <UserInfo>

          <UserNameView
            userNameClickable={userNameClickable}
            primaryText={primaryText}
            size={size}
            isAuthorCompany={isAuthorCompany}
            userId={userId}
          />
          {withFollowButton && followUser && <FollowButton onClick={followUser} isFollowing={!!following} />}
        </UserInfo>
      </>
    );
  };

  const renderPostArticleCard = () => {
    return (
      <>
        {secondaryText && <Secondary component="h3">{secondaryText}</Secondary>}
        {tertiaryText && <Tertiary component="p">{tertiaryText}</Tertiary>}
        <UserInfo>

          <UserNameView
            userNameClickable={userNameClickable}
            primaryText={primaryText}
            size={size}
            isAuthorCompany={isAuthorCompany}
            userId={userId}
          />
          {withFollowButton && followUser && <FollowButton onClick={followUser} isFollowing={!!following} />}
        </UserInfo>
      </>
    );
  };
  return (
    <ContentContainer>
      {type === 'info' && renderInfoCard()}
      {type === 'job' && renderJobCard()}
      {type === 'about' && renderAboutCard()}
      {type === 'link' && renderLinkCard()}
      {(type === 'article' || type === 'post') && renderPostArticleCard()}
      {type === 'project' && <UserNameView userNameClickable={false} size={size} primaryText={primaryText} />}
    </ContentContainer>
  );
};

export default ContentSection;
