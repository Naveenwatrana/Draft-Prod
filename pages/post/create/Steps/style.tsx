import { StyledTag } from 'components/Atoms/TagSelect/style';
import { StyledDivider } from 'components/Divider/styles';
import { StyledCard } from 'components/cards/PreviewCard/styles';
import { CustomLabel, TextArea, WordCounterWrapper } from 'components/inputComp/styles';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 68px);
  top: 66px;
  position: absolute;
  display: flex;
`;

export const Card = styled.div<{ url: string }>`
  height: 400px;
  width: 200px;
  object-fit: cover;
  background-image: url(${({ url }) => url});
  background-size: cover;
`;

export const Wrapper = styled.div`
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
  overflow-y: auto;
  background: #121112; // TODO: Add Color
`;
export const IconsContainer = styled.div`
  position: absolute;
  right: -93.5px;
  display: none;
  gap: 8px;
  flex-direction: column;
  button:first-child {
    border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
    background: ${({ theme }) => theme.palette.gray[50].value};
    color: #99e662; // TODO: color
  }
  button:last-child {
    background: rgba(226, 35, 26, 0.15);
    color: ${({ theme }) => theme.palette.red[100].value};
    backdrop-filter: blur(15px);
  }
  button {
    border-radius: 16px;
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: 500;
    line-height: 16px;
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
  }
  button > div {
    display: flex;
    gap: 8px;
  }
`;

export const PreviewCardsContainer = styled(Wrapper)`
  padding: 24px 24px 76px;
  width: 123px;
  border-right: 1px solid #282629; // TODO: Add Color
  > * {
    cursor: pointer;
  }
  ${StyledCard}, ${StyledCard} video {
    border: 0.404px solid #282629; // TODO: Add Color
    svg {
      display: none;
    }
  }

  ${StyledDivider} {
    background: #282629; // TODO: Add Color
  }
  ${StyledCard}:hover {
    position: relative;
    svg {
      display: inline;
      position: absolute;
      right: 8px;
      top: 8px;
    }
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
    width: auto;
    padding: 24px 100px 76px 24px;
    > * {
      margin: 0;
      display: flex;
      gap: 24px;
      flex-direction: column;
      width: 119px;
    }
  }
`;

export const InputsContainer = styled(Wrapper)`
  border-left: 1px solid #282629; // TODO: Add Color
  width: 434px;
  padding: 32px;
  gap: 24px;
  display: flex;
  overflow: auto;
  max-height: calc(100vh - 208px);
  ${StyledTag} {
    border-radius: 32px;
    border: 1px solid rgba(165, 241, 186, 0.4); // TODO: Add Color
    background: #a5f1ba; // TODO: Add Color
    color: #121112; // TODO: Add Color
    text-align: center;
    svg > path {
      stroke: #121112; // TODO: Add Color
    }
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: 500;
    line-height: 20px;
  }
  #tags svg {
    display: none;
  }
  @media screen and (max-width: 1023px) {
    width: auto;
    padding: 0 12px;
    ${WordCounterWrapper} {
      display: block;
    }
    padding-bottom: 86px;
  }
`;

export const InputTitle = styled.div`
  font-weight: 500;
  line-height: 22px;
`;

export const InputSubText = styled.div`
  color: #a69dab; // TODO: Add Color
  line-height: 22px;
`;

export const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-bottom: 20px;
  ${WordCounterWrapper} {
    bottom: 0;
  }
  ${CustomLabel} {
    margin-bottom: 0;
  }
`;

export const TopicsContainer = styled(CaptionContainer)`
  gap: 24px;
`;

export const CardWrapper = styled.div`
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  flex: 1;
  padding: 0 250px 34px;
  @media screen and (max-width: 768px) {
    padding-bottom: 12px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 1023px) {
    gap: 24px;
  }
  &:hover {
    ${IconsContainer} {
      display: flex;
    }
  }
`;

export const UploadMediaCard = styled(StyledCard)`
  min-width: 24vw;
  height: calc(100vh  - 200px);
`;

export const AddCardContainer = styled.div`
  display: flex;
  width: 85px;
  min-height: 163px;
  margin-top: -24px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid #39363b; // TODO: Add Color
  box-shadow: 0px 9.75px 39px 0px rgba(0, 0, 0, 0.1);
`;

export const AddCardText = styled.p`
  color: #99e662; // TODO: Add Color
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
`;

export const CaptionInput = styled(TextArea)`
  border: 1px solid #39363B; // TODO: Add Color
  background: #282629; // TODO: Add Color
  height: 123px;
  :hover {
    border: 1px solid #A69DAB; // TODO: Add Color
  }
`;

export const TopicsInput = styled(CaptionInput)`
  height: 81px;
`;

export const TagSelectDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledTooltip = styled.div`
  > .react-tooltip {
    max-width: 85px;
    z-index: 2;
    padding: 8px;
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: 500;
    text-align: center;
    @media screen and (max-width: 435px) {
      max-width: calc(100% - 96px);
    }
  }
`;
