import {
  FigmaToken, FigmaTokens, NestedToken, ValueTypeDescription, Token,
} from 'common/utils/tokenConverter/types';

const matchPaletteRegex = /\$palette\.[a-z]+.[0-9]+/g;
const matchNestedKeyValueRegex = /\{([^)]+)}/g;
const matchNestedAlias = /\$(\S*)/g;

export const figmaTokensToStyleDictionary = (figmaTokens: FigmaTokens) => {
  const tokens = {} as NestedToken;
  const typographyTokens = {} as NestedToken;
  const overlayTokens = {} as NestedToken;
  const borderTokens = {} as NestedToken;
  const textTokens = {} as NestedToken;
  const backgroundTokens = {} as NestedToken;

  Object.keys(figmaTokens).forEach((key) => {
    const figmaToken = figmaTokens[key] as FigmaToken;
    if ((figmaToken).type === 'typography') {
      typographyTokens[key] = mapTypographyKeyValueTokenPairs(figmaTokens, figmaToken);
      return;
    }
    Object.keys(figmaToken).forEach((tokenKey) => {
      const typedTokenKey = tokenKey as keyof typeof figmaToken;
      if (key === 'border') {
        borderTokens[typedTokenKey] = mapInternalKeyValueTokenPairs(figmaTokens, figmaToken, typedTokenKey);
      }
      if (key === 'text') {
        textTokens[typedTokenKey] = mapInternalKeyValueTokenPairs(figmaTokens, figmaToken, typedTokenKey);
      }
      if (key === 'background') {
        if (Object.hasOwnProperty.call(figmaToken[typedTokenKey], 'value')) {
          backgroundTokens[tokenKey] = mapInternalKeyValueTokenPairs(figmaTokens, figmaToken, typedTokenKey);
        } else {
          const backgroundButtonColorTokens = {} as Token;
          const figmaTokenKey = figmaToken[typedTokenKey];
          if (figmaTokenKey) {
            Object.keys(figmaTokenKey).forEach((nestedKey) => {
              Object.values(figmaTokenKey[nestedKey as keyof typeof figmaTokenKey]).forEach((nestedValue) => {
                const matches = (nestedValue as string).match(matchPaletteRegex);
                if (matches) {
                  matches.forEach((match) => {
                    const splitMatch = match.split('.');
                    const backgroundKey = splitMatch[1] as keyof FigmaToken;
                    const backgroundNestedKey = splitMatch[2] as keyof FigmaToken;
                    const paletteObject = figmaTokens?.palette[backgroundKey] as FigmaToken;
                    if (paletteObject && paletteObject[backgroundNestedKey]) {
                      backgroundButtonColorTokens[nestedKey] = paletteObject[backgroundNestedKey] as ValueTypeDescription;
                    }
                  });
                }
              });
              backgroundTokens[tokenKey] = backgroundButtonColorTokens;
            });
          }
        }
      }
      if (key === 'overlay') {
        const overlayToken = figmaTokens[key];
        Object.entries(overlayToken).forEach(([overlayParentKey, value]) => {
          const matches = (value.value as string).match(matchNestedAlias);
          let overlayValue = value.value;
          if (matches) {
            matches.forEach((match) => {
              const slicedMatch = match.slice(1);
              const splitMatch = slicedMatch.split('.');
              if (splitMatch[0] === 'background') {
                const bg = backgroundTokens[splitMatch[1] as keyof FigmaToken];
                overlayValue = overlayValue.replace(match, bg.value);
              }
              if (splitMatch[0] === 'overlay') {
                const overlay = overlayToken[splitMatch[1] as keyof FigmaToken] as ValueTypeDescription;
                overlayValue = overlayValue.replace(match, overlay?.value);
              }
              overlayTokens[overlayParentKey] = { type: 'color', value: overlayValue };
            });
          } else {
            overlayTokens[overlayParentKey] = value;
          }
        });
      }
    });
    tokens[key] = figmaToken as ValueTypeDescription;
  });
  return {
    ...tokens,
    typography: typographyTokens,
    border: borderTokens,
    text: textTokens,
    background: backgroundTokens,
    overlay: overlayTokens,
  };
};

const mapTypographyKeyValueTokenPairs = (figmaTokens: FigmaTokens, figmaToken: FigmaToken) => {
  const typographyToken = {} as Token;
  Object.values([figmaToken.value]).forEach((value) => {
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
      const matches = (nestedValue as string).match(matchNestedKeyValueRegex);
      if (matches) {
        matches.forEach((match) => {
          const slicedMatch = match.slice(1, -1);
          const splitMatch = slicedMatch.split('.');
          const typographyKey = splitMatch[0] as keyof FigmaTokens;
          const typographyNestedKey = splitMatch[1] as keyof FigmaToken;
          typographyToken[typographyKey] = figmaTokens[typographyKey][typographyNestedKey] as ValueTypeDescription;
        });
      } else {
        typographyToken[nestedKey] = nestedValue;
      }
    });
  });
  return typographyToken;
};

const mapInternalKeyValueTokenPairs = (figmaTokens: FigmaTokens, figmaToken: FigmaToken, tokenKey: string) => {
  let internalTokens = {} as Token;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  Object.values(figmaToken[tokenKey as keyof typeof figmaToken]!).forEach((nestedValue) => {
    const matches = (nestedValue as string).match(matchPaletteRegex);
    if (matches) {
      matches.forEach((match) => {
        const splitMatch = match.split('.') as Array<keyof FigmaToken>;
        const paletteValue = figmaTokens?.palette[splitMatch[1] as keyof FigmaToken];
        if (paletteValue && splitMatch[2]) {
          internalTokens = paletteValue[splitMatch[2] as keyof typeof paletteValue];
        }
      });
    }
  });
  return internalTokens;
};
