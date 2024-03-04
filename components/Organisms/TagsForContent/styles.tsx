import TextComp from 'components/textComp';
import styled from 'styled-components';

export const SubtitleText = styled(TextComp)`
  margin-top: 24px;
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const ConditionText = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[60].value};
`;

export const TextContainer = styled(TextComp)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  .basic-multi-select {
    width: 508px;
  }
  .select__menu-list {
    max-height: 200px;
  }
  @media screen and (max-width: 450px) {
    .basic-multi-select {
      max-width: 350px;
      align-self: center;
    }
  } 
  @media screen and (max-width: 376px) {
    .basic-multi-select {
      max-width: 325px;
    }
  } 

`;
