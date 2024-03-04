import { InfoBlock } from 'components/Atoms/InfoBlock';
import lang from 'common/lang';
import { ContentProps } from '../../type';
import {
  Description,
  InfoContainer, RoleDescription, SkillTag, SkillsContainer,
} from './style';

const {
  profile: {
    block: {
      workExperience: { form },
    },
  },
} = lang;

const Content = ({
  employmentType,
  locationType,
  roleType,
  peopleManaged,
  roleDescription,
  skillsAndTechnologiesUsed,
  benefits,
}: ContentProps) => {
  return (
    <>
      <InfoContainer>
        <InfoBlock title={form.employmentType.label} info={employmentType} />
        <InfoBlock title={form.locationType.labelBlock} info={locationType} />
        <InfoBlock title={form.roleType.label} info={roleType} />
        <InfoBlock title={form.totalPeopleManaged.label} info={peopleManaged} />
      </InfoContainer>
      {roleDescription
      && (
        <RoleDescription>
          {roleDescription}
        </RoleDescription>
      )}
      {!!skillsAndTechnologiesUsed?.length
      && (
        <SkillsContainer>
          {skillsAndTechnologiesUsed.map((skill) => <SkillTag selected={skill.selected} key={`${skill.value}skillsAndTechnologies`}>{skill.label}</SkillTag>)}
        </SkillsContainer>
      )}
      {!!benefits && <Description>{benefits}</Description>}
    </>
  );
};

export default Content;
