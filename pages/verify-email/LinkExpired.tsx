import React from 'react';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import ButtonComp from 'components/buttonComp';
import { ToastContainer } from 'react-toastify';
import LinkExpiredIcon from 'components/Icons/LinkExpiredIcon';
import { LinkExpiredProps } from './type';
import { LinkExpiredContainer, LinkExpiredWrapper } from './style';

const {
  SignUp: { linkExpired, linkExpiredMessage, resendVerificationLink },
} = lang;
const LinkExpired = ({ onResend }: LinkExpiredProps) => {
  return (
    <LinkExpiredWrapper>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <LinkExpiredContainer>
        <LinkExpiredIcon />
        <TextComp component="h2">{linkExpired}</TextComp>
        <div>{linkExpiredMessage}</div>
        <ButtonComp
          onClick={onResend}
          primary
          label={resendVerificationLink}
          data-cy="resend-verification-link"
          fullWidth
          data-testid={resendVerificationLink}
          variant="primary_gradient"
        />
      </LinkExpiredContainer>
    </LinkExpiredWrapper>
  );
};

export default LinkExpired;
