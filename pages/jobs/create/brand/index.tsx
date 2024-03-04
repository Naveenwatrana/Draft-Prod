import React, { useState } from 'react';
import FlexBox from 'components/Atoms/Flexbox';
import lang from 'common/lang';
import useProfileDeck from 'common/hooks/useProfileDeck';
import Loader from 'components/Loader/Loader';
import ButtonComp from 'components/buttonComp';
import useHoverFocus from 'common/hooks/useHoverFocus';
import { useJobDetailQuery } from 'pages/jobs/jobsService';
import { useNavigate } from 'common/utils/router-fill';
import { jobDetailsUrl } from 'common/utils/network/appRouts';
import AddJobCard from 'pages/jobs/components/Cards/AddJobCard';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import Background from './Background';
import {
  SkipButton,
  Buttons,
  ShadowedCardsContainer,
} from './style';
import { BrandProps } from './type';
const {
  buttonText: { skip: skipThisStep, done },
} = lang;

const Brand = ({ coverCardData }: BrandProps) => {
  const navigate = useNavigate();
  const { loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.JOB);
  const [skip, setSkip] = useState(!!coverCardData.id);
  const { data: jobDetailsData, isLoading: isJobDataLoading, isFetching } = useJobDetailQuery(coverCardData.id, {
    skip,
  });
  const handleNext = () => {
    navigate(jobDetailsUrl(coverCardData.id));
    loadFreshCards();
  };
  const { manageFocus, focused } = useHoverFocus();
  return (
    <FlexBox>
      {(isJobDataLoading || isFetching) && <Loader />}
      <Background focused={focused} />
      <ShadowedCardsContainer>
        <AddJobCard
          coverCardData={coverCardData}
          centered
          editable
          onSave={() => setSkip(false)}
          jobDetailsData={jobDetailsData?.data}
          {...manageFocus}
        />
      </ShadowedCardsContainer>
      <Buttons>
        {!jobDetailsData?.data?.cards?.length && (
          <SkipButton
            label={skipThisStep}
            primary
            variant="link"
            onClick={handleNext}
            data-cy="skipThisStep"
          />
        )}
        <ButtonComp
          label={done}
          onClick={handleNext}
          primary
          fullWidth
          disabled={!jobDetailsData?.data?.cards?.length}
          data-cy="done"
        />
      </Buttons>
    </FlexBox>
  );
};

export default Brand;
