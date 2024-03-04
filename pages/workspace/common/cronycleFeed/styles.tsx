import styled from 'styled-components';

export const FeedHeader = styled.div`
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white['100'].value};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  padding-bottom: 16px;
  margin-bottom: -16px;
`;

export const FeedName = styled.span`
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.gray['30'].value};
  padding: 12px;
  gap: 10px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.palette.gray['50'].value};
  border-radius: 8px;
  margin: 0 24px;
`;

export const FeedsContainer = styled.div`
  max-width: 100%;
  width: 902px;
  height: calc(100%);
  overflow-y: auto;
  gap: 24px;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (max-width : 1024px) { 
    height: calc(100% - 4rem);
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin: 24px 0; */
`;

export const FeedIndex = styled.span`
  width: 16px;
  color: ${({ theme }) => theme.palette.white['100'].value}
`;

export const StyledCheckBox = styled.input`
  cursor: pointer;
  display: grid;
  place-content: center;
  appearance: none;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 21px;
  height: 21px;
  border: 1px solid ${({ theme }) => theme.palette.green['80'].value};
  border-radius: 6px;
  box-sizing: border-box;

  ::before {
    content: '';
    width: 14px;
    height: 14px;
  }

  :checked::before {
    transform: scale(1);
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.green['80'].value};
  }
`;

export const ButtonContainer = styled.div`
  position: sticky;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  bottom: 0;
  align-self: flex-end;
  display: flex;
  gap: 24px;
  button {
    font-size: 14px;
  }
  width: 100%;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  button:first-child {
    margin-left: auto;
  }
`;
