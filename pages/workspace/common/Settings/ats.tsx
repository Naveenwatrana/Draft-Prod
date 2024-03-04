import lang from 'common/lang';
import TextComp from 'components/textComp';
import React, { useEffect, useState } from 'react';
import { StyledDivider } from 'components/Divider/styles';
import { TextInput } from 'pages/link/create/component/step1/style';
import { InputType } from 'components/input/types';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import {
  Accordian, AccordianBlock, AccordianContainer, AccordianHeader, AccordianPoint, AtsContainer, BlockElement, BlockElementHeader,
  CopyText,
  ErrorText,
  FlexRow,
  HeaderContainer, SettingCard, SettingCardHeader, SettingErrorButton, SettingPrimaryButton, SettingText, StepsContainer, SuccessBedge,
} from './styles';
import { GREENHOUSE_STATE } from './type';
import {
  useAddGreenHouseHarvestKeyMutation, useGetGreenHouseSecreatMutation, useGetGreenHouseStatusQuery, useResetGreenHouseMutation, useGetGreenHouseStatusDataMutation,
} from './settingsService';
const {
  workspace: {
    settings: {
      greenHouse, getStarted, atsIntegration, greenHouseIntro, apiIntro, createHarvestAPIKey, createWebHook, harvestStepOneLink, harvestStepOne,
      harvestStepTwo1, harvestStepTwo2, harvestStepTwo3, harvestStepThree, apiType, harvest, partner, unlistedVendor, description, theDraft,
      harvestStepFour1, harvestStepFour2, harvestStepFour3, harvestStepFive, pasteKey, harvestStepSix, harvestStepSeven1, harvestStepSeven2,
      harvestStepSeven3, harvestStepSeven4, harvestStepEight1, harvestStepEight2, harvestStepEight3, continueStep, webhookStepOne, webhookStepTwo,
      webhookName, draftWebhook, when, jobPostUpdated, endPointURL, secretKey, webhookStepThree1, webhookStepThree2, webhookStepThree3, done,
      wrongKey, harvestSuccess, greenhouseResetIntro, reset, connected, apiKeyRequired, webhookConfirmationError, webhookStepOneLink,
    },
  },
} = lang;

