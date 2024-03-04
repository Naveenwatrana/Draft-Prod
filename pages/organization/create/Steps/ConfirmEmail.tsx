import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import { useRouter } from 'next/router';
import TextComp from 'components/textComp';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import DescriptionInfo from 'components/Atoms/InfoBlock/Description';
import { InputType } from 'components/inputComp/types';
import CheckBox from 'components/input/CheckBox';
import OTPInput from 'components/Atoms/OTPInput';
import { useAddCompanyMutation, useVerifyOtpMutation } from 'pages/company/companyService';
import { useAppDispatch } from 'common/hooks/state';
import { addCompanyProfile, setCompany } from 'pages/account/authSlice';
import { switchCompany } from 'pages/api/const';
import { clearData } from 'components/CardCreationWizard/slice';
import { formatCompanyProfile } from 'common/utils/helpers';
import { Buttons } from '../style';
import {
  DescriptionText, Header, OrgDetailsContainer, CheckboxContainer,
} from './style';
import {
  ConfirmEmailProps,
  IConfirmEmailValues,
  confirmEmailSchema,
  confirmOtpSchema,
} from '../types';

const {
  organization: {
    create: {
      confirmEmail: {
        title,
        subTitle,
        otpSubTitle,
        workEmail,
        acceptedEmails,
        confirmEmailMessage,
      },
    },
  },
  buttonText: { next, cancel, submit },
} = lang;
const ConfirmEmail = ({ orgData, onNext }: ConfirmEmailProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [validated, setValidated] = useState<boolean>();

  const url = useMemo(() => {
    const urlToReturn = new URL(
      `${orgData.organizationURL?.includes('http') ? '' : 'https://'}${
        orgData.organizationURL
      }`,
    );
    return urlToReturn.hostname;
  }, [orgData.organizationURL]);
  const {
    register,
    watch,
    setError,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<IConfirmEmailValues>({
    resolver: yupResolver(confirmEmailSchema, confirmOtpSchema),
    mode: 'onChange',
  });
  const verifyOtp = watch('otp');
  const workEmailValue = watch('workEmail');
  const newUrl = url.replace(/^www\./, '');
  const [addCompany] = useAddCompanyMutation();
  const [verifyData] = useVerifyOtpMutation();
  const [otpErr, setOtpErr] = useState<string>('');
  useEffect(() => {
    if (orgData) {
      reset((formValues) => ({
        ...formValues,
        ...orgData,
      }));
    }
  }, []);
  const onSubmit = async () => {
    if (!workEmailValue.includes(newUrl)) {
      setError('workEmail', { message: `${workEmail.domainNameError}` });
    } else if (isValid && !validated && !verifyOtp) {
      const { data: companyData } = await addCompany({
        name: orgData?.organizationName,
        url: orgData?.organizationURL,
        username: orgData?.userName,
        type: orgData?.orgType.value,
        company_type: orgData?.companyType?.value,
        work_email: workEmailValue,
      }).unwrap();
      await fetch(switchCompany, {
        method: 'POST',
        body: JSON.stringify({ company: companyData }),
        cache: 'no-store',
      });
      dispatch(setCompany({ currentCompany: companyData }));
      dispatch(addCompanyProfile({ company: formatCompanyProfile(companyData) }));
      setValidated(true);
    } else if (validated) {
      await verifyData({
        work_email: workEmailValue,
        verification_code: verifyOtp,
      }).unwrap().then(() => {
        setOtpErr('');
        dispatch(clearData());
        onNext();
      }).catch((error: any) => {
        setOtpErr(error?.data?.message);
      });
    }
  };
  return (
    <OrgDetailsContainer>
      <Header>
        <TextComp component="h2">{title}</TextComp>
        <DescriptionText>
          {!validated ? (subTitle) : (otpSubTitle)}
          {validated && <b>{workEmailValue}</b>}
        </DescriptionText>
        {!validated ? (
          <>
            <InputComp
              type={InputType.TEXT}
              id="workEmail"
              labelText={workEmail.label}
              value={workEmailValue}
              placeholder={workEmail.placeholder}
              register={register}
              data-cy="workEmail"
              error={workEmailValue ? errors?.workEmail : undefined}
              dynamicErrorContent={<b>{` ${newUrl}`}</b>}
              disabled={validated}
            />
            <DescriptionInfo content={`${acceptedEmails}${newUrl}`} />
            <CheckboxContainer>
              <CheckBox
                label={confirmEmailMessage}
                id="confirmEmailMessage"
                register={register}
                data-cy="confirmEmailMessage"
              />
            </CheckboxContainer>
          </>
        )
          : (
            <OTPInput
              value={watch('otp')}
              placeholder="0"
              onChange={(e) => setValue('otp', e)}
              data-cy="otp"
              error={otpErr ? { message: otpErr } as any /* TODO update type */ : undefined}
              numInputs={6}
            />
          )}
      </Header>
      <Buttons>
        <ButtonComp
          label={cancel}
          primary
          variant="link"
          onClick={router.back}
          data-cy="cancelCreateOrganization"
        />
        <ButtonComp
          label={!validated ? next : submit}
          primary
          fullWidth
          disabled={!isValid}
          onClick={onSubmit}
          data-cy="nextCreateOrganization"
        />
      </Buttons>
    </OrgDetailsContainer>
  );
};

export default ConfirmEmail;
