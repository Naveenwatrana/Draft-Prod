import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import Loader from 'components/Loader/Loader';
import ModalElement from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useAddBlockMutation, useDeleteBlockMutation, useEditBlockMutation,
} from 'pages/pro/profileService';
import ViewBlock from 'pages/pro/components/Blocks/ViewBlock';
import ViewHightLightBlock from 'pages/pro/components/HighlightBlock/View';
import { BlockType, BlocksEntity } from 'pages/pro/types';
import { SubmitHandler } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import {
  Layout, Layouts, Responsive, WidthProvider,
} from 'react-grid-layout';
import CancelIcon from 'components/Icons/CrossIcon';
import DragHandle from 'components/Icons/DragHandle.svg';
import { theme } from 'common/theme';
import { selectCurrentUser, setUserAuth } from 'pages/account/authSlice';
import { useAppSelector } from 'common/hooks/state';
import { userApiEndpoint } from 'pages/api/const';
import TextBlock from '../TextBlock';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
import { ITextBlockFormValues } from '../TextBlock/types';
import LinkBlock from '../LinkBlock';
import DeleteModal from '../TextBlock/DeleteModal';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  ResponsiveBlockContainer,
  IconContainer,
  OverflowHiddenContainer,
  DragIconContainer,
} from './styles';
import HighlightBlock from '../HighlightBlock';
import EditLinkModal from '../LinkModal/EditLinkModal';

