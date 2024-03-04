import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import lang from 'common/lang';
import ShadowIcon from 'components/Icons/ShadowIcon';
import ModalElement from 'components/Modal/Modal';
import TextBlock from 'pages/pro/components/TextBlock';
import { ITextBlockFormValues } from 'pages/pro/components/TextBlock/types';
import { useAddBlockMutation } from 'pages/pro/profileService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import HiContent from '/public/images/hiContent.png';

import {
  UserCardContainer, ShadowIconWrapper, MainContentWrapper, BasicDetailsContainer, RightSection, AddCardButton,
} from './styles';
const { profile: { noProfileBlock } } = lang;

export type ViewBasicDetailsProps = {
    firstName: string;
    lastName: string;
    picture: string;
    mantra: string;
    setEditImageDetail: (value: boolean) => void;
};

const NoBlocks = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const closeProjectModal = () => setOpenForm(false);
  const [addBlockApi] = useAddBlockMutation();

  const handleTextBlockSubmit: SubmitHandler<ITextBlockFormValues> = async (formData) => {
    closeProjectModal();
    const body = {
      type: 'text',
      sort: 1,
      fields: {
        title: formData?.title,
        description: formData.description,
      },
    };
    addBlockApi(body).unwrap().catch((error) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });
  };
  return (
    <BasicDetailsContainer>
      <UserCardContainer>
        <ShadowIconWrapper>
          <ShadowIcon />
        </ShadowIconWrapper>
        <MainContentWrapper>
          <Image src={HiContent.src} alt="" width={180} height={180} />
          <RightSection>
            <h3>
              {noProfileBlock.noBlocks.title}
            </h3>
            <p>{noProfileBlock.noBlocks.discription}</p>
            <AddCardButton onClick={() => { setOpenForm(true); }}>{noProfileBlock.noBlocks.addBlock}</AddCardButton>
          </RightSection>
        </MainContentWrapper>
      </UserCardContainer>
      <ModalElement isOpen={openForm} closeModal={closeProjectModal}>
        <TextBlock onClose={closeProjectModal} onSubmit={handleTextBlockSubmit} />
      </ModalElement>
    </BasicDetailsContainer>
  );
};

export default NoBlocks;
