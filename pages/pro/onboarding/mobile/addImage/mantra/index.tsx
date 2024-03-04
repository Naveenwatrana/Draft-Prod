import lang from 'common/lang';
import { MantraProps } from 'pages/pro/onboarding/mobile/addImage/mantra/types';
import { InputType } from 'components/inputComp/types';
import InputComp from 'components/inputComp';
import { Counter } from '../../styles';

const {
  onBoarding: { mantra },
} = lang;

const Mantra = ({ watch, error, register }: MantraProps) => {
  const watchMantra = watch('mantra', '');

  return (
    <>
      <InputComp
        labelText={mantra.mantraLabel}
        id="mantra"
        type={InputType.TEXTAREA}
        placeholder={mantra.mantraPlaceholder}
        register={register}
        textArea
        maxLength={100}
        error={error}
        data-cy="mantra"
      />
      <Counter
        error={!!error}
        total={100}
        count={watchMantra?.length ? watchMantra.length : 0}
      />
    </>
  );
};

export default Mantra;
