import React from 'react';
import ThumbsIcon from 'components/Icons/ThumbsUpFaded.svg';
import Divider from 'components/Divider/Divider';
import ButtonComp from 'components/buttonComp';
import FlexBox from 'components/Atoms/Flexbox';
import TextComp from 'components/textComp';
import lang from 'common/lang';
import {
  BoldText, Container, Content, LightText,
} from './style';
import { SkipButton } from '../create/Steps/style';
import { SuccessModalProps } from './type';
const {
  userOnBoarding: {
    successModal: {
      title,
      subtitle,
      desc,
      button: { submit, cancel },
    },
  },
} = lang;

const SuccessModal = ({ onCancel, onSuccess }: SuccessModalProps) => {
  return (
    <Container>
      <ThumbsIcon />
      <Content>
        <TextComp component="h2">{title}</TextComp>
        <LightText component="h4">{desc}</LightText>
        <BoldText textBold component="h4">{subtitle}</BoldText>
      </Content>
      <Divider />
      <FlexBox>
        <SkipButton
          label={cancel}
          primary
          variant="link"
          onClick={onCancel}
          data-cy={cancel}
        />
        <ButtonComp
          label={submit}
          onClick={onSuccess}
          primary
          fullWidth
          data-cy={submit}
        />
      </FlexBox>
    </Container>
  );
};

export default SuccessModal;
