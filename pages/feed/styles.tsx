import { StyledCarousel } from 'components/CardStack/styles';
import styled from 'styled-components';

export const FeedContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    margin: 20px 0px;

    ${StyledCarousel} {
        cursor: pointer;
    }

    @media (min-width: 1200px) {
        margin: 20px 50px;
    }
`;
