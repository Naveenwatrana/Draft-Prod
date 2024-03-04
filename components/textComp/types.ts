import { ComponentType, ReactNode } from 'react';
import { StyledComponent } from 'styled-components';

export type ColorScheme = 'light' | 'dark' | 'grey' | 'error';

export type ComponentsMap = {
  [key: string]: StyledComponent<ComponentType<ComponentProps>, any>
}

type CommonProps = {
  className?: string,
  handleClick?: () => void,
  textBold?: boolean,
  children?: ReactNode,
}

export type ComponentProps = CommonProps & {
  colorScheme?: ColorScheme,
}

export type TextProps = CommonProps & {
  component?: string,
  theme?: ColorScheme,
  error?: boolean,
  style?: unknown | object,
}
