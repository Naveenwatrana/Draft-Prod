import { StyledDescription } from './style';
import { DescriptionProps } from './type';

const Description = ({ content, variant, lines }: DescriptionProps) => {
  if (!lines) {
    return <StyledDescription variant={variant}>{content}</StyledDescription>;
  }
  return (
    <StyledDescription variant={variant}>
      {lines?.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </StyledDescription>
  );
};

export default Description;
