import { SubmitHandler } from 'react-hook-form';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import { useState } from 'react';
import { PageContainer } from 'components/Atoms/ResumeAddContent/styles';
import Stepper from 'components/Stepper';
import TextComp from 'components/textComp';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import { useAddProjectMutation, useEditProjectMutation } from 'pages/pro/profileService';
import { CrossIconWrapper } from 'pages/pro/components/ActionSection/style';
import { IOption } from 'components/MultipleInputTextArea/types';
import { PageContainerWrapper } from './style';
import {
  FormSteps, IDescriptionProjectValues, ISideProjectData, ISummaryProjectValues,
} from './types';
import Summary from './Summary';
import Description from './Description';
import {
  formatSideProjectPayload, orderMedia, showNotification, sortFormImages,
} from '../../util';
import { NotificationType } from '../../ViewProject/types';
import { getDescriptionFormData, getSummaryFormData } from './util';
import { ITagResponse } from '../../types';

const {
  projects,
} = lang;
const { summary, description } = projects.steps;
const steps = [summary, description];
type EditProjectsProps = {
    cancel: () => void;
    values?: ISideProjectData;
    isLoading: boolean;
    onRefetch?: () => void;
    associatedWith?: (IOption & { tags: ITagResponse[] });
  };

const EditProjects = ({
  cancel,
  values,
  isLoading,
  associatedWith,
  onRefetch,
}: EditProjectsProps) => {
  const [activeStep, setActiveStep] = useState(FormSteps.SUMMARY);
  const [loading, setLoading] = useState(false);
  const [summaryFormData, setSummaryFormData] = useState<ISummaryProjectValues | undefined>(values ? { ...getSummaryFormData(values), associatedWith } : undefined);
  const [descriptionFormData, setDescriptionFormData] = useState<IDescriptionProjectValues | undefined>(values ? getDescriptionFormData(values) : undefined);
  const [validatedSummary, setValidatedSummary] = useState<boolean>(false);
  const [validatedDescription, setValidatedDescription] = useState<boolean>(!!values);
  const [isProjectDirty, setIsProjectDirty] = useState<boolean>(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const [addProjectApi, addProjectApiResult] = useAddProjectMutation();
  const [editProjectApi, editProjectApiResult] = useEditProjectMutation();
  const onDescriptionFormSubmit: SubmitHandler<IDescriptionProjectValues> = async (formData) => {
    if (formData && summaryFormData) {
      setLoading(true);
      const updatedFormData: IDescriptionProjectValues = sortFormImages(formData);
      const uploadedImages = updatedFormData?.image?.map(async (image) => {
        if (image.file) {
          const media = await uploadMediaFile(image.file, currentUser.username);
          return media;
        }
      });
      const media = uploadedImages ? await Promise.all(uploadedImages) : [];
      const body = formatSideProjectPayload({ ...formData, ...summaryFormData }, orderMedia(updatedFormData, media));
      if (values) {
        editProjectApi({ body: { ...body, experience_id: body?.experience_id || '' }, id: values.id })
          .unwrap()
          .then(() => showNotification(projects.updatedSuccess, NotificationType.SUCCESS))
          .catch((e) => showNotification(projects.updatingError, NotificationType.ERROR))
          .finally(() => {
            cancel();
            setLoading(false);
            onRefetch && onRefetch();
          });
      } else {
        addProjectApi(body)
          .unwrap()
          .then(() => showNotification(projects.createdSuccess, NotificationType.SUCCESS))
          .catch((e) => showNotification(projects.createdError, NotificationType.ERROR))
          .finally(() => {
            cancel();
            onRefetch && onRefetch();
            setLoading(false);
          });
      }
    }
  };
  const onSummaryFormSubmit: SubmitHandler<ISummaryProjectValues> = async (formData) => {
    setSummaryFormData(formData);
    setActiveStep(FormSteps.DESCRIPTION);
    setDescriptionFormData({ ...descriptionFormData, providedSkillsAndTechnologiesUsed: formData.associatedWith });
    setValidatedSummary(true);
  };
  const handleBack = (formData: IDescriptionProjectValues) => {
    setDescriptionFormData(formData);
    setActiveStep((step) => step - 1);
  };

  return (
    <PageContainerWrapper>
      <PageContainer>
        <CrossIconWrapper onClick={cancel} />
        {(isLoading || loading || addProjectApiResult.isLoading || editProjectApiResult.isLoading) && <Loader />}
        <TextComp component="h2">{projects.addProject}</TextComp>
        <Stepper steps={steps} activeStep={activeStep} />
        {activeStep === FormSteps.SUMMARY && (
          <Summary
            data={summaryFormData}
            cancelEdit={cancel}
            save={onSummaryFormSubmit}
            validated={validatedSummary}
            setIsProjectDirty={setIsProjectDirty}
          />
        )}
        {activeStep === FormSteps.DESCRIPTION && (
          <Description
            onValidate={() => {
              setValidatedDescription(true);
              setIsProjectDirty(true);
            }}
            data={descriptionFormData}
            cancelEdit={cancel}
            save={onDescriptionFormSubmit}
            onBack={handleBack}
            isProjectDirty={isProjectDirty}
            validated={validatedDescription}
          />
        )}
      </PageContainer>
    </PageContainerWrapper>
  );
};
export default EditProjects;
