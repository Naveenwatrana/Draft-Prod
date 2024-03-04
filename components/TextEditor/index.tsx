import 'react-quill/dist/quill.snow.css';
import lang from 'common/lang';
import React from 'react';
import { QuillStyled } from './style';

interface TextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [false, 2, 3] }],
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const { placeholder } = lang.article.editText;

const TextEditor = ({ value, onChange, ...rest }: TextEditorProps) => {
  return (
    <QuillStyled
      modules={modules}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default TextEditor;
