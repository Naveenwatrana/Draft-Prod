import { DividerComp } from 'components/Divider/styles';
import ModalElement from 'components/Modal/Modal';
import { ModalContentForm, ModalContentWrapper } from 'components/Modal/style';
import ButtonComp from 'components/buttonComp';
import { ModalHeading } from 'pages/jobs/create/details/style';
import React from 'react';
import TextComp from 'components/textComp';
import RadioButton from 'components/Atoms/RadioButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import lang from 'common/lang';
import useApplicants from 'common/hooks/useApplicants';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { MyOptionType } from 'components/Select/types';
import { CloseConfirmationProps, ICloseJobModalValues } from './types';
import { Buttons, ModalSubHeader, RadioButtons } from './style';
import { schema } from './schema';
const {
  jobs: {
    closeJobModal: {
      heading,
      subHeading,
      desc1,
      desc2,
      hiredForThisRoleTitle,
      yesOption, noOption,
      foundCandidateOnDraftTitle,
      candidateName,
    },
  },
} = lang;
const CloseConfirmation = ({ onClose, onSubmit, jobId }: CloseConfirmationProps) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: {
      isValid,
    },
  } = useForm<ICloseJobModalValues>({
    resolver: yupResolver(schema),
  });
  const hiredForThisRole = watch('hiredForThisRole');
  const foundCandidateOnDraft = watch('foundCandidateOnDraft');
  const handleCheck = (item: boolean, type: keyof ICloseJobModalValues) => {
    setValue(type, item, { shouldValidate: true });
    if (!item) setValue('candidateName', null);
  };
  const { loadAsyncOption } = useApplicants(jobId);
  const disabledButton = (hiredForThisRole !== false && hiredForThisRole !== true) || !isValid;
  return (
    <ModalElement isOpen={true} centered position={2} shouldCloseOnOverlayClick>
      <ModalContentWrapper>
        <ModalContentForm width={457} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeading>{heading}</ModalHeading>
          <ModalSubHeader>{subHeading}</ModalSubHeader>
          <TextComp>{desc1}</TextComp>
          <TextComp>{desc2}</TextComp>
          <DividerComp />
          <ModalSubHeader>{hiredForThisRoleTitle}</ModalSubHeader>
          <RadioButtons>
            <RadioButton label={yesOption} onCheck={() => handleCheck(true, 'hiredForThisRole')} checked={hiredForThisRole} name="hiredForThisRole" />
            <RadioButton
              label={noOption}
              onCheck={() => {
                handleCheck(false, 'hiredForThisRole');
                setValue('foundCandidateOnDraft', null);
              }}
              checked={hiredForThisRole === false}
              name="hiredForThisRole"
            />
          </RadioButtons>
          {hiredForThisRole
          && (
            <>
              <DividerComp />
              <ModalSubHeader>{foundCandidateOnDraftTitle}</ModalSubHeader>
              <RadioButtons>
                <RadioButton label={yesOption} onCheck={() => handleCheck(true, 'foundCandidateOnDraft')} checked={foundCandidateOnDraft} name="foundCandidateOnDraft" />
                <RadioButton label={noOption} onCheck={() => handleCheck(false, 'foundCandidateOnDraft')} checked={foundCandidateOnDraft === false} name="foundCandidateOnDraft" />
              </RadioButtons>
              {foundCandidateOnDraft && (
                <>
                  <DividerComp />
                  <ModalSubHeader>{candidateName.label}</ModalSubHeader>
                  <AsyncSelectInput
                    loadAsyncOption={loadAsyncOption}
                    labelText=""
                    id="candidateName"
                    placeHolder={candidateName.placeholder}
                    value={watch('candidateName')}
                    data-cy="roleTypeInput"
                    onChange={(selected: MyOptionType | null) => setValue('candidateName', selected, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })}
                  />
                </>
              )}
            </>
          )}
          <DividerComp />
          <Buttons>
            <ButtonComp
              label="Cancel"
              variant="link"
              onClick={onClose}
              data-cy="Cancel"
            />
            <ButtonComp
              label="Close job"
              disabled={!!disabledButton}
              variant="primary_gradient"
              primary
              type="submit"
              data-cy="Close Job"
            />
          </Buttons>
        </ModalContentForm>
      </ModalContentWrapper>
    </ModalElement>
  );
};

export default CloseConfirmation;
