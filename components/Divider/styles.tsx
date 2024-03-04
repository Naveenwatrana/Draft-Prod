import styled from 'styled-components';

export const DividerComp = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
    margin: 14px 0;
`;

export const StyledDivider = styled(DividerComp)`
  margin: 0;
  position: relative !important;
`;

export const VerticleDividerComp = styled.div`
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
    position: relative !important;
`;
