import TextComp from 'components/textComp';
import styled from 'styled-components';
import { StyledDescription } from 'components/Atoms/InfoBlock/style';

export const Container = styled.div`
    padding: 16px;
    height: calc(100% - 32px);
    width: 376px;
    background: ${({ theme }) => theme.palette.gray[80].value};
    overflow-y: scroll;
`;
export const CardName = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    margin-bottom: 24px;
`;
export const CardDescription = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    margin-bottom: 24px;
`;
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CardSubtext = styled(CardDescription)`
    color: ${({ theme }) => theme.palette.gray[10].value};
    margin-bottom: 24px;
    display: block;
`;

export const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    margin-top: 24px;
    border: none;
    padding: 4px;
    transition: all 0.2s ease-in-out;
    display: flex;
    width: 180px;
    &:hover {
        border-radius: 4px;
        cursor: pointer;
        p {
            color: ${({ theme }) => theme.palette.red[110].value};
        }
        svg path {
            stroke: ${({ theme }) => theme.palette.red[110].value};
        }
    }
    p {
        font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
        font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
        color: ${({ theme }) => theme.palette.red[100].value};
        margin-left: 8px;
        text-transform: uppercase;
    }
`;
export const AddLinkButton = styled(DeleteButton)`
    margin-bottom: 16px;
    margin-top: 0px;
    &:hover {
        p {
            color: ${({ theme }) => theme.palette.green[80].value};
        }
        svg path {
            stroke: ${({ theme }) => theme.palette.green[80].value};
        }
    }
    p {
        color: ${({ theme }) => theme.palette.green[100].value};
        font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
        font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
        text-transform: capitalize;
    }
`;

export const Description = styled(StyledDescription)`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.palette.gray[80].value};
  background: linear-gradient(
      90deg,
      rgba(227, 108, 253, 0.15) 4.71%,
      rgba(0, 88, 251, 0.15) 57.55%,
      rgba(46, 192, 251, 0.15) 100%
    ),
    ${({ theme }) => theme.palette.violet[100].value};
`;
