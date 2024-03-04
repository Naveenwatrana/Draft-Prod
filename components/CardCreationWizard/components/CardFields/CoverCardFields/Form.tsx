import Description from 'components/Description/Description';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import { useState } from 'react';
import SpecificationsModal from 'components/SpecificationModal';
import lang from 'common/lang';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getFileName } from 'common/utils/image';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import { useAppSelector } from 'common/hooks/state';
import { getCreateCardsWizardType } from 'components/CardCreationWizard/slice';
import { FieldGroup } from '../styles';
import { FormProps } from './types';
import MediaLabel from '../MediaLabel';

const { onBoarding: { image } } = lang;
const { image: imageText, addLogo } = lang.cardCreationWizard;
const { mantraLabel, mantraPlaceholder, mantraPlaceholderForContent } = lang.cardCreationWizard.coverCardText;

const Form = ({
  fields,
  updateMantra,
  removeMedia,
  removeLogo,
  onUploadMedia,
  onUploadLogo,
  errors,
  withMedia,
  withLogo,
  jobCoverCardsData,
}: FormProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const wizardType: CREATE_CARD_WIZARD_TYPE = useAppSelector(getCreateCardsWizardType);
  return (
    <div>
      <FieldGroup style={{ marginBottom: '1rem' }}>
        {withLogo && fields.logo && removeLogo && (
          <>
            <MediaLabel label={addLogo} onClick={() => setIsOpen(true)} />
            <ImageTitleWrapper height="50px">
              <ImageTitle fileName={getFileName(fields.logo)} removeImage={removeLogo} />
            </ImageTitleWrapper>
          </>
        )}
        {withLogo && onUploadLogo && !fields.logo && (
          <>
            <MediaLabel onClick={() => setIsOpen(true)} label={addLogo} />
            <ImageUpload
              labelText={image.imageInputLabel}
              info={imageText.logoInputInfo}
              onDrop={onUploadLogo}
              height="195px"
              error={!!errors.logo?.message}
              errorMessage={errors.logo?.message}
              data-cy="logoUpload"
            />
          </>
        )}
      </FieldGroup>
      <FieldGroup>
        <SpecificationsModal
          isOpen={modalIsOpen}
          closeModal={() => setIsOpen(false)}
          cancel={() => setIsOpen(false)}
        />
        {!jobCoverCardsData
        && (
          <Description
            label={mantraLabel}
            maxCharacters={100}
            value={fields.mantra}
            setValue={updateMantra}
            height={142}
            placeholder={wizardType === CREATE_CARD_WIZARD_TYPE.ARTICLE ? mantraPlaceholderForContent : mantraPlaceholder}
          />
        )}
      </FieldGroup>
      <FieldGroup>
        {withMedia && fields.media && (
          <>
            <MediaLabel onClick={() => setIsOpen(true)} />
            <ImageTitleWrapper height="50px">
              <ImageTitle fileName={getFileName(fields.media)} removeImage={removeMedia} />
            </ImageTitleWrapper>
          </>
        )}
        {withMedia && !fields.media && (
          <>
            <MediaLabel onClick={() => setIsOpen(true)} />
            <ImageUpload
              labelText={image.imageInputLabel}
              info={wizardType === CREATE_CARD_WIZARD_TYPE.ARTICLE ? imageText.contentImageInputInfo : imageText.imageInputInfo}
              onDrop={onUploadMedia}
              height="195px"
              error={!!errors.media?.message}
              errorMessage={errors.media?.message}
              data-cy="imageUpload"
            />
          </>
        )}
      </FieldGroup>
    </div>
  );
};

export default Form;
