import ButtonComp from 'components/buttonComp';
import Divider from 'components/Divider/Divider';
import WordCounter from 'components/WordCounter/WordCounter';
import lang from 'common/lang';
import { Textarea } from 'components/Description/styles';
import { Buttons, SaveButton } from 'pages/pro/styles';
import { EditBioProps } from './types';
import {
  Container, Counter, Title,
} from './styles';

const { profile } = lang;

const EditBio = ({
  bio, updateText, characterLength, cancel, saveBio, disabledButton,
}: EditBioProps) => {
  return (
    <Container>
      <Title component="h3">{profile.addBio}</Title>
      <Textarea value={bio} onChange={updateText} data-cy="editBioText"></Textarea>
      <Counter>
        <WordCounter total={characterLength} count={bio?.length || 0} />
      </Counter>
      <Divider />
      <Buttons>
        <ButtonComp label={profile.cancel} onClick={cancel} variant="link" primary data-cy="editBioCancel" />
        <SaveButton label={profile.save} onClick={saveBio} disabled={disabledButton} primary data-cy="editBioSave" />
      </Buttons>
    </Container>

  );
};
export default EditBio;
