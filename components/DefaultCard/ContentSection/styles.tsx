import TextComp from 'components/textComp';
import FollowButtonSmall from 'components/Atoms/FollowButtonSmall';
import styled from 'styled-components';
import { CardSizes } from '../types';

export const ContentContainer = styled.div<{ margin?: string }>`
  flex: 1;
  margin: ${({ margin }) => (margin ? margin : '16px')};
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${({ margin }) => (margin ? '8px' : '16px')};
  word-break: break-word;
`;
export const Secondary = styled(TextComp)`
  font-size: 1.43em;
  font-weight: 300;
  line-height: 1.4;
`;

export const Tertiary = styled(TextComp)`
  font-size: 1em;
  color: #a9abab;
`;

export const TertiaryPairTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7.8px;
  width: 100%;
`;
export const TertiaryPairFirstText = styled.div`
  font-size: 18.2px;
  font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
  color: ${({ theme }) => theme.palette.white[100].value};
  line-height: 26px;
  white-space: nowrap;
`;
export const TertiaryPairText = styled(TertiaryPairFirstText)`
  color: ${({ theme }) => theme.palette.gray[10].value};
  overflow-x: auto;
  z-index: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const JobContent = styled.div`
  gap: 20.8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const JobSalaryContent = styled.div`
  gap: 5.2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%
`;

export const JobRange = styled(TextComp)`
  font-size: 20.8px;
  line-height: 33.8px;
`;

export const JobTertiary = styled(TertiaryPairFirstText)`
  font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;;
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const JobSecondaryText = styled(TextComp)`
  font-weight: 300;
`;

export const LongTextTitle = styled(TextComp)`
  font-size: 1.43em;
  font-weight: 600;
`;

export const LongText = styled(TextComp)<{shrinkText?: boolean, primaryFontSize?: string, size?: CardSizes}>`
  font-size: ${({ size }) => (size ? getCardSizes(size).longTextFontSize : '1.43em')};
  font-weight: 300;
  line-height: 1.4;
  // font-size: 1.43em)};
`;

export const Range = styled(TextComp)`
  font-size: 1.15em;
`;

export const CompanyLogo = styled.img`
  border-radius: 12px;
  width: 78px;
  height: 78px;
`;
export const cardSizeStyles = {
  [CardSizes.MEDIUM]: {
    primaryFontSize: '14px',
    shrinkText: false,
    height: '11px',
    padding: '5px',
    borderRadius: '5px',
    fontSize: '0.7em',
    longTextFontSize: '0.9em',
  },
  [CardSizes.SMALL]: {
    primaryFontSize: '11px',
    shrinkText: false,
    height: '5px',
    padding: '3px',
    borderRadius: '3px',
    fontSize: '1em',
    longTextFontSize: '1em',
  },
};
export const getCardSizes = (size: CardSizes) => {
  return cardSizeStyles[size as keyof typeof cardSizeStyles];
};
export const FollowButton = styled(FollowButtonSmall)`
font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
  gap: 12px;
`;
