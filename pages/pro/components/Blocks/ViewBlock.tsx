import {
  MouseEvent, useEffect, useRef, useState,
} from 'react';
import lang from 'common/lang';
import {
  // ReadMore,
  UserBlock,
  BlockWrapper,
  BlockTitle,
} from 'pages/pro/components/Blocks/styles';
import {
  Box,
} from 'pages/pro/styles';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useWindowDimensions } from 'common/hooks';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import ModalElement from 'components/Modal/Modal';
import { isUserEditing, setIsEditing } from 'pages/pro/profileSlice';
import DeleteModal from '../TextBlock/DeleteModal';
import MobileActionButtons from './MobileActionButtons';

type ViewBlockProps = {
  data: string;
  title?: string;
  setEditBlock: (e: boolean) => void;
  onDelete: () => void;
  editable?: boolean;
  editOnClick?: boolean;
  width?: number;
  height?: number;
};
const { bio } = lang;

export const ViewBlock = ({
  setEditBlock, data, title, onDelete, editable = false, editOnClick, width, height,
}: ViewBlockProps) => {
  const dispatch = useAppDispatch();
  const blockDescription = data;
  const { isDesktopView } = useWindowDimensions();
  const isEditing = useAppSelector(isUserEditing);
  const [isBlockEditing, setIsBlockEditing] = useState<boolean>(false);
  const minLength = width === 1 && height === 1;
  const maxHeightLength = width === 1 && height === 2;
  const maxWidthLength = width === 2 && height === 1;
  const maxLength = width === 2 && height === 2;

  const closeEditing = () => {
    setIsBlockEditing(false);
    dispatch(setIsEditing(false));
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  useEffect(() => {
    if (!isEditing) {
      setIsBlockEditing(false);
    }
  }, [isEditing]);

  const handleDelete = () => {
    onDelete();
    closeDeleteModal();
  };

  const handleDeleteMobile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeEditing();
    setDeleteModalOpen(true);
  };
  const handleEditMobile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditBlock(true);
    closeEditing();
  };

  const handleOnClick = () => {
    if (!isDesktopView && !deleteModalOpen) {
      dispatch(setIsEditing(true));
      setIsBlockEditing(true);
    }
  };
  return (
    <BlockWrapper
      onClick={handleOnClick}
      ref={wrapperRef}
      isEditing={isBlockEditing}
    >
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
      </ModalElement>
      <Box>
        <BlockTitle minLength={(minLength) || (maxHeightLength)} withoutTitle={!title}>
          {title}
        </BlockTitle>
        {(editable) && !isDesktopView && isBlockEditing && (
          <MobileActionButtons
            handleDelete={handleDeleteMobile}
            handleEdit={handleEditMobile}
          />
        )}
      </Box>
      <UserBlock minLength={(minLength) || (maxHeightLength)} minMaxLength={(minLength) || (maxWidthLength)} maxLength={(maxLength) || (maxHeightLength)} component="p">{blockDescription}</UserBlock>
    </BlockWrapper>
  );
};

export default ViewBlock;
