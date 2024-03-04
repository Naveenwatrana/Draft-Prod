import lang from 'common/lang';
import { Textarea } from 'components/Description/styles';
import { MantraProps } from 'pages/pro/basicDetails/mobile/EditImageDetail/mantra/types';
import TextComp from 'components/textComp';
import { Counter, CounterError } from './style';

const { onBoarding: { mantra } } = lang;

const Mantra = ({ watch, error, register }: MantraProps) => {
  const watchMantra = watch('mantra', '');

  return (
    <>
      <TextComp>{mantra.mantraLabel}</TextComp>
      <Textarea
        id="mantra"
        placeholder={mantra.mantraPlaceholder}
        {...register('mantra')}
        maxLength={60}
        rows={2}
      />
      {!error ? (
        <Counter
          total={60}
          count={watchMantra?.length ? watchMantra.length : 0}
        />
      ) : (
        <CounterError
          total={60}
          count={watchMantra?.length ? watchMantra.length : 0}
        />
      )}
    </>
  );
};

export default Mantra;
