import ButtonComp from 'components/buttonComp';
import { Textarea } from 'components/Description/styles';
import { DividerComp } from 'components/Divider/styles';
import styled from 'styled-components';

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
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;

export const CommentsWrapper = styled.div`
  max-height: 50vh;
  min-height: 40vh;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  transition: right 500ms, top 500ms, opacity 500ms ease-in-out;

  @media screen and (max-width: 768px) {
    width: calc(100% - 4rem);
    top: 174px;
    height: calc(100vh - 250px);
    right: 0;
    top: 100vh;
  }
`;

export const CommentsTitle = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
`;

export const PostCommentContainer = styled.div`
  display: flex;
  padding: 0px 16px 12px;
  gap: 20px;
`;

export const CommentsInput = styled(Textarea)`
  height: 20px;
  line-height: 20px;
  min-height: auto;
  flex: 5;
`;

export const AddCommentButton = styled(ButtonComp)`
  width: fit-content;
  align-self: center;
`;

export const CommentContainer = styled.td`
  color: ${({ theme }) => theme.palette.white[100].value};
  display: flex;
  > span {
    width: 100%;
  }
  gap: 1rem;
  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

export const Author = styled.div`
  line-hight: 18px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;
export const CommentContent = styled.div`
  margin-top: 4px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  word-break: break-all;
`;
export const PublishDate = styled.div`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  line-hight: 16px;
`;
export const NoComments = styled(CommentContent)`
  color: ${({ theme }) => theme.palette.gray[10].value};
  margin-top: 32px;
  padding-top: 32px;
  text-align: center;
`;

export const NoCommentsHeader = styled.h2`
  color: ${({ theme }) => theme.palette.white[100].value};
  margin-bottom: 24px;
`;

export const CommentDivider = styled(DividerComp)`
  margin: 0px;
`;
