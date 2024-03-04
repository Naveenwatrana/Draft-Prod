/* eslint-disable no-param-reassign */
import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value?: string,
  height = 26,
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = '0px';
      const { scrollHeight } = textAreaRef;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      const heightToSet = Math.floor(Math.min(scrollHeight, 200) / height) * height;
      textAreaRef.style.height = `${heightToSet}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
