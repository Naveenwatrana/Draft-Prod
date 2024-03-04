import lang from 'common/lang';
import { useEffect } from 'react';
import { BioPreviewProps } from 'pages/pro/onboarding/mobile/previewImage/types';
import {
  ButtonWrapper, Form, FormButton, ImageContainer, ImageContainerHeader, Mantra,
} from '../styles';

const {
  onBoarding: { bio: bioCopy },
  buttonText,
} = lang;

const BioPreview = ({
  fullName,
  bio,
  setTitle,
  setSubtitle,
  handleBack,
  handleSubmit,
}: BioPreviewProps) => {
  useEffect(() => {
    setTitle(bioCopy.bioPreviewTitle);
    setSubtitle(bioCopy.bioPreviewSubtitle);
  }, []);

  return (
    <>
      <Form>
        <ImageContainer>
          <ImageContainerHeader component="p">
            {fullName && fullName}
          </ImageContainerHeader>
          <Mantra component="p">
            {bio && bio}
          </Mantra>
        </ImageContainer>
      </Form>
      <ButtonWrapper>
        <FormButton
          label={buttonText.next}
          fullWidth
          onClick={handleSubmit}
          primary
        />
        <FormButton
          label={buttonText.back}
          fullWidth
          onClick={() => handleBack(bio)}
        />
      </ButtonWrapper>
    </>
  );
};

export default BioPreview;
