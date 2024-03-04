import ButtonComp from 'components/buttonComp';
import { TextComp } from 'components/textComp';
import styled from 'styled-components';

export const SubmitButton = styled(ButtonComp)`
  width: 100%;
  :disabled {
    background-color: ${({ theme }) => theme.palette.green[15].value};
  }
`;

export const SkipButton = styled(ButtonComp)`
    width: 100%;
    margin-top: 12px;
`;
export const EditTitle = styled(TextComp)`
    padding-top: 32px;
`;
export const ButtonGroup = styled.div`
    margin-top:auto;
`;
