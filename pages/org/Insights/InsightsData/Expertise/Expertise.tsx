import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import { SkillTag } from 'pages/pro/components/WorkExperience/Experience/Content/style';
import lang from 'common/lang';
import { ExpertiseDataContainer } from './style';
import { IItechnologies } from '../types';

const {
  expertise,
} = lang.orgInsightsTab;

export type ExpertiseProps = {
  data: IItechnologies;
};
const Expertise = ({ data }: ExpertiseProps) => {
  if (!data) return null;
  return (
    <DarkGrayContainer>
      <TextComp component="h2Small">{expertise}</TextComp>
      <Divider />
      <ExpertiseDataContainer>
        {Object.keys(data).map((skill) => data[skill as keyof typeof data].map((skills) => (
          <SkillTag key={skills}>{skills}</SkillTag>
        )))}
      </ExpertiseDataContainer>
    </DarkGrayContainer>
  );
};

export default Expertise;
