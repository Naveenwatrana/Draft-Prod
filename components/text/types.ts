import { ElementType, ReactNode } from 'react';

export type TextProps = {
  children?: ReactNode,
  component?: ElementType,
  theme?: string,
  css?: string,
  className?: string,
  handleClick?: () => void,
  error?: boolean,
}
