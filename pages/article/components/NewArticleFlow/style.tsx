import styled from 'styled-components';
export const EditorContainer = styled.div`
  display: flex;
  height: calc(100vh - 130px);
  grid-gap: 1px;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[50].value};
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  & > div {
    height: 100%;
    background-color: ${({ theme }) => theme.palette.gray[80].value};
    @media screen and (max-width: 768px) {
      max-width: 100vw;
    }
  }
`;
export const Editor = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  @media screen and (max-width: 1023px) {
    width: 100%;
  } 
`;
export const Wrap = styled.div`
  padding: 32px 80px;
  position: fixed;
  width: calc(100% - 160px);
  height: calc(100vh - 130px);
  overflow-y: auto;
  background: ${({ theme }) => theme.palette.gray['80'].value};
  @media screen and (max-width: 768px) {
    padding: 12px 16px;
    width: calc(100% - 32px);
  }
`;
export const ContentInsideWrap = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    max-width: fit-content;
  }
`;

export const Container = styled.div`
  display: inherit;
  padding: 4rem 0;
`;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > div {
    padding-top: 80px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ArticlePreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 190px);
  flex-wrap: wrap;
  padding: 60px;
  width: calc(100% - 120px);
  overflow-y: auto;
  @media screen and (max-width: 1023px) {
    display: none;
  } 
`;
export const HeadlineField = styled.div`
  padding: 10px;
  margin-top: 24px;
  margin-bottom: 24px;
  border: none;
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
  line-height: ${({ theme }) => theme.typography['32 semibold'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  transition: 0.3s;
  &:focus {
    outline: none;
  }
  & * {
    font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight} !important;
    font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px !important;
    line-height: ${({ theme }) => theme.typography['32 semibold'].lineHeights.value}px !important;
    color: ${({ theme }) => theme.palette.white[100].value} !important;
    background-color: transparent !important;
  }
  &[contenteditable=true]:empty:not(:focus):before{
    content:attr(data-ph);
    pointer-events: none;
    font-size: 32px;
    color: #828384;
  }
`;
