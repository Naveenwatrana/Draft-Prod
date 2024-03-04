import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Player = styled(ReactPlayer)`
& video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

type VideoProps = {
  media: string;
  mute?: boolean;
  isStopped?: boolean;
};

export const Video = ({ media, mute = true, isStopped }: VideoProps) => {
  return (
    <Player
      height="100%"
      width="100%"
      loop={true}
      playsinline={true}
      style={{ position: 'absolute', top: 0, left: 0 }}
      muted={mute}
      playing={!isStopped}
      url={media}
      controls={false}
    />
  );
};

export default Video;
