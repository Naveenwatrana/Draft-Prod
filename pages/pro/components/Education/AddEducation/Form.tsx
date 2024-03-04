import lang from 'common/lang';
import useEducation from 'common/hooks/useEducation';
import TextComp from 'components/textComp';
import Stepper from 'components/Stepper';
import { useCallback, useState } from 'react';
import Divider from 'components/Divider/Divider';
import Loader from 'components/Loader/Loader';
import { Wrapper } from 'pages/pro/components/WorkExperience/styles';
import { CrossIconWrapper } from 'pages/pro/components/ActionSection/style';
import { Container } from './styles';
import { AddEducationFormProps, IAddEducationPayload, IEducationFormDescriptionFields } from './types';
import Summary from './Summary';
import EducationDescription from './Description';
import { getEducationDescriptionData, getEducationFormData } from '../utils';
import { showNotification } from '../../Projects/util';
import { NotificationType } from '../../Projects/ViewProject/types';

const {
  modalTitle, formSteps, addMessage, updateMessage,
} = lang.profile.education;

const steps = [formSteps.step1, formSteps.step2];

const AddEducationForm = ({ closeForm, data: educationData }: AddEducationFormProps) => {
  const [step, setStep] = useState<number>(1);
  const [descriptionData, setDescriptionData] = useState<IEducationFormDescriptionFields>(getEducationDescriptionData(educationData));
  const [validatedDescription, setValidatedDescription] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAddEducationPayload>(getEducationFormData(educationData));
  const { addEducation, editEducation, loading } = useEducation();
  const [isEducationDirty, setIsEducationDirty] = useState<boolean>(false);

  const handleNext = useCallback((data: IAddEducationPayload) => {
    setStep((prev) => prev + 1);
    setFormData(data);
    setValidatedDescription(true);
  }, [setStep]);

  const handleAddEducation = async (data: IEducationFormDescriptionFields) => {
    try {
      if (educationData) {
        await editEducation(educationData.id, formData, data.skills, data.description);
        showNotification(updateMessage, NotificationType.SUCCESS);
        closeForm();
      } else {
        await addEducation(formData, data.skills, data.description);
        showNotification(addMessage, NotificationType.SUCCESS);
        closeForm();
      }
    } catch (error: any) {
      showNotification(error.data.message, NotificationType.ERROR);
    }
  };

  const handleBack = (data: IEducationFormDescriptionFields) => {
    setDescriptionData(data);
    setStep((prev) => prev - 1);
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      <Container>
        <CrossIconWrapper onClick={closeForm} />
        <TextComp component="h2">{modalTitle}</TextComp>
        <Stepper steps={steps} activeStep={step} />
        <Divider />
        {step === 1 && (
          <Summary
            closeForm={closeForm}
            handleNext={handleNext}
            data={formData}
            setIsEducationDirty={setIsEducationDirty}
          />
        )}
        {step === 2 && (
          <EducationDescription
            closeForm={closeForm}
            handleNext={handleAddEducation}
            onBack={handleBack}
            data={descriptionData}
            onValidate={() => {
              setValidatedDescription(true);
              setIsEducationDirty(true);
            }}
            validated={validatedDescription}
            isEducationDirty={isEducationDirty}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default AddEducationForm;
