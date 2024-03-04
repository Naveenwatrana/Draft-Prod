import { highlightedText } from "./util";

describe('highlightedText', () => {
  it('should wrap hashtags in anchor tags', () => {
    const text = 'This is a #test';
    const result = highlightedText(text);
    expect(result).toBe(
      'This is a <a class=\'hashtag\' href="" rel="noopener noreferrer" target="_blank">#test</a>',
    );
  });

  it('should leave other text unchanged', () => {
    const text = 'This is a test';
    const result = highlightedText(text);
    expect(result).toBe('This is a test');
  });

  it('should handle multiple hashtags', () => {
    const text = '#test1 #test2';
    const result = highlightedText(text);
    expect(result).toBe(
      '<a class=\'hashtag\' href="" rel="noopener noreferrer" target="_blank">#test1 </a><a class=\'hashtag\' href="" rel="noopener noreferrer" target="_blank">#test2</a>',
    );
  });

  it('should handle text with no hashtags', () => {
    const text = 'This is a test with no hashtags';
    const result = highlightedText(text);
    expect(result).toBe('This is a test with no hashtags');
  });
});
