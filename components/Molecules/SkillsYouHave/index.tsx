import TextComp from 'components/textComp';
import MissingSkillsIcon from 'components/Icons/MissingSkill.svg';
import AvailableSkillsIcon from 'components/Icons/availableSkills.svg';
import { SkillTag } from 'components/Atoms/SkillTag/styles';
import { ITag } from 'pages/jobs/details/types';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import { useMemo } from 'react';
import CardsContainer from 'components/Atoms/Jobs/CardContainer';
import {
  Content, Skills, SkillsContainer,
} from './styles';

const { skillsBlock } = lang.jobs;

export type SkillsYouHaveProps = {
  isOrgProfile: boolean;
  skillMatched: ITag[];
  skillNotMatched: string[];
};

const SkillsYouHave = ({
  isOrgProfile,
  skillMatched = [],
  skillNotMatched = [],
}: SkillsYouHaveProps) => {
  const skills = useMemo(
    () => [...skillMatched.map((matched) => matched.tag), ...skillNotMatched],
    [skillMatched, skillNotMatched],
  );
  return (
    <CardsContainer>
      <Content>
        <TextComp component="h2Small">{skillsBlock.skillsYouHave}</TextComp>
        {isOrgProfile && skills.length > 0 && (
          <Skills>
            {skills.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </Skills>
        )}
        {!isOrgProfile && (
          <>
            <SkillsContainer>
              <Skills>
                <AvailableSkillsIcon />
                <TextComp component="paragraph">
                  {skillsBlock.onYourResume}
                </TextComp>
              </Skills>
              {skillMatched.length > 0 && (
                <Skills>
                  {skillMatched.map((skill) => (
                    <SkillTag key={skill.id} selected>
                      {skill.tag}
                    </SkillTag>
                  ))}
                </Skills>
              )}
              {skillMatched.length < 1 && (
                <TextComp component="h4">{skillsBlock.noMatchingSkills}</TextComp>
              )}
            </SkillsContainer>
            <Divider />
            <SkillsContainer>
              <Skills>
                <MissingSkillsIcon />
                <TextComp component="paragraph">
                  {skillsBlock.missingFromYourResume}
                </TextComp>
              </Skills>
              {skillNotMatched.length > 0 && (
                <Skills>
                  {skillNotMatched.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </Skills>
              )}
            </SkillsContainer>
          </>
        )}
      </Content>
    </CardsContainer>
  );
};
export default SkillsYouHave;
