import {
  Div,
  H1, H2, H2Small, H3, H4, H5, H6, P, Span, pAlt, Paragraph,
} from 'components/textComp/styles';
import { ComponentProps, ComponentsMap, TextProps } from 'components/textComp/types';
import { ComponentType } from 'react';
import { StyledComponent } from 'styled-components';

export const TextComp = ({
  children,
  component,
  textBold,
  theme,
  handleClick,
  error,
  className,
  ...rest
}: TextProps) => {
  const componentsMap: ComponentsMap = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    span: Span,
    div: Div,
    h2Small: H2Small,
    pAlt,
    paragraph: Paragraph,
  };

  const Component: StyledComponent<ComponentType<ComponentProps>, any> = component ? componentsMap[component] : Span;

  return (
    <Component
      className={className}
      textBold={textBold}
      colorScheme={error ? 'error' : theme}
      {...(handleClick ? { onClick: handleClick } : {})}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TextComp;
