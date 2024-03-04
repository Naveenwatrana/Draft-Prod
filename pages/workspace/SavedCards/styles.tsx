import { StyledCarousel } from 'components/CardStack/styles';
import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const GoToFeedButton = styled(ButtonComp)``;

export const Title = styled(TextComp)`
    font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    ${StyledCarousel} {
        cursor: pointer;
    }
`;
export const Content = styled.div`
    flex: 4;
    display: flex;
    padding: 16px 0;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%;
`;

export const CardContainer = styled.div`
    margin-left: 24px;
    overflow: visible;
    margin-bottom: 24px;
    &:nth-child(3n + 1) {
        margin-left: 0;
    }
`;
