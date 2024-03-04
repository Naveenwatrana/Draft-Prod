import styled from 'styled-components';

export const AddSection = styled.div`
  padding: 60px 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.gray[60].value};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > * {
    max-width: 424px;
  }
  gap: 16px;
`;

export const AddSectionDescription = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-align: center;
  line-height: 26px;
  font-weight: 300;
`;
