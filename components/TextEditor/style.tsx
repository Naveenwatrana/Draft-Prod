import styled from 'styled-components';
import dynamic from 'next/dynamic';
import katex from 'katex';
import 'katex/dist/katex.min.css';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
if (typeof window !== 'undefined') (window as any).katex = katex;
export const QuillStyled = styled(ReactQuill)`
  color: ${({ theme }) => theme.palette.white['100'].value};
  background-color: transparent;
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    background-color: transparent;
  }
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border: none;
    padding: 0;
  }
  * {
    font-family: ${({ theme }) => theme.defaultFont};
  }
  .ql-editor.ql-blank::before {
    color: ${({ theme }) => theme.palette.gray['30'].value};
  }
  .ql-editor.ql-blank::before {
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    line-height: ${({ theme }) => theme.typography['16 semibold'].lineHeights.value}px;
    font-style: normal;
  }
  .ql-editor {
    min-height: 100px;
  }
  .ql-syntax {
    background-color: ${({ theme }) => theme.palette.gray['100'].value} !important;
  }
  .ql-active, .ql-picker-item:hover , .ql-picker-label:hover, .ql-snow a{
    color: ${({ theme }) => theme.palette.green['80'].value} !important;
    .ql-stroke, .ql-fill {
      stroke: ${({ theme }) => theme.palette.green['80'].value} !important;
    }
  }
  .ql-snow.ql-toolbar button:hover {
    .ql-stroke, .ql-fill {
      stroke: ${({ theme }) => theme.palette.green['80'].value} !important;
    }
    .ql-fill {
      fill: ${({ theme }) => theme.palette.green['80'].value} !important;
    }
  }
`;
