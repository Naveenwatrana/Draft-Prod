import React from 'react';
import ChevronLeft from 'components/Icons/LeftChevron';
import { CreateContentNavbarProps } from '../types';
import { IconWrapper, CreateArticleText, Container } from './style';

const CreateContentNavbar = ({
  title,
  handleBack,
}: CreateContentNavbarProps) => {
  return (
    <Container>
      <CreateArticleText>
        <IconWrapper onClick={handleBack}>
          <ChevronLeft data-cy="goBack" />
        </IconWrapper>
        {title}
      </CreateArticleText>
    </Container>
  );
};

export default CreateContentNavbar;
