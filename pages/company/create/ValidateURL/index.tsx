import { yupResolver } from '@hookform/resolvers/yup';
import {
  ICompanyDetailResponse,
  ICreateCompanyFormValues,
} from 'pages/company/types';
import { useForm } from 'react-hook-form';
import { FormEvent, useEffect, useState } from 'react';
import { useCheckCompanyMutation } from 'pages/company/companyService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import lang from 'common/lang';
import InputComp from 'components/inputComp';
import Button from 'components/buttonComp';
import { InputType } from 'components/input/types';
import LodingCompany from 'components/Icons/LodingCompany';
import {
  CreateCompanyContainer,
  CompanyBody,
  LoadingCompany,
  CompanyDetailContainer,
  LoadingText,
  CompanyLogo,
  CompanyQuestion,
  CompanySubDesc,
  CompanyButtonGroup,
  CompanyButtonWrapper,
  Buttons,
  WordCounterWrapper,
} from 'pages/company/create/styles';
import FormToast from 'components/FormToast';
import WordCounter from 'components/WordCounter/WordCounter';
import { useRouter } from 'next/router';
import useDebounce from 'common/hooks/useDebounce';
import { schema } from '../schema';

type ValidateURLProps = {
  onNext: () => void;
  url: string;
  onUrlChange: React.Dispatch<React.SetStateAction<string>>;
}

const {
  company,
  buttonText: { next, cancel },
} = lang;
const {
  button,
  submittingProfile: { header, body },
  companyNotFound,
} = company;

const ValidateURL = ({ onNext, onUrlChange, url }: ValidateURLProps) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ICreateCompanyFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const router = useRouter();
  const urlValue = getValues('companyUrl');

  const [showCompany, setShowCompany] = useState<ICompanyDetailResponse | null>();
  const [checkCompany, result] = useCheckCompanyMutation();

  const companyURLWatch = watch('companyUrl', '');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setShowCompany(null);
  }, [companyURLWatch]);

  const debouncedValue = useDebounce(urlValue, 1000);

  useEffect(() => {
    setButtonDisabled(true);
  }, [urlValue]);

  const checkExistingCompany = () => {
    checkCompany(debouncedValue)
      .unwrap()
      .then((response) => {
        if (response?.message !== companyNotFound) {
          setShowCompany(response.data?.[0]);
        }
        setButtonDisabled(response?.message !== companyNotFound);
      })
      .catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };

  useEffect(() => {
    if (debouncedValue && !errors?.companyUrl) {
      checkExistingCompany();
    }
  }, [debouncedValue, errors?.companyUrl]);

  const handleNext = () => {
    onUrlChange(urlValue);
    onNext();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!buttonDisabled) handleNext();
  };

  return (
    <CreateCompanyContainer onSubmit={handleSubmit}>
      <CompanyBody>
        <FormToast header={header} body={body} />
        <InputComp
          defaultValue={url}
          type={InputType.TEXT}
          labelText={company.companyUrl}
          id="companyUrl"
          value={urlValue}
          placeholder={company.companyUrlPlaceholder}
          register={() => register('companyUrl', {
            setValueAs: (v) => v.replaceAll(' ', ''),
          })}
          data-cy="addCompanyURL"
          error={urlValue ? errors?.companyUrl : undefined}
        />
        {!(urlValue && errors?.companyUrl) && (
          <WordCounterWrapper>
            <WordCounter total={100} count={urlValue?.length} />
          </WordCounterWrapper>
        )}

        <CompanyDetailContainer>
          {result.isLoading && (
            <>
              <LoadingCompany>
                <LodingCompany />
              </LoadingCompany>
              <LoadingText>{company.checking}</LoadingText>
            </>
          )}
          {showCompany && (
            <>
              <CompanyLogo src={showCompany?.logo} />
              <CompanyQuestion>{company.isThisYourCompany}</CompanyQuestion>
              <CompanySubDesc>{company.existProfile}</CompanySubDesc>
              <CompanySubDesc>{`${company.companyEditText}`}</CompanySubDesc>
              <CompanyButtonGroup>
                <CompanyButtonWrapper>
                  <Button
                    primary
                    variant="link"
                    label={button.viewProfile}
                    data-cy="viewCompanyProfile"
                  />
                </CompanyButtonWrapper>
              </CompanyButtonGroup>
            </>
          )}
        </CompanyDetailContainer>
      </CompanyBody>

      <Buttons>
        <Button
          label={cancel}
          primary
          variant="link"
          onClick={router.back}
          data-cy="cancelCreateCompany"
        />
        <Button
          label={next}
          primary
          fullWidth
          disabled={buttonDisabled}
          onClick={handleNext}
          data-cy="nextCreateCompany"
        />
      </Buttons>
    </CreateCompanyContainer>
  );
};

export default ValidateURL;
