import cs from 'classnames';
import styles from 'components/input/checkbox.module.css';
import { CheckboxProps } from 'components/input/types';
import { CheckboxLabel } from './styles';

export const CheckBox = ({
  register, id, error, label,
}: CheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.container}>
        <CheckboxLabel component="span">
          {label}
        </CheckboxLabel>
        <input id={id} type="checkbox" {...register(id)} />
        <span className={cs(styles.checkmark, { [styles.error]: error })}></span>
      </label>
    </div>
  );
};

export default CheckBox;
