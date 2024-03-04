import { useRef, useState } from 'react';
import ButtonComp from 'components/buttonComp';
import PencilIcon from 'components/Icons/PencilIcon';
import lang from 'common/lang';
import {
  Title, Box, IconsContainer, IconContainer, MobileIconsContainer,
} from 'pages/pro/styles';
import TextComp from 'components/textComp';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useWindowDimensions } from 'common/hooks';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { getIsCurrentUser, setIsEditing } from 'pages/pro/profileSlice';
import {
  ReadMore,
  UserBio,
  UserBioContainer,
} from './styles';

type ViewBioProps = {
  data: string;
  title: string;
  setEditBio: (e: boolean) => void;
};
const wordsLimit = 330;
const { bio } = lang;

export const ViewBio = ({ setEditBio, data, title }: ViewBioProps) => {
  const dispatch = useAppDispatch();
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const isReadMore = data?.length > wordsLimit;
  const [showLess, setShowLess] = useState<boolean>(false);
  const showReadMoreButton = isReadMore && !showLess;
  const showLessButton = isReadMore && showLess;
  const userBio = showReadMoreButton ? data.substring(0, wordsLimit) : data;
  const { isDesktopView } = useWindowDimensions();
  const [isBioEditing, setIsBioEditing] = useState<boolean>(false);
  const closeEditing = () => setIsBioEditing(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });

  return (
    <UserBioContainer
      onClick={() => {
        if (!isDesktopView) {
          dispatch(setIsEditing(true));
          setIsBioEditing(true);
        }
      }}
      ref={wrapperRef}
      isEditing={isBioEditing}
    >
      <Box>
        <TextComp component="h5">
          <Title>{title}</Title>
        </TextComp>
        {isCurrentUser && (
          <IconsContainer>
            <IconContainer contained onClick={() => setEditBio(true)}>
              <PencilIcon size={16} />
            </IconContainer>
          </IconsContainer>
        )}
        {isCurrentUser && !isDesktopView && isBioEditing && (
          <MobileIconsContainer>
            <IconContainer
              contained
              onClick={(e) => {
                e.stopPropagation();
                setEditBio(true);
                closeEditing();
              }}
            >
              <PencilIcon size={16} />
            </IconContainer>
          </MobileIconsContainer>
        )}
      </Box>
      <UserBio component="div">{userBio}</UserBio>
      {showReadMoreButton && (
        <ButtonComp
          variant="link"
          data-cy="readMoreBio"
          label={<ReadMore>{bio.readMore}</ReadMore>}
          onClick={() => setShowLess(true)}
        />
      )}
      {showLessButton && (
        <ButtonComp
          variant="link"
          data-cy="readLessBio"
          label={<ReadMore>{bio.showLess}</ReadMore>}
          onClick={() => setShowLess(false)}
        />
      )}
    </UserBioContainer>
  );
};

export default ViewBio;
