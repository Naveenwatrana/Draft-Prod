import styled from 'styled-components';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 364px;
    height: 418px;
    border-radius: 12px;
    background: #1F1D20;
`;

export const JobInfoCount = styled.div`
    height: 88px;
    width: 88px;
    border-radius: 71px;
    background: linear-gradient(90deg, #3D3C85 0%, #49489F 100%);
    font-size: 35.2px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardHeader = styled.div`
    color: ${({ theme }) => theme.palette.white[100].value};
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    padding: 16px;
    gap: 4px;
`;

export const CardDetail = styled.div`
    width: 190px;
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
`;
