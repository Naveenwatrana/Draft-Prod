import React from 'react';
import styled from 'styled-components';

const HighlightedText = styled.span`
  color: #5ff088;
`;

const LessSection = styled.span`
  cursor: pointer;
`;

const TextWithHashtags = ({ text, showLess }:{text: string, showLess?: () => void}) => {
  const hashtagRegex = /(?:^|\s)#([a-zA-Z0-9_]+)/g;
  const lines = text.split('\x01');
  const lineMap = lines.map((line, index) => {
    const parts = line.split(' ');
    return (
      <>
        {parts.map((part, i) => {
          const match = part?.trim().match(/[a-zA-Z0-9_]+/);
          return part.match(hashtagRegex) ? (
            <HighlightedText key={part}>
              #
              {match && match[0] + (i + 1 < parts.length ? ' ' : '')}
            </HighlightedText>
          ) : (
            part + (i + 1 < parts.length ? ' ' : '')
          );
        })}
        {index === (lines.length - 1) && !!showLess && <LessSection onClick={showLess}> ... Less</LessSection>}
        <br />
      </>
    );
  });

  return <div>{lineMap}</div>;
};

export default TextWithHashtags;
