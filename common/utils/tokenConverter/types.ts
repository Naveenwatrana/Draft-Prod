export type KeyStringPair = { [key: string]: string };
export type ValueTypeDescription = {
  value: string;
  type: string;
  description?: string;
}

export type FigmaToken = {
  [key: string]: KeyStringPair | ValueTypeDescription;
} | ValueTypeDescription;

export type Token = {
  [key: string]: ValueTypeDescription | string;
}

export type NestedToken = {
  [key: string]: Token;
}

export type FigmaTokens = {
  [key: string]: FigmaToken | ValueTypeDescription;
}

export type Palette = {[key: string]: {[key: string]: ValueTypeDescription}}

export type Theme = {
  typography: NestedToken,
  border: NestedToken,
  text: NestedToken, background:
    NestedToken,
  overlay: NestedToken,
  palette: Palette,
}
