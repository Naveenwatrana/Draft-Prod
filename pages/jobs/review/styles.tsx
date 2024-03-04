import styled from 'styled-components';

export const LeftSection = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 0 150px;
    display: flex;
    flex-direction: column;
    margin: 60px 0;
    justify-content: center;
    font-family: ${({ theme }) => theme.defaultFont};

    @media screen and (max-width: 1024px) {
        margin: 0 auto;
        padding: 0 24px;
        min-height: 100vh;
        justify-content: space-between;
    }
`;

export const RightSection = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['60'].value};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ReviewThumb = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 24px;
    background: ${(props) => `radial-gradient(117.15% 117.14% at 62.14% -8.57%, ${props.theme.palette.violet['80'].value} 0%, ${props.theme.palette.violet['100'].value} 100%)`};
`;

export const ReviewJobText = styled.div`
    font-weight: ${(props) => props.theme.typography['24 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['24 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 24px;
`;

export const ReviewJobDecs = styled.div`
    font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 24px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 36px;
    @media screen and (max-width: 1024px) {
        flex-direction: column-reverse;
        gap: 8px;
        padding-bottom: 24px;
    }
`;

export const ButtonBackToEdit = styled.div`
    flex: 1;
    padding: 12px;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

export const ButtonCreateJobPost = styled.div`
    flex: 1.5;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

export const ReviewContent = styled.div`
    padding-top: 24px;
`;

export const CardsSlidesWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
`;

export const JobsSlider = styled.div`
    width: 300px;
`;
