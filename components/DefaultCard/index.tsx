import MuteIcon from 'components/Icons/MuteIcon';
import { useState } from 'react';
import Video from 'components/VideoPlayer';
import { removeURLSpace } from 'components/CardCreationWizard/components/CardFields/utils';
import ContentSection from './ContentSection';
import DefaultCardHeader from './DefaultCardHeader';
import ProjectSection from './ProjectSection';
import { Card, MuteIcnWrapper } from './styles';
import { DefaultCardProps } from './types';

const DefaultCard = ({
  width,
  height,
  cover,
  primaryText,
  secondaryText,
  tertiaryText,
  tertiaryPairText,
  longText,
  longTextTitle,
  range,
  icon,
  links,
  type,
  projects,
  totalCardsinStack,
  primaryFontSize,
  hideHeader,
  showCardType,
  showSave,
  hideBorder,
  className,
  size,
  isSplitCard,
  onClick,
  isLocalVideo,
  isStopped = false,
  withFollowButton,
  userId,
  isAuthorCompany,
  followUser,
  following,
  userNameClickable,
}: DefaultCardProps) => {
  const isHeightLessThan200 = height ? Number(height.slice(0, -2)) < 200 : false;
  const localVideo = typeof isLocalVideo === 'string' ? ['mp4', 'mov'].some((url) => isLocalVideo?.includes(url)) : isLocalVideo;
  const isVideo = (['mp4', 'mov'].some((url) => cover?.includes(url)) && cover) || localVideo;
  const [mute, setMute] = useState(true);
  return (
    <Card
      cover={isVideo ? '' : removeURLSpace(cover || '')}
      split={isSplitCard}
      width={width}
      height={height}
      primaryFontSize={primaryFontSize}
      hideBorder={hideBorder}
      className={className}
      data-testid="cardContainer"
      data-cy="cardContainer"
      onClick={onClick}
    >
      {isVideo && cover && <Video media={cover} mute={mute} isStopped={isStopped} />}
      <DefaultCardHeader
        hideHeader={hideHeader}
        totalCardsinStack={totalCardsinStack}
        type={type}
        showCardType={showCardType}
        showSave={showSave}
      />
      {isVideo && !isStopped && (
        <MuteIcnWrapper>
          <MuteIcon active={mute} onClick={() => setMute(!mute)} />
        </MuteIcnWrapper>
      )}
      <ProjectSection primaryFontSize={primaryFontSize} projects={projects} />
      <ContentSection
        primaryFontSize={primaryFontSize}
        longText={longText}
        longTextTitle={longTextTitle}
        icon={icon}
        secondaryText={secondaryText}
        type={type}
        range={range}
        tertiaryText={tertiaryText}
        tertiaryPairText={tertiaryPairText}
        links={links}
        primaryText={primaryText}
        shrinkText={isHeightLessThan200}
        size={size}
        withFollowButton={withFollowButton}
        userId={userId}
        isAuthorCompany={isAuthorCompany}
        followUser={followUser}
        following={following}
        userNameClickable={userNameClickable}
      />
    </Card>
  );
};

export default DefaultCard;
