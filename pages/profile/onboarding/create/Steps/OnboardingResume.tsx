/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import ResumeSectionTitle from 'components/Molecules/ResumeSectionTitle';
import Loader from 'components/Loader/Loader';
import TextComp from 'components/textComp';
import useResume from 'common/hooks/useResume';
import { useIsMobile } from 'common/hooks/useIsMobile';
import ButtonComp from 'components/buttonComp';
import WorkExperienceModal from 'pages/pro/components/WorkExperience/modal';
import AddEducationForm from 'pages/pro/components/Education/AddEducation/Form';
import { ModalType } from 'pages/pro/Tabs/types';
import Education from 'pages/pro/components/Education';
import WorkExperience from 'pages/pro/components/WorkExperience';
import PocketIcon from 'components/Icons/PocketIcon.svg';
import BookIcon from 'components/Icons/BookIcon.svg';
import { IExperienceData } from 'pages/pro/components/WorkExperience/type';
import {
  DescriptionText,
  FiltersContainer,
} from './style';
import { Buttons, ResumeContainer } from '../style';
import { OnboardingResumeProps } from './type';
import EmptyContentCard from '../../EmptyContentCard';

const {
  userOnBoarding: {
    label: {
      stepTwoHeading, workExperience, education, notStarted,
    },
    stepTwoContent,
    resume: { add, title },
  },
  buttonText: { next, cancel },
} = lang;

const OnboardingResume = ({ onNext }: OnboardingResumeProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const [experienceData, setExperienceData] = useState<IExperienceData | null>();
  const closeProjectModal = () => {
    setOpen(false);
    setExperienceData(null);
  };
  const [modalType, setModalType] = useState(0);
  const openProjectModal = (type: number) => {
    setModalType(type);
    setOpen(true);
  };
  const {
    educationData,
    workExperienceData,
    isFetching,
    isLoading,
    resumeData,
    clearFilters,
  } = useResume({
    side_projects: [],
    experience: [],
    education: [],
    followings: 0,
    followers: 0,
  }, false);

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, [clearFilters]);

  const editExperience = (data: IExperienceData) => {
    setOpen(true);
    setModalType(ModalType.WORK_EXPERIENCE);
    setExperienceData(data);
  };

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <ModalElement isOpen={open} closeModal={closeProjectModal}>
        {modalType === ModalType.WORK_EXPERIENCE && (
          <WorkExperienceModal
            cancelEdit={closeProjectModal}
            experienceData={experienceData}
          />
        )}
        {modalType === ModalType.EDUCATION && (
          <AddEducationForm closeForm={closeProjectModal} />
        )}
      </ModalElement>
      <ResumeContainer>
        <FiltersContainer>
          <TextComp component="h3">{stepTwoHeading}</TextComp>
          <DescriptionText>{stepTwoContent.paragraphOne}</DescriptionText>
          <DescriptionText>{stepTwoContent.paragraphTwo}</DescriptionText>
        </FiltersContainer>

        {(!resumeData?.experience?.length || workExperienceData.length > 0) && (
          <>
            <ResumeSectionTitle
              title={workExperience}
              onClick={() => openProjectModal(ModalType.WORK_EXPERIENCE)}
              statusTag={!workExperienceData?.length ? notStarted : ''}
              isAddEnable
            />
            {!workExperienceData?.length
              ? (
                <EmptyContentCard
                  image={<PocketIcon />}
                  title={title}
                  description={add.description}
                  buttonLabel={add.addWorkExperience}
                  show
                  onClick={() => openProjectModal(ModalType.WORK_EXPERIENCE)}
                />
              )
              : (
                <WorkExperience
                  onAdd={() => openProjectModal(ModalType.WORK_EXPERIENCE)}
                  data={workExperienceData}
                  isEmpty={!resumeData?.experience?.length}
                  onEdit={editExperience}
                  ownProfile
                />
              )}
          </>
        )}
        {(!resumeData?.education?.length || educationData.length > 0) && (
          !educationData?.length
            ? (
              <>
                <ResumeSectionTitle
                  title={education}
                  onClick={() => openProjectModal(ModalType.EDUCATION)}
                  statusTag={notStarted}
                  isAddEnable
                />
                <EmptyContentCard
                  image={<BookIcon />}
                  title={add.addYourEducation}
                  description={add.addEducationText}
                  buttonLabel={add.addEducation}
                  show
                  onClick={() => openProjectModal(ModalType.EDUCATION)}
                />
              </>
            )
            : (
              <Education
                data={educationData}
                onAdd={() => openProjectModal(ModalType.EDUCATION)}
                isEmpty={!resumeData?.education?.length}
                ownProfile
              />
            )
        )}
        <Buttons>
          <ButtonComp
            label={next}
            onClick={onNext}
            primary
            fullWidth
            disabled={!resumeData?.education?.length && !resumeData?.experience?.length}
            data-cy="nextCreateCompany"
          />
        </Buttons>
      </ResumeContainer>
    </>
  );
};

export default OnboardingResume;
