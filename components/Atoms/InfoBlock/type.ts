import { ReactElement } from 'react';

export type InfoBlockProps = {
  title?: string;
  info: string | ReactElement;
};

export type DescriptionProps = {
  content?: string;
  lines?: string[];
  variant?: InfoDescriptionVariant;
};

export enum InfoDescriptionVariant {
  PRIMARY = 1,
  WARNING = 2,
}

export type StyledDescriptionProps = {
  variant?: InfoDescriptionVariant;
}
