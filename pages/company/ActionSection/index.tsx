import React, { useState } from 'react';
import PlusIcon from 'components/Icons/PlusIcon';
import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import { useAddBlockMutation } from 'pages/pro/profileService';
import { SubmitHandler } from 'react-hook-form';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ITextBlockFormValues } from 'pages/pro/components/TextBlock/types';
import { AddBlockType } from 'pages/pro/types';
import TextBlock from 'pages/pro/components/TextBlock';
import Loader from 'components/Loader/Loader';
import HighlightBlock from 'pages/pro/components/HighlightBlock';
import useCompany from 'common/hooks/useCompany';
import HighlightBlockIcon from 'components/Icons/HighlightBlockIcon';
import TextBlockIcon from 'components/Icons/TextBlockIcon';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import GreenShareIcon from 'components/Atoms/GreenShareIcon';
import TextComp from 'components/textComp';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import FollowActions from 'pages/pro/components/ActionSectionPublic/FollowActions';
import LinkModal from 'pages/pro/components/LinkModal';
import { LinkBlockData } from 'pages/pro/components/LinkBlock/type';
import { validateUrlWithProtocol } from 'common/utils/validateUrlWithProtocol';
import EditLinkModal from 'pages/pro/components/LinkModal/EditLinkModal';
import Popup from './Popup';
import { ActionSectionContainer } from './style';
import { ICompany } from '../types';

const {
  profile: { addBlock },
} = lang;

type ActionSectionProps = {
  editable?: boolean;
  numberOfBlocks: number;
  companyId?: string;
  isSaved?: boolean;
  company: ICompany;
  setSkip: () => void;
}

const {
  profile: { block, link },
  actionBar,
} = lang;

const ActionSection = ({
  editable = false, numberOfBlocks, companyId, isSaved, company, setSkip,
}: ActionSectionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openEditLinkModal, setOpenEditLinkModal] = useState<boolean>(false);
  const [editBlockValue, setEditBlockValue] = useState<LinkBlockData>();
  const handleClose = () => setOpen(false);
  const [addBlockApi, addBlockResult] = useAddBlockMutation();
  const closeModal = () => setOpenForm(false);

  const [type, setType] = useState(0);

  const handleAdd = (typeToUpdate: number) => {
    setType(typeToUpdate);
    setOpenForm(true);
    setOpen(false);
  };

  const { currentCompany: userIsCompany } = useCompany();

  const handleTextBlockSubmit: SubmitHandler<ITextBlockFormValues> = async (
    formData,
  ) => {
    closeModal();
    setSkip();
    const body = {
      type: 'text',
      sort: numberOfBlocks,
      fields: {
        title: formData?.title,
        description: formData.description,
      },
      blockable_type: 'companies',
      blockable_id: userIsCompany?.id,
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
      <ModalElement isOpen={openForm} closeModal={closeModal}>
        {type === AddBlockType.TEXT_BLOCK && (
          <TextBlock onClose={closeModal} onSubmit={handleTextBlockSubmit} />
        )}
        {type === AddBlockType.HIGHLIGHT_BLOCK && (
          <HighlightBlock
            setSkip={setSkip}
            onClose={closeModal}
            numberOfBlocks={numberOfBlocks}
          />
        )}
        {type === AddBlockType.LINK_BLOCK && (
          <LinkModal closeModal={closeModal} onSubmit={handleLinkModalSubmit} />
        )}
        {openEditLinkModal && (
          <EditLinkModal
            editBlockValue={editBlockValue}
            closeModal={() => {
              closeModal();
              setOpenEditLinkModal(false);
            }}
            setSkip={setSkip}
          />
        )}
      </ModalElement>
      <ActionSectionContainer>
        {addBlockResult.isLoading && <Loader />}
        {editable && (
          <Popup
            open={open}
            onClose={handleClose}
            positions={{
              right: 'auto',
              left: '0',
              top: 'auto',
              bottom: '70px',
            }}
            items={[
              {
                id: 1,
                title: block.highlight.title,
                description: block.highlight.desc,
                onClick: () => handleAdd(AddBlockType.HIGHLIGHT_BLOCK),
                icon: HighlightBlockIcon,
              },
              {
                id: 1,
                title: block.text.title,
                description: block.text.desc,
                onClick: () => handleAdd(AddBlockType.TEXT_BLOCK),
                icon: TextBlockIcon,
              },
              {
                id: 1,
                title: link.addLinkForm.ModalHeading,
                description: link.addLinkForm.description,
                onClick: () => handleAdd(AddBlockType.LINK_BLOCK),
                icon: TextBlockIcon,
              },
            ]}
          />
        )}

        {editable ? (
          <>
            <IconWrapper data-cy="add-block" onClick={() => setOpen(true)}>
              <PlusIcon size={12} />
              <TextComp component="h5">{addBlock}</TextComp>
            </IconWrapper>
            <KebabMenu
              position="top"
              icon={<GreenShareIcon />}
              list={(
                <ListItem
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  data-cy="deleteMessage"
                >
                  {actionBar.copyLink}
                </ListItem>
              )}
            />
          </>
        ) : (
          <FollowActions
            userSavedStatus={company?.saved as boolean}
            id={companyId as string}
            followed={company?.followed}
            setSkip={setSkip}
            profileType={IInteractionItemTypes.companies}
            username={company?.username as string}
          />
        )}
      </ActionSectionContainer>
    </>
  );
};

export default ActionSection;
