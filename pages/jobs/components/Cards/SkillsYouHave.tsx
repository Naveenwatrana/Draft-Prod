import { ISkillValues } from 'pages/jobs/create/details/type';
import lang from 'common/lang';
import CardsContainer from 'components/Atoms/Jobs/CardContainer';
import {
  HeadText,
  OptionContainer,
  Options,
  OptionText,
} from './styles';
const {
  jobs: {
    createJobSteps: {
      details: {
        skillPopup: { skillPopupHeading },
      },
    },
  },
} = lang;
const SkillsYouHave = ({ skillsAndTechnologiesUsed: skills }: ISkillValues) => {
  return (
    <CardsContainer>
      <HeadText>{skillPopupHeading}</HeadText>
      <OptionContainer>
        {skills?.map((skill, index) => (
          <Options key={skill.value}>
            <OptionText data-cy={`skills-you-have-${index}`}>{skill.label}</OptionText>
          </Options>
        ))}
      </OptionContainer>
    </CardsContainer>
  );
};
export default SkillsYouHave;
