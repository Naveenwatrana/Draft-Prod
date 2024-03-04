import styled from 'styled-components';
import bgImage from 'public/images/bg.jpg';
import ButtonComp from 'components/buttonComp';

export const AuthContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
background-color: ${({ theme }) => theme.palette.gray['80'].value};
min-height: 100vh;

@media (max-width: 1200px) {
    grid-template-columns: 1fr;
}
`;

export const AuthWrapper = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 0 150px;
    align-self: center; 

    @media (max-width: 1200px) {
        padding: 0 10%;
    }
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
`;

export const FormError = styled.div`
    font-family: ${({ theme }) => theme.defaultFont};
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    padding: 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.red['100'].value};
    color: white;
    text-align: center;
    margin-bottom: 10px;
`;

export const SubmitButton = styled(ButtonComp)`
    margin: 12px 0 10px;
`;

export const RightPanel = styled.div`
    background-image: url(${bgImage.src});
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 1200px) {
        display: none;
    }
`;
