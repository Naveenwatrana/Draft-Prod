import { InputProps } from 'components/inputComp/types';
import {
  CustomInput,
  CustomLabel,
  ErrorText,
  InputWrapper,
  LabelText,
  TextArea,
} from 'components/inputComp/styles';

const InputComp = ({
  labelText,
  id,
  error,
  dynamicErrorContent,
  placeholder,
  type,
  textArea,
  large = false,
  register,
  disabled,
  ...rest
}: InputProps) => {
  if (textArea) {
    return (
      <InputWrapper>
        <CustomLabel htmlFor={id}>
          <LabelText>{labelText}</LabelText>
          <TextArea
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            large={large}
            {...rest}
            {...register(id)}
          />
        </CustomLabel>
        {error && <ErrorText>{error.message}</ErrorText>}
      </InputWrapper>
    );
  }

  return (
    <InputWrapper>
      <CustomLabel htmlFor={id}>
        <LabelText>{labelText}</LabelText>
        <CustomInput
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          {...rest}
          {...register(id)}
        />
      </CustomLabel>
      {error && (
        <ErrorText>
          {error.message}
          {dynamicErrorContent}
        </ErrorText>
      )}
    </InputWrapper>
  );
};

export default InputComp;
