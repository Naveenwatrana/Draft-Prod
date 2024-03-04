import styled from 'styled-components';

export const AddSectionTitle = styled.div`
  background: ${({ theme }) => theme.palette.gray[60].value};
  font-weight: 600;
  font-size: 16px;
  color: #f7f7f7;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  > * {
    max-width: 424px;
  }
  gap: 16px;
`;

export const AddSection = styled.div`
  padding: 32px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.gray[60].value};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  > * {
    max-width: 424px;
  }
  gap: 16px;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

export const AddSectionDescription = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-align: start;
  line-height: 26px;
  font-weight: 300;

  @media screen and (max-width: 1023px) {
    text-align: center;
  }
`;

export const ContentWrapper = styled.div`
  gap: 16px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1023px) {
    align-items: center;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.green['80'].value};
  svg:first-child path {
    stroke: #43c167;
  }
`;
