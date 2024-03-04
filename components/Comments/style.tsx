import ButtonComp from 'components/buttonComp';
import { Textarea } from 'components/Description/styles';
import styled from 'styled-components';

type ModalProps = {
  open: boolean;
};

export const CommentsLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  justify-content: center;
  width: 42px;
  height: 42px;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    background: ${({ theme }) => theme.palette.gray[60].value};
    border-radius: 8px;
  }
`;

export const CommentsCount = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;

export const CommentsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  z-index: 0;

  right: -100%;
  top: 0;
  opacity: 0;
  transition: right 500ms, top 500ms, opacity 500ms ease-in-out;

  @media screen and (max-width: 768px) {
    width: calc(100% - 4rem);
    top: 174px;
    height: calc(100vh - 250px);
    right: 0;
    top: 100vh;
  }
`;

export const Modal = styled.div<ModalProps>`
  width: 100%;
  left: 0;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.palette.gray[100].value}bf;
  z-index: ${({ open }) => (open ? 6 : -1)};

  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: z-index 500ms, opacity 500ms, visibility 500ms ease-in-out;

  ${({ open }) => open
    && `   
      > div:first-child {
        opacity: 1;
        top: 0;
        z-index: 2;
        right: 0;
        @media screen and (max-width: 768px) {
          top: 174px;
        } 
      }
    `}
`;

export const CommentsTitle = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
`;

export const CommentsInput = styled(Textarea)`
  margin-top: 1.5rem;
  min-height: 125px;
`;

export const AddCommentButton = styled(ButtonComp)`
  font-weight: 400;
  width: fit-content;
`;

export const CommentContainer = styled.td`
  color: ${({ theme }) => theme.palette.white[100].value};
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[50].value};
  padding: 1.5rem 0;
  > span {
    width: 100%;
  }
  gap: 1rem;
  &:nth-child(4) {
    border-top: solid 1px ${({ theme }) => theme.palette.gray[50].value};
    margin-top: 1.5rem;
  }
  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

export const Author = styled.div`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;
export const CommentContent = styled.div`
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  word-break: break-all;
`;
export const PublishDate = styled.div`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
`;
export const NoComments = styled(CommentContent)`
  border-top: solid 1px ${({ theme }) => theme.palette.gray[50].value};
  color: ${({ theme }) => theme.palette.gray[10].value};
  margin-top: 32px;
  padding-top: 32px;
`;
