import React from 'react';
import { ModalContentForm, ModalContentWrapper } from 'components/Modal/style';
import { FieldError, useForm } from 'react-hook-form';
import { useTags } from 'common/hooks/useTags';
import { yupResolver } from '@hookform/resolvers/yup';
import { LANGUAGES } from 'common/constants';
import { IOption } from 'components/MultipleInputTextArea/types';
import { Divider } from 'components/DiscardModal/styles';
import lang from 'common/lang';
import PriceRange from 'components/Atoms/PriceRange';
import MultiInput from 'components/Atoms/MultiInput';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import TagSelect from 'components/Atoms/TagSelect';
import SelectInput from 'components/Select/Select';
import { employmentTypeOptions } from 'pages/pro/components/WorkExperience/const';
import ButtonComp from 'components/buttonComp';
import { SaveButton } from 'pages/pro/styles';
import {
  ModalHeading,
  ModalContent,
  BasicSalaryContainer,
  BasicSalary,
  BasicSalaryContent,
  TargetEarningContainer,
  TargetEarningHeading,
  TargetEarningContent,
  LanguageRequirementContainer,
  LanguageContainerHeading,
  LangContent,
  CancelableTagsContainer,
  AddMoreContainer,
  AddMoreHeading,
  AddMoreContent,
  ButtonWrapper,
} from './style';
import { WhoYouArePopupProps, IWhoYouAreValues } from './type';
import { whoYouAreSchema } from './schema';

const {
  jobs: {
    createJobSteps: {
      details: { whoYouArePopup, skillPopup },
    },
    addRequirementsPlaceholder,
    addRequirements,
    salaryRangeInvalid,
  },
} = lang;

const WhoYouAreModal = ({ data, onClose, save }: WhoYouArePopupProps) => {
  const {
    formState: { isValid, errors },
    setValue,
    watch,
    setError,
    handleSubmit,
  } = useForm<IWhoYouAreValues>({
    resolver: yupResolver(whoYouAreSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: data || {},
  });
  const { loadAsyncOption } = useTags(LANGUAGES);
  const watchedOptions = watch('languages');
  const handleSelectChange = (selected: IOption | null) => {
    if (
      selected
      && !watchedOptions?.some((option) => option.value === selected.value)
    ) {
      setValue('languages', [...(watchedOptions || []), { ...selected }], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleCancelSelect = (tag: IOption) => {
    setValue(
      'languages',
      watchedOptions?.filter((selectedTag) => selectedTag.value !== tag.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };
  const disabledButton = !isValid || !watch('requirements')?.[0];
  const handleInputChange = (selected: number | string[] | IOption | IOption[] | null, type: keyof IWhoYouAreValues, shouldValidate = true) => setValue(type, selected, {
    shouldValidate,
    shouldDirty: true,
  });
  return (
    <ModalContentWrapper>
      <ModalContentForm width={670} onSubmit={handleSubmit(save)}>
        <ModalHeading>{whoYouArePopup.heading}</ModalHeading>
        <ModalContent>{whoYouArePopup.content}</ModalContent>
        <SelectInput
          options={employmentTypeOptions}
          labelText={whoYouArePopup.employmentTypeLabel}
          id="employmentType"
          placeHolder={whoYouArePopup.inputPlaceholder}
          onChange={(e) => handleInputChange(e, 'employmentType')}
          data-cy="employmentType"
          error={errors.employmentType as FieldError}
        />
        <BasicSalaryContainer>
          <BasicSalary>{whoYouArePopup.basicSalary}</BasicSalary>
          <BasicSalaryContent>
            {whoYouArePopup.basicSalaryContent}
          </BasicSalaryContent>
          <PriceRange
            range={[watch('salaryFrom'), watch('salaryTo')]}
            onRangeChange={(rangeToUpdate) => {
              handleInputChange(rangeToUpdate[0] || null, 'salaryFrom');
              handleInputChange(rangeToUpdate[1] || null, 'salaryTo');
            }}
            dataCys={['salaryFrom', 'salaryTo']}
            error={errors.salaryFrom || errors.salaryTo}
          />
        </BasicSalaryContainer>
        <Divider />
        <TargetEarningContainer>
          <TargetEarningHeading>
            {whoYouArePopup.targetEarningHeading}
          </TargetEarningHeading>
          <TargetEarningContent>
            {whoYouArePopup.targetEarningContent}
          </TargetEarningContent>
          <PriceRange
            range={[watch('oteFrom'), watch('oteTo')]}
            dataCys={['oteFrom', 'oteTo']}
            onRangeChange={(rangeToUpdate) => {
              handleInputChange(
                rangeToUpdate[0] || (rangeToUpdate[1] >= 1 ? null : 0),
                'oteFrom',
              );
              if (rangeToUpdate[0] === rangeToUpdate[1]) {
                setError('oteTo', { type: 'min', message: salaryRangeInvalid });
              }
              handleInputChange(rangeToUpdate[1] || null, 'oteTo', rangeToUpdate[0] !== rangeToUpdate[1]);
            }}
            error={errors.oteFrom || errors.oteTo}
          />
        </TargetEarningContainer>
        <Divider />
        <LanguageRequirementContainer>
          <LanguageContainerHeading>
            {whoYouArePopup.langContainerHeading}
          </LanguageContainerHeading>
          <LangContent>{whoYouArePopup.langContent}</LangContent>
          {!!watchedOptions?.length && (
            <CancelableTagsContainer>
              {watchedOptions?.map((tag) => (
                <TagSelect
                  key={tag.value}
                  label={tag.label}
                  isSelected
                  withCrossIcon
                  cancelSelect={() => handleCancelSelect(tag)}
                />
              ))}
            </CancelableTagsContainer>
          )}
          <AsyncSelectInput
            loadAsyncOption={loadAsyncOption}
            labelText=""
            id="languages"
            placeHolder={whoYouArePopup.inputPlaceholder}
            onChange={handleSelectChange}
            data-cy="skillsAndTechnologiesUsedInput"
            disabled={watch('languages')?.length === 20}
          />
        </LanguageRequirementContainer>
        <Divider />
        <AddMoreContainer>
          <AddMoreHeading>{whoYouArePopup.addMoreHeading}</AddMoreHeading>
          <AddMoreContent>{whoYouArePopup.addMoreContent}</AddMoreContent>
          <MultiInput
            inputs={watch('requirements') || []}
            onChange={(inputsToUpdate) => handleInputChange(inputsToUpdate, 'requirements')}
            inputPlaceholder={addRequirementsPlaceholder}
            error={errors.requirements as FieldError}
            buttonText={addRequirements}
          />
        </AddMoreContainer>
        <Divider />
        <ButtonWrapper>
          <ButtonComp
            label={skillPopup.cancel}
            variant="link"
            onClick={onClose}
            data-cy="close"
          />
          <SaveButton
            label={skillPopup.save}
            disabled={disabledButton}
            primary
            type="submit"
            data-cy="submit"
          />
        </ButtonWrapper>
      </ModalContentForm>
    </ModalContentWrapper>
  );
};

export default WhoYouAreModal;
