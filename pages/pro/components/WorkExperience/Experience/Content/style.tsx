import styled from 'styled-components';
import { SkillTagProps } from '../../type';

export const InfoContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: -8px;
  flex-wrap: wrap;
  width: 100%;
  > * {
    @media (max-width: 768px) {
      min-width: calc(50% - 32px);
    }
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
`;

export const RoleDescription = styled(Description)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const SkillTag = styled.p<SkillTagProps>`
    border: 1px solid ${({ theme }) => theme.palette.teal[100].value};
    padding: 8px 10px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
    background-color: ${({ selected, theme }) => selected ? theme.palette.teal[100].value : 'transparent'};
    color: ${({ theme, selected }) => selected ? theme.palette.gray[80].value : theme.palette.white[100].value};
`;
export const SkillTagLight = styled.p<SkillTagProps>`
    border: 1px solid ${({ theme }) => theme.palette.teal[100].value};
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
    background: #54ABAC40; // TODO: Add color
    color: ${({ theme }) => theme.palette.white[100].value};
`;

export const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 8px;
    margin: 16px 0 32px;
`;
