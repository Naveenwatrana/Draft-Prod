import { figmaTokensToStyleDictionary } from 'common/utils/tokenConverter/tokenConverter';
import tokenJSON from 'common/utils/tokenConverter/tokens.json';
import { FigmaTokens, Theme } from 'common/utils/tokenConverter/types';

export const theme = figmaTokensToStyleDictionary(tokenJSON as unknown as FigmaTokens) as Theme;
