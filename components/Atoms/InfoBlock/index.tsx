import { Container, Info, Title } from './style';
import { InfoBlockProps } from './type';

export const InfoBlock = ({ title, info }: InfoBlockProps) => {
  if (!info) return null;
  return (
    <Container>
      <Title>{title}</Title>
      <Info>{info}</Info>
    </Container>
  );
};
