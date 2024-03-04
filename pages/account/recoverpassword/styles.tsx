import styled from 'styled-components';
import TextComp from 'components/textComp';
import Link from 'next/link';

export const CancelLink = styled(Link)`
    align-self: center;
`;

export const CancelButton = styled(TextComp)`
    color: ${({ theme }) => theme.palette.green['80'].value};
`;

export const Instruction = styled.div`
    margin: 24px 0;
`;
