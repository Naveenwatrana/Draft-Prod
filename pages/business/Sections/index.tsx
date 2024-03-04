import lang from 'common/lang';
import Image from 'next/image';
import image from './images/source-smart.png';
import leadImage from './images/lead.png';
import teamImage from './images/team.png';
import { Container } from '../style';
import {
  LeadSection,
  SourceSmartSection, SourceSmartSectionSubTitle, SourceSmartSectionText, SourceSmartSectionTitle, TeamSection,
} from './style';

const { source, lead, team } = lang.businessPage;
const Sections = () => {
  return (
    <div>
      <Container>
        <SourceSmartSection>
          <Image
            src={image.src}
            alt={image.src}
            width={image.width}
            height={image.height}
          />
          <SourceSmartSectionText>
            <SourceSmartSectionTitle>{source.title}</SourceSmartSectionTitle>
            <SourceSmartSectionSubTitle>{source.desc1}</SourceSmartSectionSubTitle>
            <SourceSmartSectionSubTitle>{source.desc2}</SourceSmartSectionSubTitle>
            <SourceSmartSectionSubTitle>{source.desc3}</SourceSmartSectionSubTitle>
          </SourceSmartSectionText>
        </SourceSmartSection>
        <LeadSection>
          <SourceSmartSectionText>
            <SourceSmartSectionTitle>{lead.title}</SourceSmartSectionTitle>
            <SourceSmartSectionSubTitle>{lead.desc1}</SourceSmartSectionSubTitle>
            <SourceSmartSectionSubTitle>{lead.desc2}</SourceSmartSectionSubTitle>
            <SourceSmartSectionSubTitle>{lead.desc3}</SourceSmartSectionSubTitle>
          </SourceSmartSectionText>
          <Image
            src={leadImage.src}
            alt={leadImage.src}
            width={leadImage.width}
            height={leadImage.height}
          />
        </LeadSection>
        <TeamSection>
          <Image
            src={teamImage.src}
            alt={teamImage.src}
            width={teamImage.width}
            height={teamImage.height}
          />
          <SourceSmartSectionText>
            <SourceSmartSectionTitle>{team.title}</SourceSmartSectionTitle>
            <SourceSmartSectionSubTitle>{team.desc1}</SourceSmartSectionSubTitle>
          </SourceSmartSectionText>
        </TeamSection>
      </Container>
    </div>
  );
};

export default Sections;
