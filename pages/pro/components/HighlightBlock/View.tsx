import {
  MouseEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { deleteMediaFile } from 'utils/uploadMediaFile';
import ModalElement from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import Loader from 'components/Loader/Loader';
import { useWindowDimensions } from 'common/hooks';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import DeleteModal from '../TextBlock/DeleteModal';
import { getIsCurrentUser, isUserEditing, setIsEditing } from '../../profileSlice';
import { VideoContainer, Title, HightLightImage } from './style';
import { HighlightBlockViewProps } from './types';
import VideoElement from './VideoElement';
import ActionButtons from '../Blocks/ActionButtons';
import MobileActionButtons from '../Blocks/MobileActionButtons';
import { BlockType } from '../../types';
import HighlightBlock from '.';
import { BlockWrapper } from '../Blocks/styles';

const HighlightBlockView = ({
  media, title, onDelete, id, block, setSkip, isOwnProfile, editOnClick, width, height,
}: HighlightBlockViewProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const isEditing = useAppSelector(isUserEditing);
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const [isBlockEditing, setIsBlockEditing] = useState<boolean>(false);
  const { isDesktopView } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [editBlock, setEditBlock] = useState<boolean>(false);
  const currentBlock = {
    fields: { title: title || '', media },
    id: id as number,
    type: BlockType.HIGHLIGHT,
    sort: block.sort,
  };
  const wrapperRef = useRef(null);
  const isMobile = isCurrentUser && !isDesktopView && isBlockEditing;
  const minlength = width === 1 && height === 1;
  const maxHeightLength = width === 1 && height === 2;

  const closeEditing = () => {
    setIsBlockEditing(false);
    dispatch(setIsEditing(false));
  };

  useEffect(() => {
    if (!isEditing) {
      setIsBlockEditing(false);
    }
  }, [isEditing]);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const isVideo = (['mp4', 'MOV', '.mov', '.MP4'].some((url) => media?.includes(url)) && media);

  const handleOnClick = () => {
    if (!isDesktopView && !deleteModalOpen) {
      dispatch(setIsEditing(true));
      setIsBlockEditing(true);
    }
  };

  const handleEditMobile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditBlock(true);
    closeEditing();
  };

  const closeDeleteModal = useCallback(() => setDeleteModalOpen(false), []);
  const handleEditButton = useCallback(() => setDeleteModalOpen(true), []);
  const handleEdit = useCallback(() => {
    setEditBlock(true);
  }, [setEditBlock]);
  const handleDelete = useCallback(async () => {
    setLoading(true);
    const response = await deleteMediaFile(media);
    if (response === 'ok') {
      onDelete();
      closeDeleteModal();
      setLoading(false);
      return;
    }
    closeDeleteModal();
    setLoading(false);
  }, [onDelete, closeDeleteModal, media]);

  const handleMobileDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleEditButton();
  };

  const { clientWidth, clientHeight } = mediaContainerRef.current || {};

  return (

    <BlockWrapper
      isHightLight
      onClick={handleOnClick}
      ref={wrapperRef}
      isEditing={isBlockEditing}
    >
      {loading && <Loader />}
      <ModalElement
        isOpen={editBlock}
        closeModal={() => setEditBlock(false)}
        position={3}
      >
        <HighlightBlock setSkip={setSkip} onClose={() => setEditBlock(false)} block={currentBlock} />
      </ModalElement>
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
      </ModalElement>
      {isOwnProfile && <ActionButtons dataCy="hightlight-block" handleDelete={handleEditButton} handleEdit={handleEdit} />}
      {isMobile && (
        <MobileActionButtons
          handleDelete={handleMobileDelete}
          handleEdit={handleEditMobile}
        />
      )}
      <VideoContainer withTitle={!!title} ref={mediaContainerRef}>
        {isVideo && <VideoElement media={media} />}
        {!isVideo && <HightLightImage src={media} alt="highlight" width={clientWidth || 600} height={clientHeight || 400} />}
        {title && <Title minLength={(minlength) || (maxHeightLength)} component="h2Small">{title}</Title>}
      </VideoContainer>
    </BlockWrapper>
  );
};

export default HighlightBlockView;
