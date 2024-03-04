import React, { useMemo, useState } from 'react';
import SliderCard from 'components/ProfileCard/Card';
import Video from 'components/VideoPlayer';
import { MuteIcnWrapper } from 'components/DefaultCard/styles';
import MuteIcon from 'components/Icons/MuteIcon';
import { StyledImage, VideoContainer } from './style';
import { PostCardsProps } from '../type';

const PostCards = ({ card }: PostCardsProps) => {
  const isVideo = (media: string) => ['mp4', 'MOV', '.mov', '.MP4'].some((url) => media?.includes(url)) && media;
  const [mute, setMute] = useState(true);
  const cards = useMemo(() => {
    try {
      return card.media.filter((media) => media).map((media) => {
        return isVideo(media) ? (
          <VideoContainer>
            <Video
              media={media}
              mute={mute}
              isStopped={false}
            />
            <MuteIcnWrapper>
              <MuteIcon active={mute} onClick={() => setMute(!mute)} />
            </MuteIcnWrapper>
          </VideoContainer>
        ) : (
          <StyledImage
            src={media}
            key={media}
            alt="image"
            width={440}
            height={780}
            loading="lazy"
          />
        );
      });
    } catch (error) {
      return [];
    }
  }, [card.media]);
  // const handleSave = async (id: string) => {
  //   // TODO: Handle save
  // };
  return <SliderCard slides={cards} />;
};

export default PostCards;
