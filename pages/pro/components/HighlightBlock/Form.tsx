import { useCallback, useState } from 'react';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import MediaLabel from 'components/CardCreationWizard/components/CardFields/MediaLabel';
import SpecificationsModal from 'components/SpecificationModal';
import { getFileName } from 'common/utils/image';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import ImageTitle from '../../onboarding/common/imageTitle';
import {
  ButtonGroup,
  Form,
  SkipButton,
  SubmitButton,
} from './style';
import { HighlightBlockFormProps } from './types';

const {
  profile: {
    block: {
      highlight: { form },
    },
  },
} = lang;
const {
  buttonText,
} = lang;
const { onBoarding: { image } } = lang;
const { image: imageText } = lang.cardCreationWizard;

const HighlightBlockForm = ({
  handleSubmit, withMedia, formFields, errors, register, onUploadMedia, removeMedia, onClose, block,
}: HighlightBlockFormProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const getButtonDisableStatus = useCallback(() => {
    const isMedia = formFields.media;
    const isMediaString = typeof formFields.media === 'string';
    const isTitleUnchanged = formFields.title === block?.fields?.title;
    const disabledButton = !isMedia || ((isMediaString && isTitleUnchanged) && (isMediaString || isTitleUnchanged));
    return disabledButton;
  }, [formFields.media, formFields.title, block?.fields?.title]);

  return (
    <div>
      <SpecificationsModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        cancel={() => setIsOpen(false)}
      />
      <Form onSubmit={handleSubmit} noValidate>
        <InputComp
          type={InputType.TEXT}
          labelText={form.title.label}
          id="title"
          placeholder={form.title.placeholder}
          register={register}
          error={errors?.title}
          data-cy="basicDetailFirstNameInput"
        />
        <span>
          {withMedia && formFields.media && (
            <>
              <MediaLabel onClick={() => setIsOpen(true)} />
              <ImageTitleWrapper height="250px">
                <ImageTitle fileName={getFileName(formFields.media)} removeImage={removeMedia} />
              </ImageTitleWrapper>
            </>
          )}
          {withMedia && !formFields.media && (
            <>
              <MediaLabel onClick={() => setIsOpen(true)} />
              <ImageUpload
                labelText={image.imageInputLabel}
                info={imageText.imageInputInfo}
                onDrop={onUploadMedia}
                height="231px"
                error={!!errors.media?.message}
                errorMessage={errors.media?.message}
                data-cy="imageUpload"
              />
            </>
          )}

        </span>
        <Divider />
        <ButtonGroup>
          <SkipButton
            primary
            variant="link"
            label={buttonText.cancel}
            onClick={onClose}
            data-cy="basicDetailCancel"
          />
          <SubmitButton
            primary
            label={buttonText.save}
            type="submit"
            disabled={getButtonDisableStatus()}
            data-cy="basicDetailSave"
          />
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default HighlightBlockForm;
