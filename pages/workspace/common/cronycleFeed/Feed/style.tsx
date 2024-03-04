import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 16px;
  margin-top: 24px;
  
`;
export const FeedHeader = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  max-width: 906px;
  @media (max-width: 1024px) {
      grid-template-columns: repeat(2, auto);
  }
  @media (max-width: 658px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
`;
