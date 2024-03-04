import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  padding: 1rem;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const CreateCompanyBody = styled.div`
  margin: 4rem 0;
  min-height: calc(100vh - 156px);
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  @media screen and (max-width: 555px) {
    margin: 1.5rem 0;
  }
`;

export const CreateCompanyPageText = styled.span`
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  svg path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    cursor: pointer;
  }
  svg {
    cursor: pointer;
  }
`;
