import styled from 'styled-components';

export const CardCreationWizardContainer = styled.div`
    display: flex;
    width: 1200px;
    background-color: #171718;
    flex-direction: column;
    border-radius: 12px;
    margin: 0 auto;
    @media (max-width: 1160px) {
      display: none;
    }
`;
export const CardCreationWizardContainerMobile = styled.div`
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    @media (min-width: 1160px) {
      display: none;
    }
`;

export const CardCreationWizardContentArea = styled.div`
    height: 70vh;
    display: flex;
`;
export const CardNavigatorWrapper = styled.div`
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
`;
export const FormWrapper = styled.div`
    width: 100%;
    @media (max-width: 768px) {
        max-height: calc(100vh - 300px);
        overflow-y: auto;
        padding-right: 4%;
        padding-bottom: 60px;
        width: 98%;
    }
`;
export const MobileWizardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.palette.gray[80].value};
    overflow: hidden;
`;
