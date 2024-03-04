import ButtonComp from 'components/buttonComp';
import Checkbox from 'components/inputComp/checkbox';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Divider from 'components/Divider/Divider';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import ImageUploadProjects from 'components/ImageUpload/ImageUploadProjects';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatYMD } from 'common/constants';
import ProjectTitle from 'pages/pro/components/Projects/ProjectTitle/ProjectTitle';
import ProjectDescription from 'components/Description/Description';
import {
  EditProjectsProps, IProjectValues, schema,
} from 'pages/pro/components/Projects/types';
import { maxTitleCharacters, maxCharacters } from 'pages/pro/components/Projects/constant';
import { IProjectPicture } from 'pages/pro/types';
import DatePickerComp from 'components/DatePicker';
import MultipleInputTextArea from 'components/MultipleInputTextArea';
import { IOption } from 'components/MultipleInputTextArea/types';
import { DateField } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import { useTags } from 'common/hooks/useTags';
import { TagsLoaderContainer } from 'components/Atoms/TagsLoaderComponent';
import { useEffect } from 'react';
import { Buttons, SaveButton } from '../../styles';
import {
  AddMediaLabelContainer,
  DescriptionLabel,
  Label, OngoingProject, PageContainer, PageContainerWrapper, Title,
} from './styles';
import { CrossIconWrapper } from '../ActionSection/style';

const { projects, profile, onBoarding: { image } } = lang;

const EditProjects = ({
  cancel,
  values,
  save,
  isLoading,
}: EditProjectsProps) => {
  const valuesToUpdate = { ...values };
  if (valuesToUpdate?.endDate === '') delete valuesToUpdate.endDate;
  const {
    register,
    formState: {
      isValid, isDirty, errors,
    },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IProjectValues>({
    resolver: yupResolver(schema), mode: 'onChange', reValidateMode: 'onChange', defaultValues: valuesToUpdate ? valuesToUpdate : { title: '', description: '' },
  });
  const { setInputValue, options, tagListResult } = useTags();
  useEffect(() => {
    if (watch('ongoing')) {
      setValue('endDate', '', { shouldValidate: true });
    }
  }, [watch('ongoing')]);
  return (
    <PageContainerWrapper>
      <PageContainer>
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit(save)}>
          <Title component="h2">{projects.addProject}</Title>
          <CrossIconWrapper onClick={cancel} />
          <ProjectTitle
            value={watch('title')}
            setValue={(e) => setValue('title', e, { shouldValidate: true, shouldDirty: true })}
            maxCharacters={maxTitleCharacters}
            data-cy="projectTitle"
          />
          <DateField>
            <DatePickerComp
              label={projects.startDate}
              placeholder={projects.startDate}
              id="startDate"
              maxDate={
                watch('endDate')
              || formatDate(new Date().toString(), dateFormatYMD)
              }
              onChange={(e) => setValue('startDate', `${e}`, { shouldValidate: true, shouldDirty: true })}
              selected={watch('startDate')}
              cypressLocator="project-start-date"
            />
            <DatePickerComp
              isDisabled={watch('ongoing')}
              label={projects.endDate}
              placeholder={watch('ongoing') ? projects.now : projects.endDate}
              id="endDate"
              minDate={watch('startDate')}
              onChange={(e) => setValue('endDate', `${e}`, { shouldValidate: true, shouldDirty: true })}
              selected={watch('endDate')}
              cypressLocator="project-end-date"
            />
          </DateField>
          <OngoingProject>
            <Checkbox
              label={projects.ongoingProjects}
              id="ongoing"
              register={register}
              data-cy="projectOngoing"
            />
          </OngoingProject>
          <MultipleInputTextArea
            error={errors?.skills as FieldError}
            value={watch('skills')}
            onChange={(value: IOption[]) => setValue('skills', value, {
              shouldValidate: true,
              shouldDirty: true,
            })}
            onInputChange={setInputValue}
            placeholder={projects.skillsPlaceholder}
            label={projects.skills}
            data-cy="searchTags"
            options={options}
            isLoading={tagListResult.isLoading}
            maxWords={10}
          />
          <TagsLoaderContainer isLoading={tagListResult.isLoading}>
            {tagListResult.isLoading && <Loader fullScreen={false} />}
          </TagsLoaderContainer>
          <Divider />
          <AddMediaLabelContainer>
            <Label component="h6">{projects.addMediaLabel}</Label>
            <Label component="h6">{projects.fileSpecification}</Label>
          </AddMediaLabelContainer>
          <ImageUploadProjects
            updateValue={(files: IProjectPicture[], fieldName) => setValue(fieldName as keyof IProjectValues, files, {
              shouldValidate: true,
              shouldDirty: true,
            })}
            labelText={image.imageInputLabel}
            info={image.imageInputInfo}
            savedImages={values?.savedImages}
            setDeletedImages={(e) => setValue('deletedImages', e, {
              shouldValidate: true,
              shouldDirty: true,
            })}
          />
          <Divider />
          <DescriptionLabel component="h6">{projects.descriptionLabel}</DescriptionLabel>
          <ProjectDescription
            placeholder={projects.descriptionPlaceholder}
            value={watch('description')}
            setValue={(e) => setValue('description', e, {
              shouldValidate: true,
              shouldDirty: true,
            })}
            maxCharacters={maxCharacters}
          />
          <Divider />
          <Buttons>
            <ButtonComp
              label={profile.cancel}
              onClick={cancel}
              variant="link"
              primary
              data-cy="cancelEditProject"
            />
            <SaveButton
              label={profile.save}
              type="submit"
              disabled={!isValid || !isDirty}
              primary
              data-cy="saveEditProject"
            />
          </Buttons>
        </form>
      </PageContainer>
    </PageContainerWrapper>
  );
};
export default EditProjects;
