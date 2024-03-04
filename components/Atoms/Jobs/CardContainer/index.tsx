import React from 'react';
import ShadowIcon from 'components/Icons/ShadowIcon';
import { Card, Container } from './styles';

const CardsContainer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Container>
      <Card>
        <ShadowIcon />
        {children}
      </Card>
    </Container>
  );
};

export default CardsContainer;
