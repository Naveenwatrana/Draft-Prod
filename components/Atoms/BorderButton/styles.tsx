import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const BorderedButton = styled(ButtonComp)`
    background: transparent !important;
    padding: 4px 8px;
    transition: 0.3s;
    border: 1px solid ${({ theme, primary }) => primary ? theme.palette.green[80].value : theme.palette.gray[40].value};
    color: ${({ theme, primary }) => primary ? theme.palette.green[80].value : theme.palette.gray[10].value};
    &:hover {
        background: ${({ theme, primary }) => primary ? theme.palette.green[15].value : theme.border.light.value};
    }
`;
export const Button = styled(BorderedButton)``;
