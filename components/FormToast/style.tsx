import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.violet['100'].value};
  border: 1px solid ${({ theme }) => theme.palette.violet['80'].value};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  gap: 16px;
  margin: 16px 0 32px;
  position: relative;
  > svg {
    position: absolute;
    right: 16px;
    cursor: pointer;
    padding-top: 16px;
  }
  @media screen and (max-width: 555px) {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translate(-50%);
      width: 100%;
      border-radius: 0;
  }
`;
export const Header = styled.div`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white['100'].value};
  padding: 16px 16px 0;
  `;
export const Body = styled.div`
  padding: 0 16px 16px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white['100'].value};
`;
