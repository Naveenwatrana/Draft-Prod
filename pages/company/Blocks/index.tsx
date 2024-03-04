import ModalElement from 'components/Modal/Modal';
import ViewBlock from 'pages/pro/components/Blocks/ViewBlock';
import TextBlock from 'pages/pro/components/TextBlock';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { ToastContainer } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { ITextBlockFormValues } from 'pages/pro/components/TextBlock/types';
import { BlockType, BlocksEntity } from 'pages/pro/types';
import { useDeleteBlockMutation, useEditBlockMutation } from 'pages/pro/profileService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import Loader from 'components/Loader/Loader';
import HighlightBlockView from 'pages/pro/components/HighlightBlock/View';
import useCompany from 'common/hooks/useCompany';
import {
  Layout, Layouts, Responsive, WidthProvider,
} from 'react-grid-layout';
import {
  ResponsiveBlockContainer, UserBlockContainer, IconContainer, OverflowHiddenContainer, DragIconContainer,
} from 'pages/pro/components/Blocks/styles';
import DragHandle from 'components/Icons/DragHandle.svg';
import { theme } from 'common/theme';
import CancelIcon from 'components/Icons/CrossIcon';
import DeleteModal from 'pages/pro/components/TextBlock/DeleteModal';
import HighlightBlock from 'pages/pro/components/HighlightBlock';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LinkBlock from 'pages/pro/components/LinkBlock';
import EditLinkModal from 'pages/pro/components/LinkModal/EditLinkModal';
import { useUpdateOrgBrandLayoutMutation } from '../companyService';

