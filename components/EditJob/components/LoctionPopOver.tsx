import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';

import { MyOptionType } from 'components/Select/types';
import SelectInput from 'components/Select/Select';
import { JobDetailData } from 'pages/jobs/details/types';
import { minimumOfficeDaysPerWeekOptions, officeDaysPerWeekOptions, regionsOptions } from 'pages/jobs/create/details/const';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import { DaysContainer } from 'pages/jobs/create/details/style';
import { locationTypeOptions } from 'pages/pro/components/WorkExperience/const';
import {
  Buttons,
  FormElement,
  FormElementHeading,
  ModalContent,
  ModalContentHeader,
  ModalText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { details: { whatWillYouDoPopup } },
    salaryRangeInvalid,
  },
} = lang;

type LocationPopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const LocationPopOver = ({ onBack, jobData } : LocationPopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const disabledButton = !jobDetail.locationType || jobDetail.locationType === '' || !jobDetail.location || (jobDetail.locationType === 'Hybrid' && !jobDetail.officeDaysPerWeekType) || (jobDetail.officeDaysPerWeekType?.value === 'Set office days per week' && (!jobDetail.minimumDays)) || ((jobDetail.officeDaysPerWeekType?.value === 'Set office days per week' && !!jobDetail.maximumDays && !!jobDetail.maximumDays?.value) && ((jobDetail.minimumDays?.value || 0) >= (jobDetail.maximumDays?.value || 0)));

  const handleWorkStyleChange = (selected: MyOptionType | null) => {
    let jd = { ...jobDetail };
    if (jobDetail.locationType === 'Remote' || selected?.label === 'Remote') {
      jd.location = null;
    }
    if (selected?.label !== 'Hybrid') {
      jd = {
        ...jd, minimumDays: null, maximumDays: null, officeDaysPerWeekType: null,
      };
    }
    setJobDetail({ ...jd, locationType: selected?.label || '' });
  };

  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack()}>
          <ChevronLeft />
        </IconWrapper>
        Location
      </ModalContentHeader>
      <FormElement>
        <FormElementHeading>
          Work style
        </FormElementHeading>
        <SelectInput
          options={locationTypeOptions}
          id="workStyle"
          placeHolder={whatWillYouDoPopup.workStyle.placeholder}
          value={jobDetail.locationType}
          data-cy="workStyle"
          onChange={handleWorkStyleChange}
        />
      </FormElement>
      {jobDetail.locationType === 'Remote' ? (
        <FormElement>
          <FormElementHeading>
            {whatWillYouDoPopup.regions.label}
          </FormElementHeading>
          <ModalText>
            {whatWillYouDoPopup.regions.subLabel}
          </ModalText>
          <SelectInput
            options={regionsOptions as unknown as MyOptionType[]}
            id="regions"
            defaultValue={jobDetail.location}
            placeHolder={whatWillYouDoPopup.regions.placeholder}
            value={jobDetail.location?.label}
            data-cy="regions"
            onChange={(selected: MyOptionType | null) => setJobDetail({ ...jobDetail, location: selected })}
          />
        </FormElement>
      ) : (
        <>
          <FormElement>
            <FormElementHeading>
              {whatWillYouDoPopup.location.label}
            </FormElementHeading>
            <LocationAutoComplete
              onChange={(selected: MyOptionType | null) => setJobDetail({ ...jobDetail, location: selected })}
              placeholder={whatWillYouDoPopup.location.placeholder}
              label=""
              value={jobDetail.location}
            />
          </FormElement>
          {jobDetail.locationType !== 'On-site' && (
            <FormElement>
              <FormElement>
                <FormElementHeading>
                  {whatWillYouDoPopup.officeDaysPerWeekType.label}
                </FormElementHeading>
                <ModalText>
                  {whatWillYouDoPopup.officeDaysPerWeekType.subLabel}
                </ModalText>
                {/* {jobDetail?.officeDaysPerWeekType} */}
                <SelectInput
                  options={officeDaysPerWeekOptions}
                  id="officeDaysPerWeekType"
                  placeHolder={whatWillYouDoPopup.officeDaysPerWeekType.placeholder}
                  value={jobDetail.officeDaysPerWeekType?.label || ''}
                  data-cy="officeDaysPerWeekType"
                  onChange={(selected: MyOptionType | null) => setJobDetail({
                    ...jobDetail, officeDaysPerWeekType: selected, minimumDays: null, maximumDays: null,
                  })}
                />
              </FormElement>
              {jobDetail.officeDaysPerWeekType?.value === 'Set office days per week' && (
                <DaysContainer>
                  <SelectInput
                    options={minimumOfficeDaysPerWeekOptions}
                    labelText=""
                    id="minimumDays"
                    placeHolder={whatWillYouDoPopup.minimumDays.placeholder}
                    value={jobDetail.minimumDays?.value}
                    data-cy="minimumDays"
                    onChange={(selected: MyOptionType | null) => setJobDetail({ ...jobDetail, minimumDays: selected })}
                  />
                  <SelectInput
                    options={minimumOfficeDaysPerWeekOptions}
                    labelText=""
                    id="maximumDays"
                    placeHolder={whatWillYouDoPopup.maximumDays.placeholder}
                    value={jobDetail.maximumDays?.value}
                    data-cy="maximumDays"
                    onChange={(selected: MyOptionType | null) => setJobDetail({ ...jobDetail, maximumDays: selected })}
                    error={jobDetail.minimumDays?.value && jobDetail.maximumDays?.value && ((jobDetail.minimumDays?.value || 0) >= (jobDetail.maximumDays?.value || 0)) ? { message: salaryRangeInvalid, type: 'error' } : undefined}
                  />
                </DaysContainer>
              )}
            </FormElement>
          )}
        </>
      )}
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={() => onBack()}
        />
        <PublishButton disabled={disabledButton} primary={true} label="Confirm" onClick={() => onBack(jobDetail)} />
      </Buttons>
    </ModalContent>
  );
};

export default LocationPopOver;