export const ATS = () => {
  const [currentStep, setCurrentStep] = useState(GREENHOUSE_STATE.one);
  const [currentConfig, setCurrentConfig] = useState(1);
  const [harvestKey, setHarvestKey] = useState('');
  const [harvestKeyError, setHarvestKeyError] = useState<string[]>([]);
  const [webhookError, setWebHookError] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [secret, setSecret] = useState('');
  const currentCompany = useAppSelector(selectCurrentCompany);

  const [addGreenHouseHarvestKey, addGreenHouseHarvestKeyResult] = useAddGreenHouseHarvestKeyMutation();
  const [resetApi, resetApiResponse] = useResetGreenHouseMutation();
  const [greenHouseStatus, greenHouseStatusResponse] = useGetGreenHouseStatusDataMutation();

  const [generateSecreat, generateSecreatApiResponse] = useGetGreenHouseSecreatMutation(currentCompany?.id);
  const { data: status, isLoading: statusLoading } = useGetGreenHouseStatusQuery(currentCompany?.id);

  useEffect(() => {
    if (addGreenHouseHarvestKeyResult.isError) {
      setHarvestKeyError([wrongKey]);
    } else if (addGreenHouseHarvestKeyResult.isSuccess) {
      showNotification(harvestSuccess, NotificationType.SUCCESS);
    }
  }, [addGreenHouseHarvestKeyResult]);

  useEffect(() => {
    setHarvestKeyError([]);
  }, [harvestKey]);

  useEffect(() => {
    if (status?.data.harvest_integration && status?.data.web_hook_config) {
      setCurrentStep(GREENHOUSE_STATE.three);
    }
  }, [status]);

  const resetGreenhouseSettings = async () => {
    await resetApi(currentCompany.id);
    setCurrentStep(GREENHOUSE_STATE.one);
  };

  const addHarvestAPIKey = async () => {
    if (harvestKey === '') {
      setHarvestKeyError([apiKeyRequired]);
      return false;
    }
    await addGreenHouseHarvestKey({
      api_type: 'Harvest API',
      partner: 'Draft-Sandbox',
      description: 'Integration',
      company_id: currentCompany.id,
      api_key: harvestKey,
    }).unwrap();
    generateSecreat(currentCompany.id).then((res: any) => {
      if (res?.data?.data) {
        setUrl(res?.data?.data?.url);
        setSecret(res?.data?.data?.secret_key);
        setHarvestKeyError([]);
        setCurrentConfig(2);
      }
    });
  };

  const webhookUpdate = async () => {
    greenHouseStatus(currentCompany.id).then((res: any) => {
      if (res.data?.data && res.data?.data?.web_hook_config) {
        setCurrentStep(GREENHOUSE_STATE.three);
      } else {
        setWebHookError([webhookConfirmationError]);
      }
    });
  };

  const copyText = (element: string, text: string) => {
    navigator.clipboard.writeText(text);
    showNotification(`${element} Copied`, NotificationType.SUCCESS);
  };

  return (
    <AtsContainer>
      <HeaderContainer>
        {!statusLoading && <TextComp component="h3">{atsIntegration}</TextComp>}
        {currentStep === GREENHOUSE_STATE.one && !statusLoading && (
          <SettingCard>
            <SettingCardHeader>
              {greenHouse}
            </SettingCardHeader>
            <SettingText>
              {greenHouseIntro}
            </SettingText>
            <SettingPrimaryButton onClick={() => { setCurrentStep(GREENHOUSE_STATE.two); }}>{getStarted}</SettingPrimaryButton>
          </SettingCard>
        )}
        {currentStep === GREENHOUSE_STATE.two && (
          <>
            <SettingText>
              {apiIntro}
            </SettingText>
            <AccordianContainer>
              <Accordian>
                <StepsContainer>
                  <AccordianHeader onClick={() => { setCurrentConfig(1); }} active={currentConfig === 1}>
                    <span>1</span>
                    <span>{createHarvestAPIKey}</span>
                  </AccordianHeader>
                  {currentConfig === 1 && (
                    <>
                      <StyledDivider />
                      <AccordianPoint>
                        {'1. '}
                        <a href={harvestStepOneLink} target="_blank">{harvestStepOne}</a>
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepTwo1}
                        <b>{harvestStepTwo2}</b>
                        {harvestStepTwo3}
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepThree}
                      </AccordianPoint>
                      <AccordianBlock>
                        <BlockElement>
                          <BlockElementHeader>{apiType}</BlockElementHeader>
                          {harvest}
                        </BlockElement>
                        <BlockElement>
                          <BlockElementHeader>{partner}</BlockElementHeader>
                          {unlistedVendor}
                        </BlockElement>
                        <FlexRow>
                          <BlockElement>
                            <BlockElementHeader>{description}</BlockElementHeader>
                            {theDraft}
                          </BlockElement>
                          <CopyText onClick={() => copyText(description, theDraft)}>Copy</CopyText>
                        </FlexRow>
                      </AccordianBlock>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepFour1}
                        <b>{harvestStepFour2}</b>
                        {harvestStepFour3}
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepFive}
                      </AccordianPoint>
                      <TextInput value={harvestKey} onChange={(val) => setHarvestKey(val.target.value)} type={InputType.TEXT} id="1" placeholder={pasteKey} error={harvestKeyError.length > 0} />
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepSix}
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepSeven1}
                        <b>{harvestStepSeven2}</b>
                        {harvestStepSeven3}
                        <b>{harvestStepSeven4}</b>
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {harvestStepEight1}
                        <b>{harvestStepEight2}</b>
                        {harvestStepEight3}
                      </AccordianPoint>
                      <StyledDivider />
                      {harvestKeyError.length > 0 && (
                        <ErrorText>
                          {harvestKeyError.toString()}
                        </ErrorText>
                      )}
                      <SettingPrimaryButton onClick={addHarvestAPIKey}>{continueStep}</SettingPrimaryButton>
                    </>
                  )}
                </StepsContainer>
              </Accordian>
              <Accordian>
                <StepsContainer>
                  <AccordianHeader active={currentConfig === 2}>
                    <span>2</span>
                    <span>{createWebHook}</span>
                  </AccordianHeader>
                  {currentConfig === 2 && (
                    <>
                      <StyledDivider />
                      <AccordianPoint>
                        {'1. '}
                        <a href={webhookStepOneLink} target="_blank">{webhookStepOne}</a>
                      </AccordianPoint>
                      <StyledDivider />
                      <AccordianPoint>
                        {webhookStepTwo}
                      </AccordianPoint>
                      <AccordianBlock>
                        <FlexRow>
                          <BlockElement>
                            <BlockElementHeader>{webhookName}</BlockElementHeader>
                            {draftWebhook}
                          </BlockElement>
                          <CopyText onClick={() => copyText(webhookName, draftWebhook)}>Copy</CopyText>
                        </FlexRow>
                        <BlockElement>
                          <BlockElementHeader>{when}</BlockElementHeader>
                          {jobPostUpdated}
                        </BlockElement>
                        <FlexRow>
                          <BlockElement>
                            <BlockElementHeader>{endPointURL}</BlockElementHeader>
                            {url}
                          </BlockElement>
                          <CopyText onClick={() => copyText(endPointURL, url)}>Copy</CopyText>
                        </FlexRow>
                        <FlexRow>
                          <BlockElement>
                            <BlockElementHeader>{secretKey}</BlockElementHeader>
                            {secret}
                          </BlockElement>
                          <CopyText onClick={() => copyText(secretKey, secret)}>Copy</CopyText>
                        </FlexRow>
                      </AccordianBlock>
                      <StyledDivider />
                      <AccordianPoint>
                        {webhookStepThree1}
                        <b>{webhookStepThree2}</b>
                        {webhookStepThree3}
                      </AccordianPoint>
                      <StyledDivider />
                      {webhookError.length > 0 && (
                        <ErrorText>
                          {webhookError.toString()}
                        </ErrorText>
                      )}
                      <SettingPrimaryButton onClick={webhookUpdate}>{done}</SettingPrimaryButton>
                    </>
                  )}
                </StepsContainer>
              </Accordian>
            </AccordianContainer>
          </>
        )}
        {currentStep === GREENHOUSE_STATE.three && (
          <SettingCard>
            <SettingCardHeader>
              {greenHouse}
              <SuccessBedge>{connected}</SuccessBedge>
            </SettingCardHeader>
            <SettingText>
              {greenhouseResetIntro}
            </SettingText>
            <SettingErrorButton onClick={resetGreenhouseSettings}>{reset}</SettingErrorButton>
          </SettingCard>
        )}
      </HeaderContainer>
    </AtsContainer>
  );
};
