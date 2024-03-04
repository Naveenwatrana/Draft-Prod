import cs from 'classnames';
import styles from 'components/input/input.module.css';
import { SimpleInputProps } from 'components/input/types';
import {
  LabelText, CustomInput, CustomLabel, InputWrapper, ErrorText,
} from 'components/inputComp/styles';

const Input = ({
  labelText, id, error, placeholder, type, disabled, ...rest
}: SimpleInputProps) => {
  return (
    <InputWrapper>
      <CustomLabel htmlFor={id}>
        <LabelText>{labelText}</LabelText>
        <CustomInput
          id={id}
          name={id}
          error={error}
          className={cs(styles.customInput, { [styles.errorInput]: error }, { [styles.disabled]: disabled })}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...rest}
        />
      </CustomLabel>
      {error && <ErrorText>{error.message}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
