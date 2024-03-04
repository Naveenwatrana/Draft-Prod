import { GridItemProps, OptionsProps } from 'pages/jobs/components/Cards/type';
import styled from 'styled-components';

export const HeadText = styled.h2`
  color: ${(props) => props.theme.palette.white['100'].value};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  line-height: 28px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Options = styled.div<OptionsProps>`
  display: flex;
  min-height: 28px;
  padding: 4px 12px;
  justify-content: start;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  max-width: max-content;
  overflow: hidden;
  > * {
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    line-height: 20px;
  }
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  line-height: 20px;
  border: 1px solid rgba(84, 171, 172, 0.7); // TODO: Update theme
  ${({ withoutBorder }) => withoutBorder
    && `
    border: none;
    padding: 6px 0;
  `}
  background-color: ${({ contained }) => contained ? 'rgba(84, 171, 172, 0.40)' : 'transparent'}; // TODO: Add Color
`;

export const OptionText = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  text-align: center;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: 20px;
`;
