import styled from 'styled-components';

type Clickable = {
  clickable?: boolean;
}

export const Container = styled.div`
  display: flex;
  gap: 16px;
`;

export const LogoContainer = styled.div<Clickable>`
  width: 60px;
  height: 60px;
  img {
    border-radius: 8px;
  }
  ${({ clickable }) => clickable && 'cursor: pointer'}
`;

export const RoleTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['20 semibold'].lineHeights.value}px;
`;

export const CompanyName = styled.p<Clickable>`
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
  ${({ clickable }) => clickable && 'cursor: pointer'}
`;

export const CategoryName = styled.p`
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.gray[10].value};
  margin-bottom: 16px;
`;

export const IconWrapper = styled.p`
  align-items: center;
  display: flex;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
  svg {
    path {
      stroke: ${({ theme }) => theme.palette.gray[10].value};
    }
  }
  color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
