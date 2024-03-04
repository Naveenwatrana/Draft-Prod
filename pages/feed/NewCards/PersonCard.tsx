import React, {
  MouseEvent, useCallback, useEffect, useState,
} from 'react';
import lang from 'common/lang';

import { SkillSection, SkillTag } from 'components/Organisms/ProfileBio/style';
import { useNavigate } from 'common/utils/router-fill';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { PINS_TYPES } from 'common/types';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { loginUrl, userProfileUrl } from 'common/utils/network/appRouts';
import {
  UserDetail, UserInfo, UserLocation, UserText, UserName, MantraText,
} from 'pages/jobs/details/styles';
import { Avatar } from 'components/NavBar/styles';
import SaveIcon from 'components/Icons/SaveIcon';
import ButtonComp from 'components/buttonComp';
import SideArrow from 'components/ProfileCard/sideArrow';
import Slider from 'react-slick';
import { StyledImage } from 'components/CardCreationWizard/components/Cards/Post/style';
import Video from 'components/VideoPlayer';
import { ISavedCard } from 'pages/workspace/type';
import { UserProfile } from 'pages/pro/types';
import {
  CardIcon,
  HighlightedMantra,
  IconWrapper,
  MediaVideoContainer,
  ProfileImage,
  SliderContainer,
  UserCardBio, UserCardBlock, UserCardLocation, UserCardName, UserContainer, UserImage, VideoContainer,
} from './style';
import { IFeedData } from '../types';

const {
  userBio: {
    hide,
  },
} = lang;

type UserCardsProps = {
  data: IFeedData | ISavedCard | UserProfile;
  clickable?: boolean;
  height?: number;
  width?: number;
  onClick?: () => void;
};

const PersonCard = ({
  data, clickable = true, height, width = 364, onClick,
}: UserCardsProps) => {
  const navigate = useNavigate();
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const { saveContent, isLoading } = useSaveContent();
  const [saved, setSaved] = useState<boolean>(data?.saved || false);
  const [showMoreSkillData, setShowMoreSkillData] = useState<boolean>();
  const [blocks, setBlocks] = useState<any>([]);
  const loggedInUser = useLoggedInUser();

  const saveHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!clickable) return;
    const contentId = data.id.toString();
    e.stopPropagation();
    setSaved(!saved);
    return saveContent(contentId, PINS_TYPES.USER, IInteractionItemTypes.users);
  };

  useEffect(() => {
    if (data?.blocks) {
      setBlocks(data.blocks.filter((block) => block.fields?.media && block.type === 'highlight'));
    }
  }, [data]);

  const handleCardClick = useCallback(() => {
    if (onClick) onClick();
    if (!clickable) return;
    if (loggedInUser && data.username) {
      navigate(userProfileUrl(data.username));
      return;
    }
    navigate(loginUrl);
  }, [clickable, loggedInUser, data.username, navigate]);

  const showLessSkills = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMoreSkillData(false);
  };

  const showMoreSkills = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMoreSkillData(true);
  };

  const isVideo = (media: string) => ['mp4', 'MOV', '.mov', '.MP4'].some((url) => media?.includes(url)) && media;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SideArrow sliderRef={sliderRef} type="left" preventLoop />,
    nextArrow: <SideArrow sliderRef={sliderRef} type="right" preventLoop />,
  };

  const initialSkillLength = 3;
  const loadCount = showMoreSkillData ? (data.expertise || []).length : initialSkillLength;
  const numberOfMoreData = (data.expertise || []).length - initialSkillLength;
  const moreData = numberOfMoreData.toString();
  return (
    <UserContainer width={width} onClick={() => { handleCardClick(); }}>
      <CardIcon data-testid="cardIcon" data-cy="cardIcon">
        <IconWrapper onClick={saveHandler} disabled={isLoading}>
          <SaveIcon size={16} active={saved} />
        </IconWrapper>
      </CardIcon>
      <UserInfo>
        <UserDetail>
          <Avatar
            rectangle={false}
            url={data.profile_image}
            size={80}
          >
            {data.profile_image && <ProfileImage src={data.profile_image} alt="profile" />}
            {!data.profile_image && (data.name?.charAt(0) || data.username?.charAt(0) || '?')}
          </Avatar>
          <UserText>
            <UserName>{data.name || data.username}</UserName>
            <UserLocation>{`${data.location || '-'}`}</UserLocation>
          </UserText>
          <MantraText>
            {data.mantra}
          </MantraText>
          {!!data.expertise && data.expertise?.length > 0 && (
            <SkillSection>
              {data.expertise?.slice(0, loadCount).map((skill: string) => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
              {(data.expertise && (data.expertise?.length || 0) > initialSkillLength && (
                <SkillTag>{`+${moreData}`}</SkillTag>
              ))}
            </SkillSection>
          )}
        </UserDetail>
      </UserInfo>
      {blocks.length > 0 && (
        <SliderContainer onClick={(e) => { e.stopPropagation(); }}>
          <Slider {...settings} ref={setSliderRef}>
            {blocks.map((card: any) => (
              <>
                {isVideo(card.fields?.media) ? (
                  <MediaVideoContainer>
                    <Video
                      media={card.fields?.media}
                      mute={true}
                      isStopped={false}
                    />
                  </MediaVideoContainer>
                ) : (
                  <StyledImage
                    src={card.fields?.media}
                    key={card.fields?.media}
                    alt="image"
                    width={width}
                    height={252}
                    loading="lazy"
                  />
                )}
                <HighlightedMantra>
                  <span style={{ width }}>{card.fields?.mantra || card.fields?.title}</span>
                </HighlightedMantra>
              </>
            ))}
          </Slider>
        </SliderContainer>
      )}
    </UserContainer>
  );
};

export default PersonCard;
