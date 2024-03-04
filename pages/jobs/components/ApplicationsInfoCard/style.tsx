import styled from 'styled-components';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 297px;
    height: 610px;
    border-radius: 12px;
    background: 
    linear-gradient(#171718 0 0) padding-box,
    linear-gradient(136deg, #e36cfd 0%, #0058fb 15.63%, #2ec0fb 40.63%, #14f7ef 68.75%, #f9e033 84.38%, #faa143 98.44%) border-box;
    border: 1px solid transparent;
    background-color: ${({ theme }) => theme.palette.gray[80].value};
`;

export const JobInfoCount = styled.div`
    height: 88px;
    width: 88px;
    border-radius: 71px;
    background: linear-gradient(113.5deg, rgba(95, 240, 136, 0.6) 3.93%, rgba(20, 247, 239, 0.6) 74.52%);
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
    width: 204px;
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
`;
