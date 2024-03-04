import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import { useState } from 'react';
import hashtagStyles from './hashtag.module.css';
import { HashTagInput } from './types';
import {
  InputOuter, LimitCounter, HashInputContainer,
} from './styles';

const HashtagInput = ({
  value, onChange, placeHolder, limit,
}:HashTagInput) => {
  const [dataText, setDataText] = useState(value);
  const [editorState, setEditorState] = useState(createEditorStateWithText(value));
  const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
  let inputRef:any;
  const plugins = [hashtagPlugin];

  const onValChange = (es:any) => {
    onChange(es.getCurrentContent().getPlainText('\u0001'));
    if (!(!!limit && es.getCurrentContent().getPlainText('\u0001').length > limit)) {
      setDataText(es.getCurrentContent().getPlainText('\u0001'));
      setEditorState(es);
    }
  };

  const focus = () => {
    inputRef?.focus();
  };

  return (
    <HashInputContainer>
      <InputOuter onClick={focus} data-cy="captionInput" onKeyDown={focus}>
        <Editor
          placeholder={placeHolder}
          editorState={editorState}
          onChange={onValChange}
          plugins={plugins}
          ref={(element) => {
            inputRef = element;
          }}
        />
      </InputOuter>
      {limit && <LimitCounter>{`${dataText.length}/${limit}`}</LimitCounter>}
    </HashInputContainer>
  );
};

export default HashtagInput;
