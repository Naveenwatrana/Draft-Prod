import React, { useEffect, useState } from 'react';
import lang from 'common/lang';
import Stepper from 'components/Stepper';
import { SubmitHandler } from 'react-hook-form';
import Loader from 'components/Loader/Loader';
import {
  Container,
  ModalTitle,
  Wrapper,
} from './styles';
import {
  FormSteps, IExperienceData, IExperienceDescriptionValues, IExperienceSummaryValues,
} from './type';
import Summary from './Summary';
import Description from './Description';
import { formatExperiencePayload, getDescriptionFormData, getSummaryFormData } from './util';
import { useAddExperienceMutation, useEditExperienceMutation } from '../../profileService';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
import { CrossIconWrapper } from '../ActionSection/style';
const {
  profile: {
    block: {
      workExperience: {
        title,
        successAddMessage,
        successEditMessage,
        form: {
          steps: { summary, description },
        },
      },
    },
  },
} = lang;
const steps = [summary, description];

type WorkExperienceModalProps = {
  experienceData?: IExperienceData | null;
  cancelEdit: () => void;
};
const WorkExperienceModal = ({
  cancelEdit,
  experienceData,
}: WorkExperienceModalProps) => {
  const [activeStep, setActiveStep] = useState(FormSteps.SUMMARY);
  const [validatedSummary, setValidatedSummary] = useState<boolean>(false);
  const [validatedDescription, setValidatedDescription] = useState<boolean>(false);
  const [isExperienceDirty, setIsExperienceDirty] = useState<boolean>(false);
  const [summaryFormData, setSummaryFormData] = useState<IExperienceSummaryValues | null>();
  const [descriptionFormData, setDescriptionFormData] = useState<IExperienceDescriptionValues | null>();
  const [addExperiencesApi, addExperiencesApiResult] = useAddExperienceMutation();
  const [editExperiencesApi, editExperiencesApiResult] = useEditExperienceMutation();
  const handleSummaryDataSubmit: SubmitHandler<IExperienceSummaryValues> = async (formData) => {
    setActiveStep(FormSteps.DESCRIPTION);
    setSummaryFormData(formData);
    setValidatedSummary(true);
  };
  const save: SubmitHandler<IExperienceDescriptionValues> = async (formData) => {
    if (formData && summaryFormData) {
      const payload = formatExperiencePayload({ ...formData, ...summaryFormData });
      if (experienceData) {
        editExperiencesApi({ body: payload, id: experienceData.id })
          .unwrap().then(() => {
            showNotification(successEditMessage, NotificationType.SUCCESS);
          }).catch((error) => {
            showNotification(error?.data?.message, NotificationType.ERROR);
          }).finally(() => {
            cancelEdit();
          });
      } else {
        addExperiencesApi(payload).unwrap().then(() => {
          showNotification(successAddMessage, NotificationType.SUCCESS);
        }).catch((error) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        }).finally(() => {
          cancelEdit();
        });
      }
    }
  };
  useEffect(() => {
    if (experienceData) {
      setSummaryFormData(getSummaryFormData(experienceData));
      setDescriptionFormData(getDescriptionFormData(experienceData));
      setValidatedDescription(true);
    }
  }, [experienceData]);
  if (addExperiencesApiResult.isLoading || editExperiencesApiResult.isLoading) {
    return <Loader />;
  }
  const handleCancelEdit = () => {
    cancelEdit();
    setSummaryFormData(null);
    setDescriptionFormData(null);
  };
  const handleDescriptionValidate = () => {
    setValidatedDescription(true);
    setIsExperienceDirty(true);
  };
  const handleDescriptionBack = (data: IExperienceDescriptionValues): void => {
    setDescriptionFormData(data);
    setActiveStep(FormSteps.SUMMARY);
  };
  return (
    <Wrapper>
      <Container>
        <CrossIconWrapper onClick={cancelEdit} />
        <ModalTitle>{title}</ModalTitle>
        <Stepper steps={steps} activeStep={activeStep} />
        {activeStep === FormSteps.SUMMARY && (
          <Summary
            save={handleSummaryDataSubmit}
            cancelEdit={cancelEdit}
            validated={validatedSummary}
            data={summaryFormData}
            isExperienceDirty={isExperienceDirty}
            setIsExperienceDirty={setIsExperienceDirty}
          />
        )}
        {activeStep === FormSteps.DESCRIPTION && (
          <Description
            save={save}
            data={descriptionFormData}
            onValidate={handleDescriptionValidate}
            validated={validatedDescription}
            handleBack={handleDescriptionBack}
            cancelEdit={handleCancelEdit}
            isExperienceDirty={isExperienceDirty}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default WorkExperienceModal;
