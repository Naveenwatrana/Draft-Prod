import React from 'react';
import {
  Box, CTA, Description, TextContainer, Title,
} from 'components/Container/styles';
import TextComp from '../textComp';

type ContainerProps = {
    heading: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    title: string;
    cypressLocator?: string;
};

export const Container = ({
  heading, description, buttonText, onClick, title, cypressLocator,
}: ContainerProps) => {
  return (
    <Box>
      <Title component="h3">{title}</Title>
      <TextContainer>
        <TextComp component="h3">{heading}</TextComp>
        <Description>{description}</Description>
        <CTA variant="link" primary label={buttonText} onClick={onClick} data-cy={cypressLocator}></CTA>
      </TextContainer>
    </Box>
  );
};

export default Container;
