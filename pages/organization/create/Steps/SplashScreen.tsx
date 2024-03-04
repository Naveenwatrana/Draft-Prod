import React from 'react';
import VerifyIcon from 'components/Icons/VerifyIcon.svg';
import TextComp from 'components/textComp';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { SplashScreenProps } from '../types';
import {
  BtnWrapper,
  DescriptionText,
  SplashScreenHeader,
  SplashScreenContainer,
} from './style';
const {
  organization: {
    create: {
      splashScreen: { title, content },
    },
  },
  buttonText: { start },
} = lang;

const SplashScreen = ({ onNext }: SplashScreenProps) => {
  return (
    <SplashScreenContainer>
      <SplashScreenHeader>
        <VerifyIcon />
        <TextComp component="h2">{title}</TextComp>
        <DescriptionText>{content}</DescriptionText>
      </SplashScreenHeader>
      <BtnWrapper>
        <ButtonComp
          label={start}
          primary
          fullWidth
          data-cy="startOnboarding"
          onClick={onNext}
        />
      </BtnWrapper>
    </SplashScreenContainer>
  );
};

export default SplashScreen;
