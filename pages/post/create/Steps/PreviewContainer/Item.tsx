import React from 'react';
import { Tooltip } from 'react-tooltip';
import { StyledCard } from 'components/cards/PreviewCard/styles';
import { useIsMobile } from 'common/hooks/useIsMobile';
import Video from 'components/VideoPlayer';
import lang from 'common/lang';
import { DividerComp, StyledDivider } from 'components/Divider/styles';
import { StyledTooltip } from '../style';
import { ItemProps } from './type';
import { ItemContainer } from './style';
const {
  posts: { reorder },
} = lang;
export const Item = ({
  item: file,
  dragHandleProps: { onMouseDown, onTouchStart },
}: ItemProps) => {
  const {
    changeSelectedFile, index, id, url, isVideo, showTooltip,
  } = file;
  const isMobile = useIsMobile();
  return (
    <ItemContainer onTouchStart={onTouchStart} onMouseDown={onMouseDown}>
      {index !== 0 && !isMobile && <StyledDivider />}
      <StyledTooltip key={id}>
        {showTooltip
        && (
          <Tooltip
            id={id}
            place="top"
            variant="light"
            offset={-20}
            content={reorder}
          />
        )}
        <StyledCard
          image={url}
          key={id}
          data-tooltip-id={id}
          width={isMobile ? 35 : 121}
          height={isMobile ? 60 : 195}
          borderRadius={12}
          onClick={() => {
            changeSelectedFile(file);
          }}
        >
          {isVideo && url && (
            <Video media={url} mute={true} isStopped={false} />
          )}
        </StyledCard>
      </StyledTooltip>
      {!showTooltip && !isMobile && <DividerComp />}
    </ItemContainer>
  );
};
