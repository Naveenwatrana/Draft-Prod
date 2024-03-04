import { Container } from './styles';
import { CoverCardProps } from './types';

const CoverCard = ({ mantra, heading, description }: CoverCardProps) => {
  return (
    <Container>
      {mantra}
      <p>{heading}</p>
      <p>{description}</p>
    </Container>
  );
};

export default CoverCard;
