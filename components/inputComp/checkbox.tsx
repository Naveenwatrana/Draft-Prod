import TextComp from 'components/textComp';
import {
  CheckBox,
  CheckBoxContainer,
  CheckBoxWrapper,
  Checkmark,
} from './styles';
import { CheckboxProps } from './types';

export const CheckBoxComp = ({
  register, id, error, label, ...rest
}: CheckboxProps) => {
  return (
    <CheckBoxWrapper>
      <CheckBoxContainer htmlFor={id}>
        <TextComp>{label}</TextComp>
        <CheckBox id={id} data-cy={id} type="checkbox" {...register(id)} {...rest} />
        <Checkmark error={!!error} />
      </CheckBoxContainer>
    </CheckBoxWrapper>
  );
};

export default CheckBoxComp;
