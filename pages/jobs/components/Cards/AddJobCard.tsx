import React, { useCallback, useState } from 'react';
import lang from 'common/lang';
import {
  AddCard,
  SalaryContainer,
  LocationContainer,
  SalaryText,
  LocationText,
  EmploymentTypeText,
  AddCardsContainer,
} from 'pages/jobs/create/brand/style';
import TextComp from 'components/textComp';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import EllipseIcon from 'components/Icons/EllipseIcon';
import { FilledButton } from 'pages/company/ActionSection/style';
import { formatNumberToCurrency } from 'common/utils/helpers';
import { theme } from 'common/theme';
import Image from 'next/image';
import { useIsMobile } from 'common/hooks/useIsMobile';
import CardCreationWizard from 'components/CardCreationWizard';
import ModalElement from 'components/Modal/Modal';
import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import useProfileDeck from 'common/hooks/useProfileDeck';
import Loader from 'components/Loader/Loader';
import JobCards from 'pages/feed/Cards/JobCards';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import { DefaultJobCardProps } from './type';
const {
  jobs: {
    card: { create },
  },
  cards: { editCards },
} = lang;

const AddJobCard = ({
  coverCardData,
  centered,
  height,
  width,
  onSave,
  editable,
  jobDetailsData,
  ...rest
}: DefaultJobCardProps) => {
  const {
    icon,
    salaryFrom,
    salaryTo,
    role,
    location,
    locationType,
    companyName,
    employmentType,
  } = coverCardData;
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { uploadSaveCardsJob, loadExistingCards, loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.JOB);
  const [isLoading, setLoading] = useState(false);
  const [addCardStep, setAddCardStep] = useState(false);
  const handleSaveCards = async () => {
    if (onSave) {
      setLoading(true);
      await uploadSaveCardsJob(coverCardData.id);
      setOpen(false);
      setLoading(false);
      onSave();
    }
  };
  const handleCloseWizard = useCallback((state: boolean) => {
    setOpen(state);
    setAddCardStep(!state);
  }, []);
  const handleEdit = () => {
    if (jobDetailsData?.cards && editable) {
      loadExistingCards(jobDetailsData?.cards);
      setOpen(true);
    }
  };

  const handleAddingCards = () => {
    if (editable) {
      loadFreshCards();
      setOpen(true);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      {jobDetailsData?.cards?.length ? (
        <AddCardsContainer
          {...rest}
          centered={centered}
          height={height || 596}
          width={width || 350}
        >
          <JobCards
            data={jobDetailsData}
            height={!isMobile ? height || 596 : 0}
            width={!isMobile ? width || 318 : 0}
            onClick={handleEdit}
            clickable={false}
          />
        </AddCardsContainer>
      ) : (
        <AddCard
          {...rest}
          onClick={handleAddingCards}
          data-cy="addJobCard"
          centered={centered}
          height={height || 596}
          width={width || 350}
        >
          <Image src={icon} width={80} height={80} alt="LOGO" />
          <TextComp component="h2">{role}</TextComp>
          <SalaryContainer>
            <SalaryText component="h3">
              {`${formatNumberToCurrency(salaryFrom)}${
                salaryTo ? ` - ${formatNumberToCurrency(salaryTo)}` : ''
              }`}
            </SalaryText>
            <EmploymentTypeText>{location}</EmploymentTypeText>
            <LocationContainer>
              <LocationText>{locationType}</LocationText>
              <EllipseIcon color={theme.palette.gray[30].value} variant="small" />
              <LocationText>{employmentType}</LocationText>
            </LocationContainer>
          </SalaryContainer>
          {editable && (
            <FilledButton data-cy="addJobCardBtn">
              <span>{create}</span>
            </FilledButton>
          )}
          <TextComp component="h5">{companyName}</TextComp>
        </AddCard>
      )}

      {open && !isMobile && (
        <CardCreationWizard
          maxCards={3}
          activeCardId={1}
          cardData={cardsMockData}
          setIsOpen={(state) => handleCloseWizard(state)}
          title={editCards}
          isOpen={open}
          onSave={handleSaveCards}
          onClose={() => handleCloseWizard(false)}
          addCardStep={addCardStep}
          jobCoverCardsData={coverCardData}
        />
      )}
      {isMobile && (
        <ModalElement isOpen={open || false}>
          <CardCreationWizardMobile
            onSave={handleSaveCards}
            maxCards={3}
            cardData={cardsMockData}
            title={editCards}
            onClose={() => handleCloseWizard(false)}
            saveButtonText="Save"
            jobCoverCardsData={coverCardData}
          />
        </ModalElement>
      )}
    </>
  );
};

export default AddJobCard;
