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
import WhoYouAre from '/public/images/whoYouAre.png';
import { theme } from 'common/theme';
import { SeconderyButton } from 'components/Molecules/JobNavbarCompact/style';
import AddIcon from 'components/Icons/AddIcon';
import {
  UserCardContainer, ShadowIconWrapper, MainContentWrapper, BasicDetailsContainer, RightSection, AddCardButton,
} from './style';
const { jobs: { createJobSteps } } = lang;

export type ViewBasicDetailsProps = {
    firstName: string;
    lastName: string;
    picture: string;
    mantra: string;
    setEditImageDetail: (value: boolean) => void;
};

const NoBlocks = ({ onClick }:{onClick?:()=>void }) => {
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
        <MainContentWrapper>
          <Image src={WhoYouAre.src} alt="" width={180} height={180} />
          <RightSection>
            <h4>
              {createJobSteps.details.whoYouArePopup.heading}
            </h4>
            <p>{createJobSteps.details.whoYouArePopup.content}</p>
            <SeconderyButton onClick={onClick}>
              <AddIcon variant="small" color={theme.palette.white[100].value} />
              Add requirements
            </SeconderyButton>
          </RightSection>
        </MainContentWrapper>
      </UserCardContainer>
    </BasicDetailsContainer>
  );
};

export default NoBlocks;
