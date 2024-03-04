import styled from 'styled-components';

export const Title = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  line-height: 36px;
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  line-height: 36px;
`;

export const SubTitleReasons = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  line-height: 24px;
`;
