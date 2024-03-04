import ButtonComp from 'components/buttonComp';
import { Footer, Buttons, NextButton } from './styles';
import { ContentCreateFooterProps } from './types';

const ContentCreateFooter = ({
  onBack, onNext, nextLabel, backLabel, nextDisabled, backDisabled,
}: ContentCreateFooterProps) => {
  return (
    <Footer>
      <Buttons>
        <ButtonComp label={backLabel} disabled={backDisabled} variant="link" onClick={onBack} />
        <NextButton label={nextLabel} disabled={nextDisabled} primary onClick={onNext} />
      </Buttons>
    </Footer>
  );
};

export default ContentCreateFooter;
