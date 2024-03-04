import tokens from 'common/utils/tokenConverter/tokens.json';
import { figmaTokensToStyleDictionary } from 'common/utils/tokenConverter/tokenConverter';
import { FigmaTokens } from 'common/utils/tokenConverter/types';
import {
  expectedBackground, expectedBorder, expectedOverlay, expectedText, expectedTypography,
} from 'common/utils/tokenConverter/testData';

const typedTokens = tokens as unknown as FigmaTokens;

describe('Token Converter', () => {
  it('should convert figma tokens to JS object', () => {
    const expectedResult = {
      typography: expectedTypography,
      border: expectedBorder,
      text: expectedText,
      background: expectedBackground,
      overlay: expectedOverlay,
    };
    const result = figmaTokensToStyleDictionary(typedTokens);
    expect({ ...result }).toMatchObject(expectedResult);
  });
});
