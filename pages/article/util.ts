export const highlightedText = (text: string) => {
  const hashtagRegex = /(?:^|\s)#([a-zA-Z0-9_]+)/g;
  const newtext = text.replaceAll('>', '> ');
  const parts = newtext.split(' ');
  let output = '';
  parts.forEach((part, i) => {
    const match = part?.trim().match(/[a-zA-Z0-9_]+/);
    if (part.match(hashtagRegex)) {
      output += `<a class='hashtag' href="" rel="noopener noreferrer" target="_blank">#${
        match && match[0] + (i + 1 < parts.length ? ' ' : '')
      }</a>`;
    } else {
      output += part + (i + 1 < parts.length ? ' ' : '');
    }
  });
  return output;
};
