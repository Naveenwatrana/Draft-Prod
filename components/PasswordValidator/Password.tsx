import React from 'react';
import CheckIcon from 'components/Icons/CheckIcon';
import CancelIcon from 'components/Icons/CrossIcon';
import { Validation, ValidationError } from 'components/PasswordValidator/styles';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import { PasswordValidatorProps } from 'components/PasswordValidator/types';

const { PasswordError } = lang;

export const PasswordValidator = ({ validations, touched, value }: PasswordValidatorProps) => {
  return (
    <div>
      <TextComp component="h5">{PasswordError.title}</TextComp>
      {validations.map((validation) => {
        const isInvalid = !validation.valid(value) && touched;
        const isValid = validation.valid(value) && touched;
        return (
          <Validation disable={!touched} key={validation.id}>
            {!touched && <CheckIcon size={10} />}
            {isValid && <CheckIcon size={10} color="#5FF088" />}
            {isInvalid && <CancelIcon size={10} color="#DE4040" />}
            <ValidationError error={isInvalid}>{validation.message}</ValidationError>
          </Validation>
        );
      })}
    </div>
  );
};

export default PasswordValidator;
