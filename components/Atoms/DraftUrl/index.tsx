import lang from 'common/lang';
import { InputProps } from 'components/inputComp/types';
import InputComp from 'components/inputComp';
import { DraftUrlContainer, DraftUrlPath } from './style';
const {
  organization: { draftUrlPath },
} = lang;

const DraftUrlInput = ({ ...inputValues }: InputProps) => {
  return (
    <DraftUrlContainer>
      <DraftUrlPath>{draftUrlPath}</DraftUrlPath>
      <InputComp {...inputValues} />
    </DraftUrlContainer>
  );
};

export default DraftUrlInput;
