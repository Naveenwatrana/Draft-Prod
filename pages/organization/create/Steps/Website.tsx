import TextComp from 'components/textComp';
import lang from 'common/lang';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { WordCounterWrapper } from 'components/inputComp/styles';
import WordCounter from 'components/WordCounter/WordCounter';
import { useCheckCompanyMutation } from 'pages/company/companyService';
import useDebounce from 'common/hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { ICompanyDetailResponse } from 'pages/company/types';
import {
  LoadingCompany, LoadingText,
} from 'pages/company/create/styles';
import LoadingCompanyLogo from 'components/Icons/LodingCompany';
import { useRouter } from 'next/router';
import { useNavigate } from 'common/utils/router-fill';
import { Buttons } from '../style';
import { companyOrgType } from '../const';
import { IOrganizationValues, WebsiteProps, websiteDetailsSchema } from '../types';
import {
  OrganizationFoundBlock,
  DescriptionText,
  Header,
  InputWithWordCount,
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
      websiteDetails,
      websiteDetailsSubtitleOne,
      websiteDetailsSubtitleTwo,
      orgDetailForm: {
        websiteURL,
      },
      foundMessageSubTitle,
      foundMessageTitle,
      viewTheProfile,
    },
  },
  company: {
    companyNotFound,
  },
  company,
  buttonText: { next, cancel },
} = lang;

const Website = ({ onNext, orgData }: WebsiteProps) => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    getValues,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm<IOrganizationValues>({
    resolver: yupResolver(websiteDetailsSchema),
    mode: 'onChange',
  });
  const [checkCompany, result] = useCheckCompanyMutation();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showCompany, setShowCompany] = useState<ICompanyDetailResponse | null>();
  const urlValue = getValues('organizationURL');
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
    checkCompany(debouncedValue)
      .unwrap()
      .then((response) => {
        if (response?.message !== companyNotFound) {
          setShowCompany(response.data?.[0]);
        }
        setButtonDisabled(response?.message !== companyNotFound);
      }).catch((err) => {
        setError('organizationURL', { message: err.data.message });
      });
  }, [checkCompany, debouncedValue]);

  useEffect(() => {
    if (debouncedValue && !errors?.organizationURL) {
      checkExistingCompany();
    }
  }, [checkExistingCompany, debouncedValue]);
  useEffect(() => {
    setShowCompany(null);
  }, [watch('organizationURL')]);
  const onSubmit = () => {
    if (orgData) {
      reset((formValues) => ({
        ...formValues,
        ...orgData,
      }));
    }
    onNext(watch());
  };
  return (
    <OrgDetailsContainer>
      <Header>
        <TextComp component="h2">{websiteDetails}</TextComp>
        <DescriptionText>{websiteDetailsSubtitleOne}</DescriptionText>
        <DescriptionText>{websiteDetailsSubtitleTwo}</DescriptionText>
        <InputWithWordCount>
          <InputComp
            // TODO: add defaultValue={url}
            type={InputType.TEXT}
            id="organizationURL"
            value={watch('organizationURL')}
            placeholder={websiteURL.placeholder}
            labelText={websiteURL.label}
            register={() => register('organizationURL', {
              setValueAs: (v) => v.replaceAll(' ', '').slice(0, 100),
            })}
            data-cy="organizationURL"
            error={
              watch('organizationURL') ? errors?.organizationURL : undefined
            }
          />
          {!(watch('organizationURL') && errors?.organizationURL) && (
            <WordCounterWrapper>
              <WordCounter
                total={100}
                count={watch('organizationURL')?.length}
              />
            </WordCounterWrapper>
          )}
        </InputWithWordCount>
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

export default Website;
