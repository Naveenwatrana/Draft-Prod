import TextEditor from 'components/TextEditor';
import styled from 'styled-components';
type ArticleTextEditorProps = {
  isEditing: boolean;
};

export const ArticleTextEditor = styled(TextEditor)<ArticleTextEditorProps>`
  .ql-editor::before {
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    line-height: ${({ theme }) => theme.typography['16 semibold'].lineHeights.value}px;
    font-style: normal;
    display: ${(props) => !props.isEditing && 'none'};
    position: absolute;
    color: ${({ theme }) => theme.palette.gray[30].value};
  }
  .ql-container {
    height: auto;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  background: none;
  margin-bottom: 50px;
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
  justify-content: end;
  button:last-child {
    padding: 12px 68px;
  }
`;
