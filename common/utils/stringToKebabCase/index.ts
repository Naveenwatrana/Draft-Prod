const replaceSlashBackslash = (text: string) => {
  const words: string[] = text.split(' ');
  const txtArray: string[] = [];
  words.forEach((word) => {
    const newWord = word.replace(/^[\\/\\]+|[\\/\\]+$/g, '').replace(/[\\/\\]+/g, ' ');
    txtArray.push(newWord);
  });
  return txtArray.join(' ');
};

export const stringToKebabCase = (inputText: string | null | undefined) => {
  if (!inputText) return '';
  let text = replaceSlashBackslash(inputText);
  text = text.toLowerCase().replace(/\s+/g, '-');
  text = text.replace(/[^a-zA-Z0-9\\-]/g, '');
  text = text.replace(/^-+|-+$/g, '');
  return text;
};
