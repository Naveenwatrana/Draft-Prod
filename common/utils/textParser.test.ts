import { formatMetaTagsText } from './textParser';

describe('formatMetaTagsText', () => {
  it('should replace all placeholders with arguments', () => {
    const text = 'This is a [0] test [1]';
    const args = ['unit', 'case'];
    const formattedText = formatMetaTagsText(text, args);
    expect(formattedText).toBe('This is a unit test case');
  });
});
