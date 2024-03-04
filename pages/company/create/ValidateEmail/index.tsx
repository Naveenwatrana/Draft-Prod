import React from 'react';
import FormToast from 'components/FormToast';
import lang from 'common/lang';
import Button from 'components/buttonComp';
import { InputType } from 'components/inputComp/types';
import InputComp from 'components/inputComp';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateCompanyEmailValues } from 'pages/company/types';
import {
  Buttons,
  CompanyBody,
  CreateCompanyContainer,
} from '../styles';
import { validateEmailSchema } from '../schema';

type ValidateEmailProps = {
  onNext: () => void;
  onPrevious: () => void;
  url: string;
};
const {
  company,
  buttonText: { next, back },
} = lang;
const {
  submittingProfile: { header, body },
} = company;
const ValidateEmail = ({ onNext, url, onPrevious }: ValidateEmailProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCompanyEmailValues>({
    resolver: yupResolver(validateEmailSchema),
    defaultValues: { companyEmail: '' },
  });
  const emailValue = watch('companyEmail');
  const onSubmit: SubmitHandler<ICreateCompanyEmailValues> = async () => {
    // TODO: handle email verification from BE
    onNext();
  };
  return (
    <CreateCompanyContainer onSubmit={handleSubmit(onSubmit)}>
      <CompanyBody>
        <FormToast header={header} body={body} />
        <InputComp
          defaultValue={url}
          type={InputType.TEXT}
          labelText={company.companyUrl}
          id="companyUrl"
          value={url}
          placeholder={company.companyUrlPlaceholder}
          data-cy="addCompanyURL"
          register={() => {}}
          disabled
        />
        <InputComp
          type={InputType.TEXT}
          id="companyEmail"
          labelText={company.companyEmail}
          value={emailValue}
          placeholder={company.emailPlaceholder}
          register={register}
          data-cy="companyEmail"
          error={emailValue ? errors?.companyEmail : undefined}
        />
      </CompanyBody>

      <Buttons>
        <Button
          label={back}
          primary
          variant="link"
          onClick={onPrevious}
          data-cy="cancelCreateCompany"
        />
        <Button
          label={next}
          primary
          fullWidth
          disabled={!!Object.keys(errors).length || !emailValue}
          data-cy="nextCreateCompany"
          type="submit"
        />
      </Buttons>
    </CreateCompanyContainer>
  );
};

export default ValidateEmail;
