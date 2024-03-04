import React, { useEffect, useState } from 'react';
import PlusIcon from 'components/Icons/PlusIcon';
import lang from 'common/lang';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import { AddBlockType, BlockType, Tabs } from 'pages/pro/types';
import ModalElement from 'components/Modal/Modal';
import { useAddBlockMutation } from 'pages/pro/profileService';
import { SubmitHandler } from 'react-hook-form';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import FilterIcon from 'components/Icons/FilterIcon';
import { useIsMobile } from 'common/hooks/useIsMobile';
import {
  IInteractionEventValueType,
  IInteractionItemTypes,
  IInteractionTypes,
} from 'common/services/Aladdin/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { validateUrlWithProtocol } from 'common/utils/validateUrlWithProtocol';
import ShareProfile from 'components/Atoms/ShareProfile';
import FollowActions from 'pages/pro/components/ActionSectionPublic/FollowActions';
import { ActionSectionContainer, AddButtons } from './style';
import Popup from './Popup';
import { formatProjectBlockPayload, showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
import { ActionSectionProps } from './types';
import EditProjects from '../Projects/EditProject';
import { IProjectValues } from '../Projects/types';
import TextBlock from '../TextBlock';
import HighlightBlock from '../HighlightBlock';
import { ITextBlockFormValues } from '../TextBlock/types';
import LinkModal from '../LinkModal';
import { LinkBlockData } from '../LinkBlock/type';
import EditLinkModal from '../LinkModal/EditLinkModal';

const {
  profile: { addBlock, link },
  projects,
} = lang;

const ActionSection = ({
  user,
  activeTab,
  openFilterPopup,
  setSkip,
  currentUser,
  isCurrentUser,
}: ActionSectionProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { saveInteraction } = useAladdinInteraction();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openEditLinkModal, setOpenEditLinkModal] = useState<boolean>(false);
  const [editBlockValue, setEditBlockValue] = useState<LinkBlockData>();

  const handleClose = () => setOpen(false);
  const [addBlockApi, addBlockResult] = useAddBlockMutation();
  const closeProjectModal = () => {
    setOpenForm(false);
  };

  const numberOfBlocks = (user?.blocks?.length || 0) + 1;

  // Aladdin interaction event
  useEffect(
    () => {
      saveInteraction({
        itemId: user?.id,
        itemType: IInteractionItemTypes.users,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.brandTab,
      });
    },
    [
      // Needs to call only once
      // Therefore, no dependencies are needed
    ],
  );
  // Aladdin interaction event
  const saveProject: SubmitHandler<IProjectValues> = async (formData) => {
    try {
      setIsLoading(true);
      const updatedFormData = {
        ...formData,
        image: formData.image?.sort(
          (a, b) => (a?.featured ? 0 : 1) - (b?.featured ? 0 : 1),
        ),
      };
      const uploadedImages = updatedFormData?.image?.map(async (image) => {
        if (image.file) {
          const media = await uploadMediaFile(image.file, currentUser.username);
          return media;
        }
      });
      const media = uploadedImages ? await Promise.all(uploadedImages) : [];
      const payload = formatProjectBlockPayload(updatedFormData);
      const body = {
        type: 'project',
        sort: numberOfBlocks,
        fields: { ...payload, media },
      };
      addBlockApi(body)
        .unwrap()
        .then(() => {
          showNotification(projects.createdSuccess, NotificationType.SUCCESS);
        })
        .catch((error) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        });
      setIsLoading(false);
    } catch (e: any) {
      showNotification(projects.createdError, NotificationType.ERROR);
    } finally {
      closeProjectModal();
    }
  };

  const [type, setType] = useState(0);

  const handleAdd = (typeToUpdate: number) => {
    setType(typeToUpdate);
    setOpenForm(true);
    setOpen(false);
  };

  const handleTextBlockSubmit: SubmitHandler<ITextBlockFormValues> = async (
    formData,
  ) => {
    closeProjectModal();
    setSkip();
    const body = {
      type: 'text',
      sort: numberOfBlocks,
      fields: {
        title: formData?.title,
        description: formData.description,
      },
    };
    addBlockApi(body)
      .unwrap()
      .catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };
  const handleLinkModalSubmit = (linkData: LinkBlockData) => {
    setOpen(false);
    setOpenEditLinkModal(true);
    setEditBlockValue(linkData);
    setSkip();
  };

  return (
    <>
      {openForm && (
        <ModalElement isOpen={openForm} closeModal={closeProjectModal}>
          {type === AddBlockType.PROJECT && (
            <EditProjects
              cancel={closeProjectModal}
              save={saveProject}
              isLoading={addBlockResult.isLoading || isLoading}
            />
          )}
          {type === AddBlockType.TEXT_BLOCK && (
            <TextBlock
              onClose={closeProjectModal}
              onSubmit={handleTextBlockSubmit}
            />
          )}
          {type === AddBlockType.HIGHLIGHT_BLOCK && (
            <HighlightBlock
              setSkip={setSkip}
              onClose={closeProjectModal}
              numberOfBlocks={numberOfBlocks}
            />
          )}
          {type === AddBlockType.LINK_BLOCK && (
            <LinkModal
              closeModal={closeProjectModal}
              onSubmit={handleLinkModalSubmit}
            />
          )}
          {openEditLinkModal && (
            <EditLinkModal
              editBlockValue={editBlockValue}
              closeModal={() => {
                closeProjectModal();
                setOpenEditLinkModal(false);
              }}
              setSkip={setSkip}
            />
          )}
        </ModalElement>
      )}

      <ActionSectionContainer>
        {isCurrentUser && (
          <Popup
            open={open}
            onClose={handleClose}
            onBlockTypeChange={handleAdd}
          />
        )}

        {isCurrentUser && activeTab === Tabs.brand && (
          <>
            <IconWrapper data-cy="add-block" onClick={() => setOpen(true)}>
              <PlusIcon size={12} />
              <AddButtons component="h5">{addBlock}</AddButtons>
            </IconWrapper>
            <ShareProfile
              id={user?.id}
              itemType={IInteractionItemTypes.users}
              primary={true}
            />
          </>
        )}

        {!isCurrentUser && (
          <FollowActions
            userSavedStatus={user?.saved}
            id={user?.id}
            followed={user?.followed}
            setSkip={setSkip}
            profileType={IInteractionItemTypes.users}
            username={user?.username}
          />
        )}

        {activeTab === Tabs.resume && isMobile && (
          <IconWrapper data-cy="filterResume" onClick={openFilterPopup}>
            <FilterIcon />
          </IconWrapper>
        )}
      </ActionSectionContainer>
    </>
  );
};

export default ActionSection;
