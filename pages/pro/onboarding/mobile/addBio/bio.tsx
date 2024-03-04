import { useEffect, useState } from 'react';
import InputComp from 'components/inputComp';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { BIO_MAX_LENGTH } from 'common/constants';
import { BioProps } from 'pages/pro/onboarding/mobile/addBio/types';
import SkipModal from 'pages/pro/onboarding/common/skipModal';
import { InputType } from 'components/inputComp/types';
import {
  ButtonGroup, Counter, Disclaimer, Form, SkipButton,
} from '../styles';

const { onBoarding: { bio: bioCopy }, buttonText } = lang;

const Bio = ({
  showPreview, setTitle, setSubtitle, register, watch, errors, handleSkip,
}: BioProps) => {
  const [showModal, setShowModal] = useState(false);
  const watchBio = watch('bio', '');

  useEffect(() => {
    setTitle(bioCopy.title);
    setSubtitle(bioCopy.subtitle);
  }, []);

  return (
    <>
      <SkipModal
        show={showModal}
        handleShow={setShowModal}
        handleSkip={handleSkip}
        step="bio"
      />
      <Disclaimer component="p">
        {bioCopy.bioDisclaimer}
      </Disclaimer>
      <Form>
        <InputComp
          labelText={bioCopy.bioLabel}
          id="bio"
          type={InputType.TEXTAREA}
          placeholder={bioCopy.bioPlaceholder}
          register={register}
          textArea
          large
          maxLength={BIO_MAX_LENGTH}
          error={errors.bio}
          data-cy="bio"
        />
        <Counter
          error={!!errors.bio}
          total={BIO_MAX_LENGTH}
          count={watchBio?.length ? watchBio.length : 0}
        />
      </Form>
      <ButtonGroup>
        <ButtonComp label={buttonText.next} fullWidth primary disabled={!watchBio || !!errors.bio} onClick={showPreview} data-cy="skip-bio" />
        <SkipButton label={buttonText.skip} fullWidth onClick={() => setShowModal(true)} data-cy="submit-bio" />
      </ButtonGroup>
    </>
  );
};

export default Bio;
