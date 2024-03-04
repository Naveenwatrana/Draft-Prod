import { joinInUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import { theme } from 'common/theme';
import CheckIcon from 'components/Icons/CheckIcon';
import { Container } from '../style';
import {
  CTA, CTATitle, FeaturesSection, Title, CTAButton, FeatureText, FeatureListItem, Features,
} from './style';
import { features } from './data';

const { draftVsOther } = lang.businessPage;
const {
  title, ctaTitle, ctaTitle2, ctaButtonText,
} = draftVsOther;
const DraftFeatures = () => {
  return (
    <FeaturesSection>
      <Container>
        <Title component="h2">{title}</Title>
        <Features>
          {features.map((feature) => (
            <FeatureListItem key={feature.id}>
              <CheckIcon size={16} color={theme.palette.green[100].value} />
              <FeatureText component="h5">{feature.title}</FeatureText>
            </FeatureListItem>
          ))}
        </Features>
        <CTA>
          <CTATitle component="h5">{ctaTitle}</CTATitle>
          <CTATitle component="h5">{ctaTitle2}</CTATitle>
          <CTAButton href={joinInUrl}>{ctaButtonText}</CTAButton>
        </CTA>
      </Container>
    </FeaturesSection>
  );
};

export default DraftFeatures;
