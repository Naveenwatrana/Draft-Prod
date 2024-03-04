import lang from 'common/lang';
import React from 'react';
import Stepper from 'components/Stepper';
import ChevronLeft from 'components/Icons/LeftChevron';

import { NavbarProps } from '../types';
import { Container, CreateCompanyText, IconWrapper } from './style';
const {
  organization: {
    create: {
      step: {
        website, orgDetails, confirmEmail, brand,
      },
      title,
    },
  },
} = lang;
const stepsToRender = [website, orgDetails, confirmEmail, brand];

const Navbar = ({ step, onBack }: NavbarProps) => {
  return (
    <Container>
      <CreateCompanyText>
        <IconWrapper onClick={() => onBack(step)}>
          <ChevronLeft data-cy="goBack" />
        </IconWrapper>
        {title}
      </CreateCompanyText>
      {!!step && <Stepper steps={stepsToRender} activeStep={step} />}
    </Container>
  );
};

export default Navbar;
