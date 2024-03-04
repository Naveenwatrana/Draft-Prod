import OtpInput from 'react-otp-input';
import React from 'react';
import { ErrorText } from 'components/inputComp/styles';
import { OTPInputProps } from './type';
import { Container, StyledInput } from './style';

const OTPInput = ({
  value, onChange, error, numInputs = 6, placeholder = '',
}: OTPInputProps) => {
  return (
    <Container>
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        inputType="number"
        renderInput={(props) => (
          <StyledInput data-testid={props.value} error={!!error} {...props} placeholder={placeholder} />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Container>
  );
};

export default OTPInput;
