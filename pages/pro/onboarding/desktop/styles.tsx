import styled from 'styled-components';
import { HeaderContainerProps } from 'pages/pro/onboarding/desktop/types';
import TextComp from 'components/textComp';

export const HeaderContainer = styled.div<HeaderContainerProps>`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.back ? '0px' : '60px'};

    @media screen and (max-width: 1024px) {
        align-items: center;
        text-align: center;
    }
`;
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: 1024px) {
        align-items: center;
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    min-height: 100vh;
`;

export const LeftPanel = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 0 200px;
    display: flex;
    flex-direction: column;
    margin: 60px 0;

    @media (max-width: 1150px) {
        padding: 0 50px;
    }

    @media (min-width: 1150px) and (max-width: 1360px) {
        padding: 0 100px;
    }

    @media (min-width: 1360px) and (max-width: 1560px) {
        padding: 0 150px;
    }
`;

export const RightPanel = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['60'].value};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StepLineWrapper = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const StepLine = styled.div<{active: boolean}>`
    width: 44px;
    height: 4px;
    background-color: ${({ theme, active }) => active ? theme.palette.white['100'].value : theme.palette.gray['40'].value};
    margin: 8px;
`;

export const FormSubtitle = styled(TextComp)`
    font-size: 16px;
    font-weight: 300;
`;
