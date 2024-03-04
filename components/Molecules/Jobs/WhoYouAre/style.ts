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

export const LightText = styled.div`
  color: ${({ theme }) => theme.palette.gray['10'].value};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  line-height: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GridItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
  `;

export const GridItem = styled.div<GridItemProps>`
  width: 50%;
  display: flex;
  flex-direction: column;
  svg {
    height: 18px;
    width: 18px;
  }
  gap: 8px;
  @media screen and (max-width: 768px) {
    max-width: calc(100% - 20px);
  }
  ${({ fullWidth }) => fullWidth
    && `
    width: calc(100% - 26px);
  `}
`;

export const BulletPointContainer = styled.ul`
  margin-left: 12px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  font-weight: 300;
  list-style: none;
  li {
    position: relative;
    padding-left: 20px;
  }
  li::before {
    content: '•';
    position: absolute;
    left: 0;
    top: 0;
  }
`;
