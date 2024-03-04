import styled from 'styled-components';
import Link from 'next/link';
import TextComp from 'components/textComp';
import { AuthWrapper } from '../styles';

export const Tnc = styled.div`
    display: flex;
    position: relative;
    align-items: baseline;
    & p {
        padding-left: 3px;
    }
`;

export const TermsAndConditionsButton = styled(Link)`
    color: white;
    font-size: 0.875rem;
    padding-left: 3px;
`;

export const LoginLink = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 10px;
`;

export const LoginLinkText = styled(TextComp)`
    padding-right: 3px;
`;

export const TncContainer = styled.div`
    margin-top: 30px;
    padding: 0 20px;
    max-width: 600px;
    justify-self: center;
    grid-column-start: 1;
    grid-column-end: 3;

    @media (max-width: 1200px) {
        margin-top: 60px;
    }
`;

export const ContentWrapper = styled.div`
    margin: 24px 0;
    h4 {
        font-weight: 400;
    }
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 18px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
`;

export const SignUpSuccessWrapper = styled(AuthWrapper)`
    max-width: 393px;
`;
