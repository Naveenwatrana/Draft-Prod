import styled from 'styled-components';
import Button from 'components/buttonComp';
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
    max-width: 50vw;
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
  height: calc(100vh - 130px);
  overflow-y: auto;
  background: ${({ theme }) => theme.palette.gray['80'].value};
  position: relative;
  top: 64px;
`;

export const Container = styled.div`
  display: inherit;
  margin: 4rem 0;
`;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  &[contenteditable=true]:empty:not(:focus):before{
    content:attr(data-ph);
    pointer-events: none;
    font-size: 32px;
    color: #828384;
  }
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  right: 8px;
  z-index: 1;
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(80% - 30px);
    justify-content: space-between;
    right: 0;
    padding-left: 100px;
  }
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 64px);
  button:last-child {
    padding: 12px 68px;
  }
`;
export const DiscardButton = styled(Button)`
  margin-right: 16px;
`;
