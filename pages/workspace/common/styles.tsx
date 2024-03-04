import ButtonComp from 'components/buttonComp';
import { TextComponent } from 'components/text/styles';
import styled from 'styled-components';

export const NoJobWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 1024px) {
        margin-left: -120px;
        // padding-top: 124px;
    }
`;

export const NoJobText = styled.div`
    font-weight: ${(props) => props.theme.typography['24 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['24 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 20px;
`;

export const AddFirstJobText = styled.div`
    font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.gray['10'].value};
    margin-bottom: 32px;
`;

export const NoJobIcon = styled.div`
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 32px;
    // background: ${(props) => `radial-gradient(117.15% 117.14% at 62.14% -8.57%, ${props.theme.palette.violet['80'].value} 0%, ${props.theme.palette.violet['100'].value} 100%)`};
`;

export const AddJobButton = styled.div`
    font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
    background: ${(props) => props.theme.palette.green['80'].value};
    color: ${(props) => props.theme.palette.violet['100'].value};
    width: fit-content;
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    @media (max-width: 1024px) {
        width: 184px;
        padding: 12px 0;
        text-align: center;
    }
`;
export const AddJobModal = styled.div`
    display: flex;
    flex-direction: column; 
    background: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 32px;
    border-radius: 4px;
    max-width: 906px;
    margin: 0 auto;
`;

export const Heading = styled(TextComponent)`
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
`;
export const Subtitle = styled(TextComponent)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    margin: 0 0 10px;
`;
export const LeverButton = styled.button`
    background: ${({ theme }) => theme.palette.white['15'].description};
    color: ${({ theme }) => theme.palette.white['100'].value};
    padding: 24px 303px;
    border: none;
    border-radius: 12px;
    margin-bottom: 36px;
    margin-top: 10px;
    @media (max-width: 1024px) {
        padding: 24px;
    }
`;

export const MoreMenuContentWrapper = styled.div`
    position: absolute;
    z-index: 10;
    // right: 50px;
    border: 1px solid ${({ theme }) => theme.palette.gray['60'].value};
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.gray['100'].value};
    width: 196px;
    height: fit-content !important;
    padding: 8px;
    @media (max-width: 1024px) {
        top: 40px;
        right: 0;
    }
`;

export const MenuItem = styled.div`
    color: ${({ theme }) => theme.palette.white['100'].value};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    padding: 8px;
    cursor: pointer;
`;

export const JobListHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    @media (min-width: 1024px) {
        margin-bottom: 40px;
    }
`;

export const JobListHeaderItem = styled.div`
    color: ${({ theme }) => theme.palette.white['100'].value};
    font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
`;

export const AddJobBtn = styled(ButtonComp)`
    padding: 12px 16px;
`;
