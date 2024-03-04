import styled from 'styled-components';
import { InfoDescriptionVariant, StyledDescriptionProps } from './type';

export const Container = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  display: flex;
  min-width: 200px;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;
export const Title = styled.p`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['12 regular'].lineHeights.value}px;
`;
export const Info = styled.p`
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
  @media (max-width: 768px) {
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  }
`;
export const StyledDescription = styled.div<StyledDescriptionProps>`
  border-radius: 8px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.palette.violet[80].value};
  background: #54ABAC26; // TODO: Add Color
  padding: 10px 16px;
  color: ${({ theme }) => theme.palette.white[100].value};
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
  ${({ variant }) => variant === InfoDescriptionVariant.WARNING
    && `
    border: 1px solid rgba(245, 131, 43, 0.15);
    background: rgba(245, 131, 43, 0.15);
    `
}
`;
