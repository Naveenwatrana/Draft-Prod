/* eslint-disable react/jsx-no-useless-fragment */
import lang from 'common/lang';
import { IWhoYouAreValues } from 'pages/jobs/create/details/type';
import TextComp from 'components/textComp';
import { formatNumberToCurrency } from 'common/utils/helpers';
import AvailableSkillsIcon from 'components/Icons/availableSkills.svg';
import CardsContainer from 'components/Atoms/Jobs/CardContainer';
import MissingSkillsIcon from 'components/Icons/MissingSkill.svg';
import Divider from 'components/Divider/Divider';
import {
  HeadText,
  OptionContainer,
  Options,
  OptionText,
  LightText,
  GridItem,
  GridItems,
  BulletPointContainer,
} from './style';
const {
  jobs: {
    createJobSteps: {
      details: {
        whoYouArePopup: {
          heading,
          basicSalary,
          employmentTypeLabel,
          card: { language, ote },
        },
      },
    },
  },
} = lang;
const WhoYouAre = ({
  salaryFrom,
  salaryTo,
  oteFrom,
  oteTo,
  employmentType,
  languages,
  requirements,
  matched,
  languageMatched,
}: IWhoYouAreValues) => {
  const renderIcons = (key: string) => (
    <>
      {matched?.includes(key) && <AvailableSkillsIcon />}
      {!!matched && !matched?.includes(key) && <MissingSkillsIcon />}
    </>
  );
  return (
    <CardsContainer>
      <HeadText>{heading}</HeadText>
      <GridItems>
        <GridItem>
          <LightText>
            {renderIcons('salaryFrom')}
            {basicSalary}
          </LightText>
          <Options withoutBorder>
            <TextComp component="h5" data-cy="salary-value">
              {`${formatNumberToCurrency(salaryFrom)}${salaryTo ? ` - ${formatNumberToCurrency(salaryTo)}` : ''}`}
            </TextComp>
          </Options>
        </GridItem>
        {!!oteFrom && (
          <GridItem>
            <LightText>
              {renderIcons('oteFrom')}
              {ote}
            </LightText>
            <Options withoutBorder>
              <TextComp component="h5" data-cy="ote-value">
                {`${formatNumberToCurrency(oteFrom)}${oteTo ? ` - ${formatNumberToCurrency(oteTo)}` : ''}`}
              </TextComp>
            </Options>
          </GridItem>
        )}
        {!!employmentType && (
          <GridItem>
            <LightText>
              {renderIcons('employmentType')}
              {employmentTypeLabel}
            </LightText>
            <Options><TextComp component="h5" data-cy="employment-type-value">{employmentType.label}</TextComp></Options>
          </GridItem>
        )}
        {!!languages?.length && (
          <GridItem fullWidth={languages?.length > 3}>
            <LightText>
              {languages?.some((languageToMatch) => languageMatched?.includes(languageToMatch.label)) && <AvailableSkillsIcon />}
              {!!languageMatched?.length && !languages?.some((languageToMatch) => languageMatched?.includes(languageToMatch.label)) && <MissingSkillsIcon />}
              {language}
            </LightText>
            <OptionContainer>
              {languages?.map((languageToRender, index) => (
                <Options key={languageToRender.value} contained={languageMatched?.includes(languageToRender.label)}>
                  <OptionText data-cy={`language-${index}`}>{languageToRender.label}</OptionText>
                </Options>
              ))}
            </OptionContainer>
          </GridItem>
        )}
      </GridItems>
      <Divider />
      <BulletPointContainer>
        {requirements?.filter((requirement) => requirement).map((requirement, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index + requirement} data-cy={`requirement-${index}`}>
            <TextComp component="h4">{requirement}</TextComp>
          </li>
        ))}
      </BulletPointContainer>
    </CardsContainer>
  );
};
export default WhoYouAre;
