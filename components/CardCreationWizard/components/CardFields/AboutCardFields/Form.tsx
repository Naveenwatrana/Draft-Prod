import Description from 'components/Description/Description';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import lang from 'common/lang';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { initiateRemoveCard } from 'components/CardCreationWizard/slice';
import SpecificationsModal from 'components/SpecificationModal';
import { useAppDispatch } from 'common/hooks/state';
import { useState } from 'react';
import { getFileName } from 'common/utils/image';
import { FieldGroup } from '../styles';
import { FormProps } from './types';
import DeleteButtonElement from '../DeleteButton';
import MediaLabel from '../MediaLabel';

const { onBoarding: { image }, jobs } = lang;
const { deleteCards } = lang.cards;
const {
  aboutLabel, aboutPlaceholder, headingLabel, headingPlaceholder,
} = lang.cardCreationWizard.aboutCardText;
const Form = ({
  fields,
  updateValue,
  removeMedia,
  onUploadMedia,
  errors,
  withMedia,
  selectedCard,
}: FormProps) => {
  const dispatch = useAppDispatch();
  const deleteCard = () => {
    dispatch(initiateRemoveCard(selectedCard.id));
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SpecificationsModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        cancel={() => setIsOpen(false)}
      />
      <FieldGroup>
        <Description
          label={headingLabel}
          maxCharacters={38}
          value={fields.heading}
          setValue={(e) => updateValue(e, 'heading')}
          height={50}
          placeholder={headingPlaceholder}
        />
      </FieldGroup>
      <FieldGroup>
        <Description
          label={aboutLabel}
          maxCharacters={200}
          value={fields.description}
          setValue={(e) => updateValue(e, 'description')}
          height={150}
          placeholder={aboutPlaceholder}
        />
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
              info={jobs.image.imageInputInfo}
              onDrop={onUploadMedia}
              height="195px"
              error={!!errors.media?.message}
              errorMessage={errors.media?.message}
              data-cy="imageUpload"
            />

          </>
        )}
        <DeleteButtonElement deleteCard={deleteCard} text={deleteCards} />
      </FieldGroup>
    </div>
  );
};

export default Form;
