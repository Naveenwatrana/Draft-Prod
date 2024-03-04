import TextComp from 'components/textComp';
import lang from 'common/lang';
import InputWordCount from 'components/inputComp/InputWordCount';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { minRoleTitleCharacters, maxRoleTitleCharacters } from 'pages/pro/components/Projects/constant';
import SelectInput from 'components/Select/Select';
import { MyOptionType } from 'components/Select/types';
import ButtonComp from 'components/buttonComp';
import { InputType } from 'components/inputComp/types';
import { useCheckCompanyDraftURLMutation } from 'pages/company/companyService';
import useDebounce from 'common/hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { ICompanyDetailResponse } from 'pages/company/types';
import {
  LoadingCompany, LoadingText,
} from 'pages/company/create/styles';
import LoadingCompanyLogo from 'components/Icons/LodingCompany';
import { useRouter } from 'next/router';
import { useNavigate } from 'common/utils/router-fill';
import DraftUrlInput from 'components/Atoms/DraftUrl';
import { Buttons } from '../style';
import { companyOrgType, companyTypeOptions, orgTypeOptions } from '../const';
import { IOrganizationValues, OrgDetailsProps, orgDetailsSchema } from '../types';
import {
  OrganizationFoundBlock,
  DescriptionText,
  Header,
  OrgDetailsContainer,
  OrganizationFoundTitle,
  OrganizationFoundSubtitle,
  OrganizationFoundBlockContent,
  OrganizationLogo,
  OrganizationDetailContainer,
} from './style';

const {
  organization: {
    create: {
      organizationDetails,
      organizationDetailsSubtitleOne,
      organizationDetailsSubtitleTwo,
      orgDetailForm: {
        organizationName,
        orgType,
        orgDraftURL,
        companyType,
      },
      foundMessageSubTitle,
      foundMessageTitle,
      viewTheProfile,
    },
  },
  company: {
    userNameAvailable,
  },
  company,
  buttonText: { next, cancel },
} = lang;

const OrgDetails = ({ onNext, orgData }: OrgDetailsProps) => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { isValid },
    setValue,
    reset,
  } = useForm<IOrganizationValues>({
    resolver: yupResolver(orgDetailsSchema),
    mode: 'onChange',
  });
  const [checkCompanyDraftURL, result] = useCheckCompanyDraftURLMutation();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showCompany, setShowCompany] = useState<ICompanyDetailResponse | null>();
  const urlValue = watch('organizationName')?.replace(/[^A-Za-z0-9]+/g, '-').replace(/\s+/g, ' ').toLowerCase().replace(/^-|-$|(-)+/g, '$1');
  const [draftUrlErr, setDraftUrlErr] = useState<string>('');
  const debouncedValue = useDebounce(urlValue, 1000);
  useEffect(() => {
    if (orgData) {
      reset((formValues) => ({
        ...formValues,
        ...orgData,
      }));
    }
  }, []);
  useEffect(() => {
    setButtonDisabled(true);
  }, [urlValue]);
  const checkExistingCompany = useCallback(() => {
    checkCompanyDraftURL(debouncedValue)
      .unwrap()
      .then((response) => {
        if (response?.message !== userNameAvailable) {
          setShowCompany(response.data?.[0]);
        }
        setDraftUrlErr('');
        setButtonDisabled(response?.message !== userNameAvailable);
      })
      .catch((error: any) => {
        setDraftUrlErr(error?.data?.message);
      });
  }, [checkCompanyDraftURL, debouncedValue]);

  useEffect(() => {
    if (debouncedValue) {
      checkExistingCompany();
    }
  }, [checkExistingCompany, debouncedValue]);
  useEffect(() => {
    setShowCompany(null);
  }, [urlValue]);
  const onSubmit = () => {
    if (orgData) {
      reset((formValues) => ({
        ...formValues,
        ...orgData,
        userName: urlValue,
      }));
    }
    onNext(watch());
  };
  return (
    <OrgDetailsContainer>
      <Header>
        <TextComp component="h2">{organizationDetails}</TextComp>
        <DescriptionText>{organizationDetailsSubtitleOne}</DescriptionText>
        <DescriptionText>{organizationDetailsSubtitleTwo}</DescriptionText>
        <InputWordCount
          value={watch('organizationName')}
          setValue={(e) => setValue('organizationName', e, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          minCharacters={minRoleTitleCharacters}
          maxCharacters={maxRoleTitleCharacters}
          data-cy="organizationName"
          placeholder={organizationName.placeholder}
          label={organizationName.label}
        />
        <DraftUrlInput
          labelText={orgDraftURL.label}
          placeholder={organizationName.placeholder?.toLowerCase().split(' ').join('-')}
          value={urlValue}
          type={InputType.TEXT}
          id="orgDraftURL"
          register={register}
          error={draftUrlErr ? { message: orgDraftURL.error } as any /* TODO update type */ : undefined}
          readOnly
        />
        <SelectInput
          options={orgTypeOptions}
          labelText={orgType.label}
          id="orgType"
          placeHolder={orgType.placeholder}
          value={watch('orgType')?.value}
          data-cy="orgTypeInput"
          onChange={(selected: MyOptionType | null) => selected
            && setValue('orgType', selected, {
              shouldValidate: true,
              shouldDirty: true,
            })}
        />
        {watch('orgType.value') === companyOrgType && (
          <SelectInput
            options={companyTypeOptions}
            labelText={companyType.label}
            id="companyType"
            placeHolder={companyType.placeholder}
            value={watch('companyType')?.value}
            data-cy="companyTypeInput"
            onChange={(selected: MyOptionType | null) => selected
              && setValue('companyType', selected, {
                shouldValidate: true,
                shouldDirty: true,
              })}
          />
        )}
        <OrganizationDetailContainer>
          {result.isLoading && (
            <>
              <LoadingCompany>
                <LoadingCompanyLogo />
              </LoadingCompany>
              <LoadingText>{company.checking}</LoadingText>
            </>
          )}
          {showCompany && (
            <OrganizationFoundBlock>
              <OrganizationLogo src={showCompany?.logo} />
              <OrganizationFoundBlockContent>
                <OrganizationFoundTitle>
                  {foundMessageTitle}
                </OrganizationFoundTitle>
                <OrganizationFoundSubtitle>
                  {foundMessageSubTitle}
                </OrganizationFoundSubtitle>
                <ButtonComp
                  primary
                  variant="link"
                  label={viewTheProfile}
                  data-cy="viewCompanyProfile"
                  onClick={() => navigate(`/org/${showCompany?.username}`)}
                />
              </OrganizationFoundBlockContent>
            </OrganizationFoundBlock>
          )}
        </OrganizationDetailContainer>
      </Header>
      <Buttons>
        <ButtonComp
          label={cancel}
          primary
          variant="link"
          onClick={router.back}
          data-cy="cancelCreateCompany"
        />
        <ButtonComp
          label={next}
          primary
          fullWidth
          onClick={onSubmit}
          disabled={
            !isValid
            || buttonDisabled
            || (watch('orgType.value') === companyOrgType && !watch('companyType'))
          }
          data-cy="nextCreateCompany"
        />
      </Buttons>
    </OrgDetailsContainer>
  );
};

export default OrgDetails;
