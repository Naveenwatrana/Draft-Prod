import { useState } from 'react';
import Video from 'components/VideoPlayer';
import { MuteIcnWrapper } from 'components/DefaultCard/styles';
import MuteIcon from 'components/Icons/MuteIcon';
import { VideoElementProps } from './types';

const VideoElement = ({ media }: VideoElementProps) => {
  const [mute, setMute] = useState(true);
  return (
    <>
      <Video media={media} mute={mute} />
      <MuteIcnWrapper>
        <MuteIcon active={mute} onClick={() => setMute(!mute)} />
      </MuteIcnWrapper>
    </>
  );
};

export default VideoElement;
