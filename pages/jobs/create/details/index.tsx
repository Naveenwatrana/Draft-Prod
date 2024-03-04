import React, { useState } from 'react';
import lang from 'common/lang';
import { useRouter } from 'next/router';
import ShadowIcon from 'components/Icons/ShadowIcon';
import SkillsIcon from 'components/Icons/SkillsIcon.svg';
import AddIcon from 'components/Icons/AddIcon';
import RequirementsIcon from 'components/Icons/RequirementsIcon.svg';
import ResponsibilitiesIcon from 'components/Icons/ResponsibilitiesIcon.svg';
import ModalElement from 'components/Modal/Modal';
import SkillsYouHave from 'pages/jobs/components/Cards/SkillsYouHave';
import WhoYouAre from 'components/Molecules/Jobs/WhoYouAre';
import WhatWillYouDo from 'components/Molecules/Jobs/WhatYouWillDo';
import ButtonComp from 'components/buttonComp';
import { useAddJobMutation } from 'pages/jobs/jobsService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { jobDetailsUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import useProfileDeck from 'common/hooks/useProfileDeck';
import {
  Container,
  Card,
  CardHeading,
  CardTypographyOne,
  CardTypographyTwo,
  CardSection,
  ButtonContainer,
  ButtonTypography,
  Heading,
  SubHeading,
  Buttons,
} from './style';
import SkillsModal from './SkillsModal';
import {
  DetailsProps,
  ISkillValues,
  IWhatWillYouDoValues,
  IWhoYouAreValues,
} from './type';
import { JobModalType } from '../types';
import WhoYouAreModal from './WhoYouAreModal';
import WhatWillYouDoModal from './WhatWillYouDoModal';
import { formatIJobDataPayload } from '../util';
const {
  jobs: {
    createJobSteps: { details, jobAddedSuccessFully },
  },
  buttonText,
} = lang;

export const getServerSideProps = () => {
  return { props: {} };
};

const Details = ({ roleData, onNext, data: detailsData }: DetailsProps) => {
  const currentCompany = useAppSelector(selectCurrentCompany);
  const navigate = useNavigate();
  const router = useRouter();
  const { loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.JOB);

  const [skills, setSkills] = useState<ISkillValues | undefined>(detailsData?.skills);
  const [whoYouAre, setWhoYouAre] = useState<IWhoYouAreValues | undefined>(detailsData?.whoYouAre);
  const [whatWillYouDo, setWhatWillYouDo] = useState<IWhatWillYouDoValues | undefined>(detailsData?.whatWillYouDo);
  const [addJob] = useAddJobMutation();
  const handleSkillsSave = (data: ISkillValues) => {
    setSkills(data);
    handleClose();
  };
  const handleWhoYouAre = (data: IWhoYouAreValues) => {
    setWhoYouAre(data);
    handleClose();
  };
  const handleWhatWillYouDo = (data: IWhatWillYouDoValues) => {
    setWhatWillYouDo(data);
    handleClose();
  };
  const handleClose = () => setModalType(null);
  const [modalType, setModalType] = useState<JobModalType | null>();
  const onSubmit = () => {
    if (detailsData) {
      onNext();
      return;
    }
    if (skills && whatWillYouDo && whoYouAre && roleData) {
      const payload = formatIJobDataPayload(
        Number(currentCompany.id),
        roleData,
        skills,
        whoYouAre,
        whatWillYouDo,
      );
      addJob(payload)
        .unwrap()
        .then((data: any /* TODO: add type */) => {
          showNotification(jobAddedSuccessFully, NotificationType.SUCCESS);
          navigate(jobDetailsUrl(data?.data?.id));
          loadFreshCards();
          // onNext({ whatWillYouDo, whoYouAre, skills }, data?.data?.id);
        })
        .catch((error) => showNotification(error.data.message, NotificationType.ERROR));
    }
  };
  return (
    <Container>
      <Heading>{details.detailsHeading}</Heading>
      <SubHeading>{details.subHeadingTxtOne}</SubHeading>
      <SubHeading>{details.subHeadingTxtTwo}</SubHeading>
      <ModalElement
        isOpen={!!modalType}
        centered
        position={2}
        shouldCloseOnOverlayClick
      >
        {modalType === JobModalType.SKILLS && (
          <SkillsModal
            save={handleSkillsSave}
            data={skills}
            onClose={handleClose}
          />
        )}
        {modalType === JobModalType.WHO_YOU_ARE && (
          <WhoYouAreModal
            save={handleWhoYouAre}
            data={whoYouAre}
            onClose={handleClose}
          />
        )}
        {modalType === JobModalType.WHO_YOU_WILL_DO && (
          <WhatWillYouDoModal
            save={handleWhatWillYouDo}
            data={whatWillYouDo}
            onClose={handleClose}
          />
        )}
      </ModalElement>
      {skills ? (
        <SkillsYouHave {...skills} />
      ) : (
        <Card>
          <ShadowIcon />
          <SkillsIcon />
          <CardSection>
            <CardHeading>{details.skillCardHeading}</CardHeading>
            <CardTypographyOne>
              {details.skillCardTypographyTxtOne}
            </CardTypographyOne>
            <CardTypographyTwo>
              {details.skillCardTYpographyTxtTwo}
            </CardTypographyTwo>
            <ButtonContainer
              onClick={() => {
                setModalType(JobModalType.SKILLS);
              }}
            >
              <AddIcon />
              <ButtonTypography>{details.addSkillButtonTxt}</ButtonTypography>
            </ButtonContainer>
          </CardSection>
        </Card>
      )}
      {whoYouAre ? (
        <WhoYouAre {...whoYouAre} />
      ) : (
        <Card>
          <ShadowIcon />
          <RequirementsIcon />
          <CardSection>
            <CardHeading>{details.requirementCardHeading}</CardHeading>
            <CardTypographyOne>
              {details.requirementCardTypographyTxtOne}
            </CardTypographyOne>
            <CardTypographyTwo>
              {details.requirementCardTypographyTxtTwo}
            </CardTypographyTwo>
            <ButtonContainer
              onClick={() => {
                setModalType(JobModalType.WHO_YOU_ARE);
              }}
            >
              <AddIcon />
              <ButtonTypography>
                {details.addRequirementButtonTxt}
              </ButtonTypography>
            </ButtonContainer>
          </CardSection>
        </Card>
      )}
      {whatWillYouDo ? (
        <WhatWillYouDo {...whatWillYouDo} />
      ) : (
        <Card>
          <ShadowIcon />
          <ResponsibilitiesIcon />
          <CardSection>
            <CardHeading>{details.responsibilityCardHeading}</CardHeading>
            <CardTypographyOne>
              {details.responsibilityCardTypographyTxtOne}
            </CardTypographyOne>
            <CardTypographyTwo>
              {details.responsibilityCardTypographyTxtTwo}
            </CardTypographyTwo>
            <ButtonContainer
              onClick={() => {
                setModalType(JobModalType.WHO_YOU_WILL_DO);
              }}
            >
              <AddIcon />
              <ButtonTypography>
                {details.addResponsibilityBtnTxt}
              </ButtonTypography>
            </ButtonContainer>
          </CardSection>
        </Card>
      )}
      <Buttons>
        <ButtonComp label={buttonText.cancel} variant="link" onClick={() => { router.back(); }} />
        <ButtonComp
          label={details.doneBtnTxt}
          primary
          fullWidth
          onClick={onSubmit}
          disabled={!whatWillYouDo || !whoYouAre || !skills}
          data-cy="nextCreateCompany"
        />
      </Buttons>
    </Container>
  );
};

export default Details;
