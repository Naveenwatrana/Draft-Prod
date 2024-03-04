import lang from 'common/lang';
import {
  IWhatWillYouDoValues,
} from 'pages/jobs/create/details/type';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import CardsContainer from 'components/Atoms/Jobs/CardContainer';
import AvailableSkillsIcon from 'components/Icons/availableSkills.svg';
import MissingSkillsIcon from 'components/Icons/MissingSkill.svg';
import {
  HeadText,
  Options,
  LightText,
  GridItem,
  GridItems,
  BulletPointContainer,
} from './styles';
const {
  jobs: {
    createJobSteps: {
      details: {
        whatWillYouDoPopup: {
          title,
          roleType: { label: roleTypeLabel },
          range: { cardLabel },
          workStyle: { label: workStyleLabel },
          location: { blockLabel: locationLabel },
          officeDaysPerWeekType: { label: officeDaysPerWeekTypeLabel },
          maximumDays: { blockPostFix, blockMiddleText },
        },
      },
    },
  },
} = lang;
const WhatWillYouDo = ({
  roleType,
  range,
  workStyle,
  addMore,
  maximumDays,
  minimumDays,
  location,
  matched,
}: IWhatWillYouDoValues) => {
  const renderIcons = (key: string) => (
    <>
      {matched?.includes(key) && <AvailableSkillsIcon />}
      {!!matched && !matched?.includes(key) && <MissingSkillsIcon />}
    </>
  );
  return (
    <CardsContainer>
      <HeadText>{title}</HeadText>
      <GridItems>
        <GridItem>
          <LightText>
            {renderIcons('roleType')}
            {roleTypeLabel}
          </LightText>
          <Options data-cy="role-type-value">{roleType?.label}</Options>
        </GridItem>
        <GridItem>
          {!!range?.label && (
            <>
              <LightText>
                {renderIcons('range')}
                {cardLabel}
              </LightText>
              <Options withoutBorder>
                <TextComp component="h5" data-cy="total-people-managed-value">{range?.label}</TextComp>
              </Options>

            </>
          )}
        </GridItem>
        {!!workStyle?.label && (
          <GridItem>
            <LightText>
              {renderIcons('workStyle')}
              {workStyleLabel}
            </LightText>
            <Options data-cy="work-style-value">{workStyle?.label}</Options>
          </GridItem>
        )}
        {!!location?.label && (
          <GridItem>
            <LightText>
              {renderIcons('location')}
              {locationLabel}
            </LightText>
            <Options data-cy="location-value">{location?.label}</Options>
          </GridItem>
        )}
        {!!minimumDays?.value && (
          <GridItem>
            <LightText>
              {renderIcons('maximumDays')}
              {officeDaysPerWeekTypeLabel}
            </LightText>
            <Options withoutBorder>
              <TextComp component="h5" data-cy="maximum-days-value">{`${minimumDays?.value}${maximumDays?.value ? `${blockMiddleText}${maximumDays?.value}` : ''}${blockPostFix}`}</TextComp>
            </Options>
          </GridItem>
        )}
      </GridItems>
      <Divider />
      <BulletPointContainer>
        {addMore
          ?.filter((more) => more)
          .map((requirement, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index + requirement}>
              <TextComp component="h4" data-cy={`requirement-${index}`}>{requirement}</TextComp>
            </li>
          ))}
      </BulletPointContainer>
    </CardsContainer>
  );
};
export default WhatWillYouDo;