type BlocksProps = {
  companyData?: {
    purpose?: string;
    id: string;
    blocks?: BlocksEntity[];
    brand_layout?: string;
  };
  editable?: boolean;
  setSkip: () => void;
  isOwnProfile?: boolean;
  id: string;
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const Blocks = ({
  companyData, editable = false, setSkip, isOwnProfile, id,
}: BlocksProps) => {
  const isDragging = useRef(false);
  const [editBlock, setEditBlock] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<BlocksEntity>();
  const [deleteTextBlock, setDeleteTextBlock] = useState<boolean>(false);
  const [editHighlightBlock, setEditHighlightBlock] = useState<boolean>(false);
  const [editLinkBlock, setEditLinkBlock] = useState<boolean>(false);
  const [editBlockApi, editBlockApiResult] = useEditBlockMutation();
  const [deleteBlock, deleteBlockResult] = useDeleteBlockMutation();
  const { currentCompany: userIsCompany } = useCompany();
  const [updateOrgBrandLayout] = useUpdateOrgBrandLayoutMutation();

  const handleTextBlockSubmit: SubmitHandler<ITextBlockFormValues> = async (formData) => {
    setSkip();
    const body = {
      type: 'text',
      sort: currentBlock?.sort || (companyData?.blocks?.length || 0) + 1,
      fields: {
        title: formData?.title,
        description: formData.description,
      },
    };
    if (currentBlock?.id) {
      editBlockApi({ id: currentBlock?.id, payload: body }).unwrap().then(() => {
        closeModal();
      }).catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
    }
  };

  const closeModal = () => setEditBlock(false);

  const handleBlockDelete = (blockId: number) => {
    deleteBlock({
      id: blockId,
      body: {
        blockable_type: 'companies',
        blockable_id: userIsCompany?.id,
      },
    }).unwrap().then(() => setSkip()).catch((error) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });
  };

  const handleHighlightBlockClose = () => setEditHighlightBlock(false);
  const handleLinkBlockClose = () => setEditLinkBlock(false);
  const closeDeleteModal = () => setDeleteTextBlock(false);
  const handleDeleteTextBlock = () => {
    if (currentBlock?.id) {
      handleBlockDelete(currentBlock?.id);
      closeDeleteModal();
      setSkip();
    }
  };

  const onEditHighlightBlock = (hBlock: BlocksEntity) => {
    setCurrentBlock(hBlock);
    setEditHighlightBlock(true);
  };

  const onEditBlock = (block: BlocksEntity) => {
    setCurrentBlock(block);
    setEditBlock(true);
  };

  const onEditLinkBlock = (lBlock: BlocksEntity) => {
    setCurrentBlock(lBlock);
    setEditLinkBlock(true);
  };

  const renderBlock = (block: BlocksEntity) => {
    const responsiveBlocks = blockLayout.xs.find(
      (bl) => Number(bl.i) === block.id,
    );
    switch (block.type) {
      case BlockType.HIGHLIGHT:
        return (
          <HighlightBlockView
            media={block?.fields?.media as string}
            title={block?.fields?.title}
            onDelete={() => handleBlockDelete(block.id)}
            setEditBlock={() => onEditHighlightBlock(block)}
            id={block?.id}
            block={block}
            setSkip={setSkip}
            isOwnProfile={isOwnProfile}
            editOnClick={userIsCompany?.id === id}
            width={responsiveBlocks?.w}
            height={responsiveBlocks?.h}
          />
        );
      case BlockType.TEXT:
        return (
          <ViewBlock
            data={block.fields.description || ''}
            setEditBlock={() => {
              setEditBlock(true);
              setCurrentBlock(block);
            }}
            title={block.fields.title}
            onDelete={() => handleBlockDelete(block.id)}
            editable={isOwnProfile}
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
              url: block?.fields?.url,
              domain: block?.fields?.domain,
              button: block.fields?.button,
              description: block?.fields?.description,
            }}
            width={responsiveBlocks?.w}
            height={responsiveBlocks?.h}
            setEditBlock={() => onEditLinkBlock(block)}
            editOnClick={userIsCompany?.id === id}
          />
        );
      default:
        return null;
    }
  };

  const parsedBrandLayout = JSON.parse(companyData?.brand_layout || '{}');

  const [blockLayout, setBlockLayout] = useState<Layouts>(
    companyData?.brand_layout
      ? { ...parsedBrandLayout }
      : {
        xs: (companyData?.blocks || []).map(
          (block: { id: number, type: string }, index: number) => ({
            h: 2,
            w: 2,
            x: 0,
            y: index + 2,
            i: `${block?.id}`,
            maxH: 2,
          }),
        ),
      },
  );

  const applyMinHeight = useCallback((layout: Layouts): Layouts => ({
    ...layout,
    xs: layout.xs.map((l: Layout) => ({ ...l, maxH: 2 })),
  }), []);

  const handleLayoutChange = debounce((currentLayout: Layout[], allLayouts: Layouts) => {
    setBlockLayout((l) => {
      if (
        JSON.stringify(l) !== JSON.stringify(allLayouts)
        && userIsCompany?.username
        && isOwnProfile
        && JSON.stringify(JSON.parse(companyData?.brand_layout || '{}'))
          !== JSON.stringify(allLayouts)
      ) {
        updateOrgBrandLayout({
          id: userIsCompany?.username,
          brandLayout: JSON.stringify(allLayouts),
        });
        return applyMinHeight(allLayouts);
      }
      return applyMinHeight(l);
    });
  });
  const grid = useMemo(() => {
    return (
      <ResponsiveGridLayout
        isResizable={isOwnProfile}
        isDroppable={isOwnProfile}
        isDraggable={isOwnProfile}
        onDrag={(e) => {
          isDragging.current = true;
        }}
        rowHeight={246}
        margin={[20, 24]}
        onDragStop={(layout, oldItem, newItem, placeholder, event, element) => {
          if (!isDragging.current) {
            const blockToEdit = companyData?.blocks?.find((block:BlocksEntity) => block.id === Number(oldItem.i));
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
        {companyData?.blocks?.map((block: BlocksEntity) => {
          return (
            <ResponsiveBlockContainer isResponsiveBorder={userIsCompany?.id === id} key={block?.id}>
              {isOwnProfile && (
                <IconContainer
                  data-cy="companyBlocksCancelIconContainer"
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
              <OverflowHiddenContainer editable={isOwnProfile}>
                {renderBlock(block)}
              </OverflowHiddenContainer>
              {isOwnProfile && (
                <DragIconContainer className="resize-handle">
                  <DragHandle />
                </DragIconContainer>
              )}
            </ResponsiveBlockContainer>
          );
        })}
      </ResponsiveGridLayout>
    );
  }, [blockLayout, companyData?.blocks, isOwnProfile, userIsCompany?.username]);
  return (
    <>
      {(editBlockApiResult.isLoading || deleteBlockResult.isLoading) && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {grid}
      {editBlock && editable && (
        <ModalElement isOpen={editBlock} closeModal={closeModal}>
          <TextBlock
            onClose={closeModal}
            block={currentBlock}
            onSubmit={handleTextBlockSubmit}
          />
        </ModalElement>
      )}
      {deleteTextBlock && isOwnProfile && currentBlock && (
        <ModalElement isOpen={deleteTextBlock} closeModal={() => setDeleteTextBlock(false)}>
          <DeleteModal onClose={closeDeleteModal} onDelete={handleDeleteTextBlock} />
        </ModalElement>
      )}
      {editHighlightBlock && editable && currentBlock && (
        <ModalElement isOpen={editHighlightBlock} closeModal={() => setEditHighlightBlock(false)}>
          <HighlightBlock onClose={handleHighlightBlockClose} block={currentBlock} setSkip={() => setSkip()} />
        </ModalElement>
      )}
      {editLinkBlock && editable && currentBlock && (
        <ModalElement isOpen={editLinkBlock} closeModal={() => setEditLinkBlock(false)}>
          <EditLinkModal
            closeModal={handleLinkBlockClose}
            editBlockValue={{
              ...currentBlock.fields,
              id: currentBlock.id,
              sort: currentBlock.sort,
            }}
            setSkip={() => setSkip()}
          />
        </ModalElement>
      )}
    </>
  );
};

export default Blocks;
