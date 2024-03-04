import FlexBox from "components/Atoms/Flexbox";
import Text from "components/textComp";
import styled from "styled-components";

export const SourceSmartSection = styled(FlexBox)`
  align-items: center;
  margin: 32px auto;
  gap: 100px;
  width: fit-content;
  @media (max-width: 910px) {
    flex-direction: column;
    width: 80%;
  }
`;
export const SourceSmartSectionTitle = styled(Text)`
  font-size: 40px;
`;
export const SourceSmartSectionSubTitle = styled(Text)`
  margin-top: 20px;
`;
export const SourceSmartSectionText = styled(FlexBox)`
  flex-direction: column;
  width: 485px;
  @media (max-width: 910px) {
    width: auto;
  }
`;
export const LeadSection = styled(SourceSmartSection)`
  @media (max-width: 910px) {
    flex-direction: column-reverse;
  }
`;
export const TeamSection = styled(SourceSmartSection)`
`;
