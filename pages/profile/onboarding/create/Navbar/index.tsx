import lang from 'common/lang';
import React from 'react';
import Stepper from 'components/Stepper';
import ChevronLeft from 'components/Icons/LeftChevron';
import { NavbarProps } from '../types';
import {
  Container, BackText, IconWrapper, ClippedUserName,
} from './style';
const {
  userOnBoarding: {
    step: { name, resume },
  },
} = lang;
const stepsToRender = [name, resume];

const Navbar = ({ step, onBack, title }: NavbarProps) => {
  return (
    <Container>
      <BackText>
        <IconWrapper onClick={onBack}>
          <ChevronLeft data-cy="goBack" />
        </IconWrapper>
        <ClippedUserName title={title}>
          {title}
        </ClippedUserName>
      </BackText>
      <Stepper steps={stepsToRender} activeStep={step} />
    </Container>
  );
};

export default Navbar;
