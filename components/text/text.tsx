import cs from 'classnames';
import styles from 'components/text/text.module.css';
import { TextProps } from 'components/text/types';

export const Text = ({
  children,
  component,
  theme = 'light',
  css,
  handleClick,
  error,
  className,
}: TextProps) => {
  const Component = component || 'span';
  return (
    <Component
      className={cs(styles[Component as string], styles[theme], css, { [styles.error]: error }, className)}
      {...(handleClick ? { onClick: handleClick } : {})}
    >
      {children}
    </Component>
  );
};

export default Text;
