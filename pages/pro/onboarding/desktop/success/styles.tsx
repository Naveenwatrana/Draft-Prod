import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
  flex: 2;
  gap: 24px;
`;

export const ThumbsIconWrapper = styled.div`
  border-radius: 100%;
  background: radial-gradient(
    117.15% 117.14% at 62.14% -8.57%,
    ${({ theme }) => theme.palette.violet['80'].value} 0%,
    rgba(61, 63, 84, 0) 100%
  );
  padding: 20px;
`;

export const Subtitle = styled.div``;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

export const SkipButton = styled(ButtonComp)`
  color: primaryColor;
  background: none;
  margin-right: 36px;
  box-shadow: none;
`;

export const SubmitButton = styled(ButtonComp)`
  flex-grow: 2;
`;
