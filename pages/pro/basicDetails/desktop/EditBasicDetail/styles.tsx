import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const EditName = styled(TextComp)`
    color: ${(props) => props.theme.palette.white['100'].value};
    font-family: ${({ theme }) => theme.defaultFont};
    line-height: 36px;
`;

export const EditNameDescription = styled.div`
  color: ${({ theme }) => theme.palette.gray['10'].value};
  margin: 24px 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
`;

export const SubmitButton = styled(ButtonComp)`
  width: 148px;
  :disabled {
    background-color: ${({ theme }) => theme.palette.green[15].value};
  }
`;

export const SkipButton = styled(ButtonComp)`
    margin-right: 36px;
    color: ${(props) => props.theme.palette.green['80'].value};
    background: none;
    margin-right: 36px;
`;
export const ButtonGroup = styled.div`
    display: flex;
    justify-content: end;
`;

export const LocationContainer = styled.span`
  display: flex;
  flex-direction: column;
`;
