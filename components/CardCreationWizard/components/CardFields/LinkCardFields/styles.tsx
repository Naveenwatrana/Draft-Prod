import styled from 'styled-components';
import SimpleInput from 'components/input/SimpleInput';
import { AddLinkButton } from '../styles';
import DeleteButtonElement from '../DeleteButton';

export const FieldGroupWrapper = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    margin-bottom: 16px;
`;

export const InputWrapper = styled(SimpleInput)`
    margin-bottom: 16px;
`;
export const AddLink = styled(AddLinkButton)`
    margin-bottom: 16px;
`;
export const DeleteButtonElementWrapper = styled(DeleteButtonElement)`
    margin-top: 0;
    margin-bottom: 16px;
`;
