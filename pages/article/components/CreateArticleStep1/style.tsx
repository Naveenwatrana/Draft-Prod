import styled from 'styled-components';
export const EditorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 129px);
  overflow: hidden;
`;
export const Editor = styled.div`
  width: 50%;
  min-height: calc(100vh - 130px);
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  @media screen and (max-width: 1023px) {
    width: 100%;
  } 
`;
export const Wrap = styled.div`
  margin: 0 80px;
`;

export const Container = styled.div`
  display: inherit;
  padding: 4rem 0;
`;

export const ArticlePreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 190px);
  flex-wrap: wrap;
  padding: 2% 3%;
  width: calc(50% - 6%);
  overflow-y: auto;
  @media screen and (max-width: 1023px) {
    display: none;
  } 
`;
export const HeadlineField = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 14px;
  border: none;
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
  line-height: ${({ theme }) => theme.typography['32 semibold'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  transition: 0.3s;
  &:focus {
    outline: none;
  }
`;
