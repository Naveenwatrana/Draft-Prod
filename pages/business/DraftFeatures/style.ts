import Text from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';
import FlexBox from 'components/Atoms/Flexbox';

export const FeaturesSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #111111;
  padding: 100px 0;
`;
export const Title = styled(Text)`
  font-size: 40px;
  width: 100%;
  text-align: center;
  @media (max-width: 910px) {
    font-size: 32px;
  }
`;
export const CTATitle = styled(Text)`
  font-size: 24px;
  text-align: center;
`;
export const CTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CTAButton = styled(Link)`
  background-color: ${({ theme }) => theme.palette.green[80].value};
  color: ${({ theme }) => theme.palette.gray[60].value};
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
`;
export const FeatureText = styled(Text)`
  font-size: 16px;
`;
export const FeatureListItem = styled(FlexBox)`
  gap: 24px;
  border-bottom: 1px solid #39363B;
  align-items: center;
  padding: 13px 0;
`;
export const Features = styled(FlexBox)`
  width: 682px;
  margin: 62px auto;
  flex-direction: column;
  @media (max-width: 910px) {
    width: auto;
    padding: 0 40px;
  }
`;