type BlocksProps = {
  numberOfBlocks: number;
  blocks: BlocksEntity[];
  ownProfile?: boolean;
  id: string;
  brandLayout?: string;
  setSkip: () => void;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const Blocks = ({
  numberOfBlocks, blocks, ownProfile, id, brandLayout, setSkip,
}: BlocksProps) => {
  const isDragging = useRef(false);
  const [editBlock, setEditBlock] = useState<boolean>(false);
  const [editHighlightBlock, setEditHighlightBlock] = useState<boolean>(false);
  const [editLinkBlock, setEditLinkBlock] = useState<boolean>(false);
  const [deleteTextBlock, setDeleteTextBlock] = useState<boolean>(false);
  const [deleteBlock, deleteBlockResult] = useDeleteBlockMutation();
  const [addBlock, result] = useAddBlockMutation();
  const [editBlockApi, editBlockApiResult] = useEditBlockMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const onEditBlock = (block: BlocksEntity) => {
    setCurrentBlock(block);
    setEditBlock(true);
  };

  const onEditHighlightBlock = (hBlock: BlocksEntity) => {
    setCurrentBlock(hBlock);
    setEditHighlightBlock(true);
  };

  const onEditLinkBlock = (lBlock: BlocksEntity) => {
    setCurrentBlock(lBlock);
    setEditLinkBlock(true);
  };

  const [currentBlock, setCurrentBlock] = useState<BlocksEntity>();
  const profileBlocks = blocks;
  const handleDelete = (blockId: number) => {
    deleteBlock({ id: blockId }).unwrap().then(() => setSkip()).catch((error) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });
  };

  const handleTextBlockSubmit: SubmitHandler<ITextBlockFormValues> = async (formData) => {
    const body = {
      type: 'text',
      sort: currentBlock?.sort || numberOfBlocks,
      fields: {
        title: formData?.title,
        description: formData.description,
      },
    };
    setSkip();
    if (currentBlock?.id) {
      editBlockApi({ id: currentBlock?.id, payload: body }).unwrap().then(() => {
        handleTextBlockClose();
      }).catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
    } else {
      addBlock(body).unwrap().then((e) => {
        handleTextBlockClose();
      }).catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
    }
  };
  const handleTextBlockClose = () => setEditBlock(false);
  const dispatch = useDispatch();
  const handleHighlightBlockClose = () => setEditHighlightBlock(false);
  const handleLinkBlockClose = () => setEditLinkBlock(false);
  const closeDeleteModal = () => setDeleteTextBlock(false);
  const handleDeleteTextBlock = () => {
    if (currentBlock?.id) {
      handleDelete(currentBlock?.id);
      closeDeleteModal();
      setSkip();
    }
  };

  const renderBlock = useCallback((block: BlocksEntity) => {
    const responsiveBlocks = blockLayout.xs.find(
      (bl) => Number(bl.i) === block.id,
    );
    switch (block.type) {
      case BlockType.TEXT:
        return (
          <ViewBlock
            data={block?.fields?.description || ''}
            setEditBlock={() => onEditBlock(block)}
            title={block?.fields?.title as string}
            onDelete={() => handleDelete(block?.id)}
            editable={ownProfile}
            width={responsiveBlocks?.w}
            height={responsiveBlocks?.h}
          />
        );
      case BlockType.HIGHLIGHT:
        return (
          <ViewHightLightBlock
            media={block?.fields?.media as string}
            title={block?.fields?.title as string}
            onDelete={() => handleDelete(block?.id)}
            setEditBlock={() => onEditHighlightBlock(block)}
            id={block?.id}
            block={block}
            setSkip={setSkip}
            isOwnProfile={ownProfile}
            editOnClick={currentUser?.id === id}
            width={responsiveBlocks?.w}
            height={responsiveBlocks?.h}
          />
        );
      case BlockType.LINK:
        return (
          <LinkBlock
            data={{
              media: block?.fields?.media,
              title: block?.fields?.title,
              description: block?.fields?.description,
              url: block?.fields?.url,
              domain: block?.fields?.domain,
              button: block.fields?.button,
            }}
            width={responsiveBlocks?.w}
            height={responsiveBlocks?.h}
            setEditBlock={() => onEditLinkBlock(block)}
            editOnClick={currentUser?.id === id}
          />
        );
      default:
        return null;
    }
  }, [currentUser?.id, id, ownProfile, handleDelete]);

  const parsedBrandLayout = JSON.parse(brandLayout || '{}');

  const [blockLayout, setBlockLayout] = useState<Layouts>(
    brandLayout
      ? { ...parsedBrandLayout }
      : {
        xs: profileBlocks.map((block: { id: number, type: string }, index: number) => ({
          h: 2,
          w: 2,
          x: 0,
          y: index + 1,
          i: `${block?.id}`,
          maxH: 2,
        })),
      },
  );
  const applyMinHeight = useCallback((layout: Layouts): Layouts => ({
    ...layout,
    xs: layout.xs.map((l: Layout) => ({ ...l, maxH: 2 })),
  }), []);

  const handleLayoutChange = debounce(
    (currentLayout: Layout[], allLayouts: Layouts) => {
      setBlockLayout((l) => {
        if (
          JSON.stringify(l) !== JSON.stringify(allLayouts)
          && ownProfile
          && JSON.stringify(JSON.parse(brandLayout || '{}'))
            !== JSON.stringify(allLayouts)
        ) {
          fetch(userApiEndpoint, {
            method: 'PUT',
            body: JSON.stringify({
              brand_layout: JSON.stringify(allLayouts),
            }),
          }).then((res) => res.json().then((response) => {
            if (!response?.errors) {
              dispatch(setUserAuth(response.data));
            }
          }));
          return applyMinHeight(allLayouts);
        }
        return applyMinHeight(l);
      });
    },
  );

  const grid = useMemo(() => {
    return (
      <ResponsiveGridLayout
        isResizable={ownProfile}
        isDroppable={ownProfile}
        isDraggable={ownProfile}
        onDrag={() => {
          isDragging.current = true;
        }}
        rowHeight={246}
        margin={[20, 24]}
        onDragStop={(layout, oldItem, newItem, placeholder, event, element) => {
          if (!isDragging.current) {
            const blockToEdit = profileBlocks?.find((block:BlocksEntity) => block.id === Number(oldItem.i));
            if (blockToEdit?.type === BlockType.TEXT) {
              onEditBlock(blockToEdit);
              return;
            } else if (blockToEdit?.type === BlockType.HIGHLIGHT) {
              onEditHighlightBlock(blockToEdit);
              return;
            } else if (blockToEdit?.type === BlockType.LINK) {
              onEditLinkBlock(blockToEdit);
              return;
            }
          }
          isDragging.current = false;
        }}
        className="layout"
        onLayoutChange={handleLayoutChange}
        layouts={blockLayout}
        cols={{
          lg: 2, md: 2, sm: 2, xs: 2, xxs: 2,
        }}
      >
        {profileBlocks?.map((block: BlocksEntity) => {
          return (
            <ResponsiveBlockContainer
              isResponsiveBorder={currentUser?.id === id}
              key={block?.id}
            >
              {ownProfile && (
                <IconContainer
                  data-cy="userBlockCancelIconCOntainer"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDeleteTextBlock(true);
                    setCurrentBlock(block);
                  }}
                >
                  <CancelIcon
                    size={12}
                    color={theme.palette.white[100].value}
                    variant="small"
                  />

                </IconContainer>
              )}
              <OverflowHiddenContainer editable={ownProfile}>
                {renderBlock(block)}
              </OverflowHiddenContainer>
              {ownProfile && (
                <DragIconContainer className="resize-handle">
                  <DragHandle />
                </DragIconContainer>
              )}
            </ResponsiveBlockContainer>
          );
        })}
      </ResponsiveGridLayout>
    );
  }, [blockLayout, ownProfile, profileBlocks, renderBlock]);

  return (
    <>
      {(deleteBlockResult.isLoading || result.isLoading || editBlockApiResult.isLoading) && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {grid}
      {editBlock && ownProfile && currentBlock && (
        <ModalElement isOpen={editBlock} closeModal={() => setEditBlock(false)}>
          <TextBlock onClose={handleTextBlockClose} block={currentBlock} onSubmit={handleTextBlockSubmit} />
        </ModalElement>
      )}
      {deleteTextBlock && ownProfile && currentBlock && (
        <ModalElement isOpen={deleteTextBlock} closeModal={() => setDeleteTextBlock(false)}>
          <DeleteModal onClose={closeDeleteModal} onDelete={handleDeleteTextBlock} />
        </ModalElement>
      )}
      {editHighlightBlock && ownProfile && currentBlock && (
        <ModalElement isOpen={editHighlightBlock} closeModal={() => setEditHighlightBlock(false)}>
          <HighlightBlock onClose={handleHighlightBlockClose} block={currentBlock} setSkip={setSkip} />
        </ModalElement>
      )}
      {editLinkBlock && ownProfile && currentBlock && (
        <ModalElement isOpen={editLinkBlock} closeModal={() => setEditLinkBlock(false)}>
          <EditLinkModal
            closeModal={handleLinkBlockClose}
            editBlockValue={{
              ...currentBlock.fields,
              id: currentBlock.id,
              sort: currentBlock.sort,
            }}
            setSkip={setSkip}
          />
        </ModalElement>
      )}
    </>
  );
};

export default Blocks;
