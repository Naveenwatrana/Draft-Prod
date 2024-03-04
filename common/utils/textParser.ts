export const formatMetaTagsText = (text: string, args: string[]) => {
  let formattedText = text;
  args.forEach((arg, index) => {
    if (arg) {
      formattedText = formattedText.replace(`[${index}]`, arg);
    }
  });
  return formattedText;
};
