import React, { useState } from 'react';
import lang from 'common/lang';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import WordCounter from 'components/WordCounter/WordCounter';
import ButtonComp from 'components/buttonComp';
import { useFunctionalRoles } from 'common/hooks/useFunctionalRoles';
import { MyOptionType } from 'components/Select/types';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { IJobRoleValues } from '../types';
import {
  Container,
  Heading,
  SubHeading,
  SpecifyText,
  FindRoleTxt,
  SpecificationContainer,
  Header,
  InputWrapper,
  Buttons,
} from './style';
import FindRolePopup from './FindRolePopup';
import { RoleProps } from './type';
import { jobRoleSchema } from '../schema';
const {
  jobs: {
    createJobSteps: { role },
  },
  buttonText,
} = lang;

const Role = ({ onNext, data }: RoleProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IJobRoleValues>({
    resolver: yupResolver(jobRoleSchema),
    mode: 'onBlur',
    values: data,
  });
  const router = useRouter();

  const jobRole = watch('role');
  const jobRoleType = watch('roleType');
  const { loadAsyncOption: loadAsyncFunctionalRoles } = useFunctionalRoles();

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNext = () => {
    onNext(watch());
  };

  return (
    <Container>
      <Header>
        <Heading>{role.heading}</Heading>
        <SubHeading>{role.subHeading}</SubHeading>
      </Header>
      <InputWrapper>
        <InputComp
          type={InputType.TEXT}
          id="role"
          data-cy="role"
          value={jobRole}
          placeholder={role.placeholder}
          labelText={role.label}
          register={() => register('role', {})}
          error={role ? errors?.role : undefined}
        />
        <WordCounter
          error={!!errors.role}
          total={50}
          count={jobRole?.length || 0}
        />
      </InputWrapper>
      <SpecificationContainer>
        <SpecifyText>
          {role.specifyText}
          <b>{role.projectManager}</b>
          {role.orTxt}
          <b>{role.reactDeveloperTxt}</b>
          {role.specifyTextTwo}
        </SpecifyText>
        <SpecifyText>{role.specifyTextThree}</SpecifyText>
      </SpecificationContainer>
      <InputWrapper>
        <AsyncSelectInput
          loadAsyncOption={loadAsyncFunctionalRoles}
          labelText={role.roleType.label}
          id="roleType"
          placeHolder={role.roleType.placeholder}
          value={jobRoleType}
          data-cy="roleTypeInput"
          onChange={(selected: MyOptionType | null) => setValue('roleType', selected, {
            shouldValidate: true,
            shouldDirty: true,
          })}
        />
        <FindRoleTxt onClick={handleOpen}>{role.findRoleTxt}</FindRoleTxt>
        <FindRolePopup isOpen={open} onClose={handleClose} />
      </InputWrapper>
      <Buttons>
        <ButtonComp label={buttonText.cancel} variant="link" onClick={() => { router.back(); }} />
        <ButtonComp
          label={role.nextBtnTxt}
          primary
          fullWidth
          onClick={handleNext}
          disabled={!isValid}
          data-cy="createJob"
        />
      </Buttons>
    </Container>
  );
};

export default Role;
