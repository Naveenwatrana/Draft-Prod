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
import {
  CardIcon,
  HighlightedMantra,
  IconWrapper,
  MediaVideoContainer,
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
  data: IFeedData | ISavedCard;
  clickable?: boolean;
  height?: number;
  width?: number;
  onClick?: () => void;
};

const CompanyCard = ({
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
    return saveContent(contentId, PINS_TYPES.COMPANIES, IInteractionItemTypes.companies);
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
      navigate(`/org/${data?.username}`);
      return;
    }
    navigate(loginUrl);
  }, [clickable, loggedInUser, data.username, navigate]);

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
            url={data.logo}
            size={80}
          >
            {!data.logo && (data.name?.charAt(0) || data.username?.charAt(0) || '?')}
          </Avatar>
          <UserText>
            <UserName>{data.name || data.username}</UserName>
            <UserLocation>{`${data.organisation_type || '-'}`}</UserLocation>
          </UserText>
          <MantraText>
            {data.mantra || data.cards?.[0]?.fields?.mantra}
          </MantraText>
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

export default CompanyCard;
